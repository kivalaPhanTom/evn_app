// iOS 27 terminates apps that have not adopted the scene-based lifecycle
// (EXC_BREAKPOINT in UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption,
// and a plain UIApplicationSceneManifest without a scene delegate is not enough).
//
// This plugin performs the full adoption:
// - Info.plist: scene manifest with a single-scene configuration pointing at SceneDelegate
// - SceneDelegate.swift: subclass of Expo's ExpoAppSceneDelegate, which creates the
//   UIWindow for the scene and starts React Native into it
// - AppDelegate.swift: the window creation + startReactNative block is removed, since
//   the scene delegate now owns the window (the factory stays in the app delegate)
// - Xcode project: SceneDelegate.swift is registered in the app target

const fs = require('fs');
const path = require('path');

function loadConfigPlugins() {
  const candidates = ['@expo/config-plugins', 'expo/node_modules/@expo/config-plugins'];
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
      }
    }
  }
  throw new Error('Unable to resolve @expo/config-plugins for withSceneManifest');
}

const { withInfoPlist, withXcodeProject } = loadConfigPlugins();

const SCENE_DELEGATE_SOURCE = `internal import Expo

class SceneDelegate: ExpoAppSceneDelegate {}
`;

// The window creation + startReactNative block of the generated AppDelegate;
// under the scene life cycle ExpoAppSceneDelegate creates the window and starts RN.
const WINDOW_START_REACT_NATIVE_BLOCK =
  /#if os\(iOS\) \|\| os\(tvOS\)\s*\n\s*window = UIWindow\(frame: UIScreen\.main\.bounds\)\s*\n\s*factory\.startReactNative\([\s\S]*?\)[ \t]*\n#endif[ \t]*\n?/;

const appDirectory = (config) => (config.name || 'App').replace(/[^A-Za-z0-9]/g, '');

const withSceneManifest = (config) => {
  config = withInfoPlist(config, (mod) => {
    mod.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          { UISceneDelegateClassName: '$(PRODUCT_MODULE_NAME).SceneDelegate' },
        ],
      },
    };
    return mod;
  });

  config = withXcodeProject(config, (mod) => {
    const project = mod.modResults;
    const appDir = appDirectory(config);
    const platformProjectRoot = mod.modRequest.platformProjectRoot;

    // Runs after the native project files have been generated.
    const appDelegatePath = path.join(platformProjectRoot, appDir, 'AppDelegate.swift');
    if (fs.existsSync(appDelegatePath)) {
      const original = fs.readFileSync(appDelegatePath, 'utf8');
      const updated = original.replace(WINDOW_START_REACT_NATIVE_BLOCK, '');
      if (updated !== original) {
        fs.writeFileSync(appDelegatePath, updated);
      }
    }

    const sceneDelegatePath = path.join(platformProjectRoot, appDir, 'SceneDelegate.swift');
    if (!fs.existsSync(sceneDelegatePath)) {
      fs.writeFileSync(sceneDelegatePath, SCENE_DELEGATE_SOURCE);
    }

    const fileSection = project.hash.project.objects.PBXFileReference || {};
    const alreadyRegistered = Object.values(fileSection).some(
      (fileRef) =>
        fileRef && typeof fileRef.path === 'string' && fileRef.path.endsWith('SceneDelegate.swift'),
    );
    if (!alreadyRegistered) {
      const groupKey =
        project.findPBXGroupKeyAndType({ name: appDir }, 'PBXGroup') ||
        project.hash.project.project.mainGroup;
      project.addSourceFile(`${appDir}/SceneDelegate.swift`, null, groupKey);
    }
    return mod;
  });

  return config;
};

module.exports = withSceneManifest;
