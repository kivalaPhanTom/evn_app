#!/usr/bin/env node

/**
 * Flexible reset-project script
 * - Dò tìm các thư mục (root và root/src)
 * - Nếu chọn "y" thì chuyển các thư mục tìm được vào <projectRoot>/app-example/<original-relative-path>
 * - Nếu chọn "n" thì xóa các thư mục tìm được
 * - Tạo app mới trong root/src/app nếu tồn tại src, còn không thì root/app
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const searchRoots = [root, path.join(root, "src")];
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
const exampleDir = "app-example";
const newAppDirName = "app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function findExistingDirs() {
  const found = [];
  for (const base of searchRoots) {
    for (const d of oldDirs) {
      const candidate = path.join(base, d);
      if (fs.existsSync(candidate)) {
        const rel = path.relative(root, candidate); // relative path from project root
        found.push({ dirName: d, absPath: candidate, relPath: rel });
      }
    }
  }
  return found;
}

async function moveOrDelete(foundDirs, move) {
  if (move) {
    await fs.promises.mkdir(exampleDirPath, { recursive: true });
    console.log(`📁 ${exampleDir} created at project root.`);
  }

  for (const item of foundDirs) {
    if (move) {
      const target = path.join(exampleDirPath, item.relPath);
      await fs.promises.mkdir(path.dirname(target), { recursive: true });
      await fs.promises.rename(item.absPath, target);
      console.log(`➡️ Moved ${item.relPath} -> ${path.relative(root, target)}`);
    } else {
      await fs.promises.rm(item.absPath, { recursive: true, force: true });
      console.log(`❌ Deleted ${item.relPath}`);
    }
  }

  if (foundDirs.length === 0) {
    console.log("➡️ No matching directories found to move/delete.");
  }
}

async function createNewApp() {
  const useSrc = fs.existsSync(path.join(root, "src"));
  const newAppDirPath = useSrc ? path.join(root, "src", newAppDirName) : path.join(root, newAppDirName);

  await fs.promises.mkdir(newAppDirPath, { recursive: true });
  console.log(`📁 New ${path.relative(root, newAppDirPath)} created.`);

  const indexPath = path.join(newAppDirPath, "index.tsx");
  const layoutPath = path.join(newAppDirPath, "_layout.tsx");

  await fs.promises.writeFile(indexPath, indexContent);
  console.log(`📄 ${path.relative(root, indexPath)} created.`);

  await fs.promises.writeFile(layoutPath, layoutContent);
  console.log(`📄 ${path.relative(root, layoutPath)} created.`);
}

rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  async (answer) => {
    const userInput = (answer || "y").trim().toLowerCase();
    if (userInput !== "y" && userInput !== "n") {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
      return;
    }

    try {
      const found = findExistingDirs();
      await moveOrDelete(found, userInput === "y");
      await createNewApp();

      console.log("\n✅ Project reset complete.");
      console.log("1. Run `npx expo start` to start a dev server.");
      console.log("2. Edit the new app/index.tsx to change the main screen.");
      if (userInput === "y" && found.length) {
        console.log(`3. Reference files in ./${exampleDir} and delete it when you no longer need it.`);
      }
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
    } finally {
      rl.close();
    }
  }
);
