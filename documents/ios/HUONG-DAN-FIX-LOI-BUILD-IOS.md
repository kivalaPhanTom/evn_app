# HƯỚNG DẪN FIX 2 LỖI BUILD APP iOS (HPP GENCO3)

> Tài liệu handover cho người tiếp nhận việc build iOS.
> Gồm: 2 lỗi đã gặp ngày 18/10/2026, nguyên nhân, cách fix, và quy trình build.

## 0. Trạng thái code

- Mọi fix nằm trên branch **`datdt44/bug/scene-lifecycle-crash-ios27`** (chưa commit — **bắt buộc commit + merge về master trước khi bàn giao**, xem mục 5).
- App đang trên TestFlight: `com.hppgenco3Portal.Iphone`, version 1.0.14.
- Stack thực tế: **Expo SDK 57** (`expo ^57.0.26` trong `package.json`). Lưu ý: `evn-markdown/evn.md` ghi SDK 54 là SAI (đã cũ).

---

## 1. Lỗi 1: Mở app là crash ngay trên iOS 27

### Triệu chứng
- App chạy bình thường trên iOS ≤ 26, nhưng **crash ngay khi mở** trên iOS 27 (0.1–0.2s sau launch, chưa kịp chạy JS).
- Crash log (file `.ips`): `EXC_BREAKPOINT` / `SIGTRAP`, thread chính, frame đầu tiên:
  `___UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption_block_invoke`
- File crash log mẫu: `HPPGENCO3-2026-10-18-100815.ips` (repo root).

### Nguyên nhân
- App chưa "adopt" **Scene lifecycle** của iOS (không có `SceneDelegate`, manifest chưa đầy đủ).
- Từ **iOS 27**, Apple nâng cảnh báo runtime issue này thành **crash bắt buộc** (trước đó chỉ là warning).
- ⚠️ **Bổ sung manifest rỗng (`UIApplicationSceneManifest` chỉ có `UIApplicationSupportsMultipleScenes: false`) KHÔNG đủ** — đã test thật: build có manifest rỗng vẫn crash y chang. Phải có scene delegate thật.

### Cách fix (đã áp dụng)

Expo SDK 57 có sẵn class **`ExpoAppSceneDelegate`** (trong module `Expo`) — chính chủ Expo làm riêng cho iOS 27: nó tạo `UIWindow` cho scene và khởi động React Native vào đó, có kèm xử lý deep link.

**Các file trong project local** (mà Xcode build trực tiếp):

| File | Thay đổi |
|---|---|
| `ios/HPPGENCO3/SceneDelegate.swift` | **File mới**: `internal import Expo` + `class SceneDelegate: ExpoAppSceneDelegate {}` |
| `ios/HPPGENCO3/AppDelegate.swift` | **Xoá** khối `window = UIWindow(...)` + `factory.startReactNative(...)` trong `didFinishLaunching` (scene delegate sẽ làm việc này). Giữ nguyên phần tạo `reactNativeFactory`. |
| `ios/HPPGENCO3/Info.plist` | `UIApplicationSceneManifest` phải có đủ: `UIApplicationSupportsMultipleScenes: false` **và** `UISceneConfigurations → UIWindowSceneSessionRoleApplication → UISceneDelegateClassName: $(PRODUCT_MODULE_NAME).SceneDelegate` |
| `ios/HPPGENCO3.xcodeproj/project.pbxproj` | Đăng ký `SceneDelegate.swift` vào target (4 chỗ: PBXBuildFile, PBXFileReference, group children, Sources build phase) |

**Cho build EAS cloud** (bởi `/ios` bị git-ignored, xem mục 5):

| File | Vai trò |
|---|---|
| `plugins/withSceneManifest.js` | Config plugin: tự làm 4 việc trên khi `expo prebuild` chạy (viết `SceneDelegate.swift`, patch `AppDelegate.swift`, sửa `Info.plist`, đăng ký vào `project.pbxproj`) |
| `app.config.js` | Đăng ký plugin vào mảng `plugins` |

⚠️ **Bẫy quan trọng:** plugin phải đăng ký trong **`app.config.js`**, KHÔNG đăng ký trong `app.json` — vì `app.config.js` ghi đè toàn bộ mảng `plugins` của `app.json` (các plugin `expo-router`, `expo-splash-screen` trong `app.json` hiện đang KHÔNG chạy vì lý do này). Kiểm tra config thực tế bằng:

```bash
npx expo config --type public --json   # xem j.plugins — đó là list plugin ĐÚNG đang chạy
```

### Đã verify
- `xcodebuild` project local: BUILD SUCCEEDED.
- `npx expo prebuild` trong thư mục tạm: sinh đúng native project (idempotent, chạy lại không sinh trùng).

---

## 2. Lỗi 2: Login không thành công (NSURLErrorBadURL)

### Triệu chứng
- App mở được (sau khi fix lỗi 1) nhưng bấm login là **thất bại ngay lập tức** (~10ms).
- System log của app: `NSURLConnection finished with error - code -1002`
  (= `NSURLErrorBadURL`) + cảnh báo *"URL which has no scheme"* + `transaction_duration_ms=0`.
- `duration = 0` nghĩa là request chưa gửi đi đâu — URL đã hỏng từ lúc parse.

### Nguyên nhân
- `API_BASE_URL` được bake vào bundle **kèm single-quote literal**:
  `"API_BASE_URL": "'https://mygenco3-api.genco3.com/'"` → `baseURL` bắt đầu bằng `'` → NSURL không nhận scheme.
- Nguồn: file `.env` viết dạng `API_BASE_URL = 'https://...'` (có space và quote). Một số lần build, dotenv không strip được quote (do cách config loader chạy hoặc env var truyền từ shell).
- Bug này có từ lâu: soi cả archive 1.0.13 và 1.0.14 (build 1, 2) đều cùng giá trị lỗi — trước đó chưa ai phát hiện vì app crash ở cửa (lỗi 1) nên chưa tới bước login.

### Cách kiểm tra nhanh (khi nghi lỗi này)
Mở archive vừa build, đọc config nhúng:

```bash
APP=~/Library/Developer/Xcode/Archives/<ngày>/<tên>.xcarchive/Products/Applications/HPPGENCO3.app
python3 -c "import json; print(json.load(open('$APP/EXConstants.bundle/app.config'))['extra']['API_BASE_URL'])"
# Phải in ra:  https://mygenco3-api.genco3.com/   (KHÔNG có quote, KHÔNG có space)
```

### Cách fix (đã áp dụng, 3 lớp phòng thủ)

| File | Thay đổi |
|---|---|
| `.env` | Viết dạng chuẩn, **không space, không quote**: `API_BASE_URL=https://mygenco3-api.genco3.com/` |
| `app.config.js` | Hàm `normalizeApiBaseUrl()`: trim + strip quote đầu/cuối + bắt buộc đầu `http(s)://`, sai thì dùng fallback |
| `src/core/service/api.service.ts` | Runtime guard: `BASE_URL` đọc từ config, nếu không khớp `^https?://` thì tự dùng fallback `https://mygenco3-api.genco3.com/` — build nào config hỏng kiểu gì app vẫn gọi đúng API |

---

## 3. Quy trình build iOS (Xcode — flow chính)

1. `npm install` (bắt buộc — `postinstall` chạy `patch-package`, bỏ qua sẽ build hỏng).
2. Mở `ios/HPPGENCO3.xcworkspace` (KHÔNG mở `.xcodeproj` trực tiếp).
3. Scheme `HPPGENCO3`, cấu hình **Release**.
4. **Product → Archive**.
5. **Distribute App → App Store Connect → TestFlight Only** (upload thẳng TestFlight).
6. Chờ TestFlight propagates (~5–15 phút), cài trên device.

**Về build number (`CFBundleVersion`): KHÔNG cần sửa tay.** Khi upload, nếu build number đã bị chiếm trên App Store Connect, Xcode sẽ **tự tăng** lúc distribute (đã xảy ra thực tế: archive build 1 → upload thành build 2). Muốn kiểm soát thì mở target → General → ô "Build".

**Mẹo debug nhanh khi build lỗi compile:**

```bash
cd ios && xcodebuild -workspace HPPGENCO3.xcworkspace -scheme HPPGENCO3 \
  -configuration Debug -destination "generic/platform=iOS" \
  CODE_SIGNING_ALLOWED=NO build 2>&1 | grep -E "error:|BUILD SUCCEEDED|BUILD FAILED"
```

## 4. Quy trình build EAS cloud (nếu cần)

**Bắt buộc commit + push branch trước** — EAS kéo code từ git remote, còn `/ios` thì git-ignored. Cloud sẽ tự chạy `expo prebuild`, và config plugin `plugins/withSceneManifest.js` sẽ tự tái tạo toàn bộ fix scene lifecycle. Nếu chưa push, bản cloud build sẽ **mất fix** và crash y chang lỗi 1.

```bash
git push -u origin <branch>
eas build -p ios
```

---

## 5. Lưu ý sống còn khi bàn giao

1. **Commit + merge fix về master TRƯỚC khi bàn giao.** Hiện trạng chưa commit:
   - Tracked, đang sửa: `.env`, `app.config.js`, `src/core/service/api.service.ts`
   - Untracked, cần `git add`: `plugins/withSceneManifest.js`
   - ⚠️ 4 file native trong `ios/` (SceneDelegate.swift, AppDelegate.swift, Info.plist, project.pbxproj) **KHÔNG commit được** vì `/ios` bị git-ignored — máy khác lấy lại chúng qua `npx expo prebuild` (plugin tự làm, xem trên).
2. **`/ios` và `/android` không nằm trong repo** (git-ignored từ commit đầu). Người build trên máy khác phải:
   ```bash
   npm install
   npx expo prebuild --platform ios --no-install   # plugin tự tạo SceneDelegate + manifest + patch AppDelegate
   cd ios && pod install
   ```
3. **Đừng sửa tay file trong `ios/` rồi quên cập nhật plugin** — mỗi thay đổi native phải có song song logic tương ứng trong `plugins/withSceneManifest.js` (hoặc plugin riêng) để bản EAS cloud không lệch.
4. **Format `.env`**: không space quanh `=`, không quote. Kiểm tra sau mỗi lần build bằng lệnh ở mục 2.
5. **Không chạy `npx expo prebuild --clean` trên project đang dùng cho Xcode** nếu không cần — nó sinh lại native project, có thể làm mất các chỉnh sửa local trong `ios/`.

## 6. Checklist trước mỗi lần build

- [ ] Branch đang chứa đủ fix (xem mục 5.1)
- [ ] `.env` đúng format
- [ ] `npx expo config --type public --json` → `extra.API_BASE_URL` sạch (không quote)
- [ ] (Tuỳ chọn) chạy lệnh xcodebuild test ở mục 3 trước khi Archive
- [ ] Sau khi Archive xong: kiểm tra 2 điều trong `.app`:
  - `Info.plist` có `UISceneConfigurations` (fix scene lifecycle)
  - `EXConstants.bundle/app.config` → `extra.API_BASE_URL` không quote (fix login)
- [ ] Upload TestFlight, test trên **máy iOS 27** thật: mở app → login → home
