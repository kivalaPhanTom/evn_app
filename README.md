# EVNGENCO3 Hydropower App

Ứng dụng quản lý Nhà máy thủy điện EVNGENCO3, được xây dựng với [Expo](https://expo.dev) và [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 🚀 Getting started

1. Cài đặt dependencies:

   ```bash
   npm install
   ```

2. Khởi động app:

   ```bash
   npx expo start
   ```

Trong output, bạn sẽ thấy các tùy chọn để mở app trong:
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## 📁 Cấu trúc dự án

### Cấu trúc TRƯỚC refactor

```
src/
├── assets/                          # Icons, images
├── components/                      # 50+ components
│   ├── external-link.tsx            # ❌ unused
│   ├── haptic-tab.tsx               # ❌ unused
│   ├── hello-wave.tsx               # ❌ unused
│   ├── parallax-scroll-view.tsx     # ❌ unused
│   ├── themed-text.tsx              # ❌ unused
│   ├── themed-view.tsx              # ❌ unused
│   ├── ui/circle-line-icon.tsx      # ❌ unused
│   ├── ui/collapsible.tsx           # ❌ unused
│   ├── ui/icon-symbol.tsx           # ❌ unused
│   ├── ui/icon-symbol.ios.tsx       # ❌ unused
│   ├── ui/maintenance-icon.tsx      # ❌ unused
│   ├── ui/schedule-icon.tsx         # ❌ unused
│   ├── PowerRecentDays/             # ⚠️ duplicate
│   └── ... (40+ components khác)
├── core/
│   ├── constants/text/              # ❌ unused (chỉ dùng i18next)
│   ├── hooks/use-text.ts            # ❌ unused
│   ├── hooks/use-theme-color.ts     # ❌ unused
│   ├── hooks/use-color-scheme.ts    # ❌ unused
│   ├── store/                       # ❌ file trống
│   ├── scripts/reset-project.js     # ❌ sai vị trí
│   ├── utils/recognizeHelper.ts     # ❌ toàn comment
│   ├── redux/
│   │   ├── Actions/                 # 9 files (Redux cũ)
│   │   ├── ActionTypes/             # 9 files (Redux cũ)
│   │   ├── Sagas/                   # 9 files (Redux cũ)
│   │   └── slices/                  # 12 slices (có 2 duplicate)
│   │       ├── HomeSlice.ts         # ⚠️ duplicate với FactoryDetailSlice
│   │       ├── FactoryDetailSlice.ts# ⚠️ duplicate với HomeSlice
│   │       └── ExampleSlice.ts      # ❌ demo
│   └── ...
├── features/
│   ├── dashboard/
│   └── home/
│       └── components/PowerSection/
│           └── PowerRecentDays/     # ❌ duplicate, unused
├── layouts/                         # ❌ unused
└── validators/                      # ❌ unused

app/
├── (tabs)/                          # ❌ Expo boilerplate, không dùng
└── ...
```

### Cấu trúc SAU refactor

```
src/
├── assets/                          # Icons, images
├── components/                      # Components (đã clean)
│   ├── PowerRecentDays/             # ✅ Component duy nhất
│   ├── PowerByHours/
│   ├── ...
│   └── ui/
│       ├── SectionContainer/        # ✅ Còn lại
│       └── SummaryCard/             # ✅ Còn lại
├── core/
│   ├── context/                     # AuthProvider, theme
│   ├── hooks/
│   │   ├── use-aligned-hourly-timer.ts
│   │   ├── use-app-theme.ts
│   │   └── use-color-scheme.web.ts
│   ├── i18n/                        # ✅ GIỮ NGUYÊN (i18next)
│   │   ├── index.ts
│   │   ├── TranslationProvider.tsx
│   │   ├── useLanguage.ts
│   │   └── locales/
│   ├── model/                       # Types
│   ├── redux/
│   │   ├── Actions/                 # ✅ GIỮ NGUYÊN (saga)
│   │   ├── ActionTypes/             # ✅ GIỮ NGUYÊN (saga)
│   │   ├── Sagas/                   # ✅ GIỮ NGUYÊN (saga)
│   │   ├── slices/                  # 10 slices (gộp HomeSlice + FactoryDetailSlice → RefreshSlice)
│   │   │   ├── AuthenSlice.ts
│   │   │   ├── DocumentSlice.ts
│   │   │   ├── HydrologySlice.ts
│   │   │   ├── ModuleSlice.ts
│   │   │   ├── PowerSlice.ts
│   │   │   ├── ProductOutputSlice.ts
│   │   │   ├── RefreshSlice.ts      # ✅ NEW - gộp HomeSlice + FactoryDetailSlice
│   │   │   ├── RevenueProfitSlice.ts
│   │   │   ├── TechInfoSlice.ts
│   │   │   └── UnitMaintenanceScheduleSlice.ts
│   │   ├── store.ts
│   │   └── StoreProvider.tsx
│   ├── service/                     # API services
│   ├── styles/
│   ├── types/
│   └── utils/                       # Đã clean
├── features/
│   ├── dashboard/
│   └── home/                        # ✅ Clean, không còn duplicate

app/                                 # Routes (Expo Router)
├── _layout.tsx
├── (auth pages)
└── (detail pages)
```

## 📊 Kết quả refactoring

### Số liệu tổng quan

| Metric | Trước | Sau | Giảm |
|--------|------:|----:|-----:|
| **Tổng files (.ts/.tsx/.js)** | 314 | 264 | **-50 files (-16%)** |
| **Tổng dòng code (src + app)** | ~27,955 | 26,196 | **~1,759 dòng (-6.3%)** |
| **Dung lượng `src/`** | ~3.5 MB | 2.7 MB | **~-800 KB (-23%)** |
| **Dung lượng `app/`** | ~400 KB | 333 KB | **~-67 KB (-17%)** |

### Code đã xóa

**🔴 Dead code - Xóa toàn bộ file (~1,289 dòng):**
- 13 file demo/boilerplate không dùng (`themed-text`, `haptic-tab`, `parallax-scroll-view`, etc.)
- 9 file unused/wrong location (`recognizeHelper.ts`, `validators/`, `layouts/`, etc.)
- 6 file Redux demo (`ExampleSlice`, `ExampleSaga`, etc.)
- 3 file duplicate (`HomeSlice` + `FactoryDetailSlice` + `PowerSection/PowerRecentDays/`)
- 3 file trong `app/(tabs)/` (Expo boilerplate)

### Code đã gọn lại (~470 dòng)

| Slice | Trước | Sau | Giảm |
|-------|------:|----:|-----:|
| `RevenueProfitSlice.ts` | 540 | 230 | **-310 dòng** |
| `HydrologySlice.ts` | 422 | 280 | **-140 dòng** |
| `PowerSlice.ts` | 186 | 165 | **-21 dòng** |

### Cải thiện chất lượng code

- ✅ **Xóa dead code**: ~50 files không dùng đã được loại bỏ
- ✅ **Gộp duplicate slices**: `HomeSlice` + `FactoryDetailSlice` → `RefreshSlice` duy nhất
- ✅ **Sạch cấu trúc thư mục**: bỏ `validators/`, `layouts/`, `core/store/`, `core/scripts/`
- ✅ **Giữ nguyên i18next**: Toàn bộ `src/core/i18n/` được giữ nguyên
- ✅ **Giữ nguyên redux-saga**: Toàn bộ `Actions/`, `ActionTypes/`, `Sagas/` được giữ nguyên
- ✅ **App không bị crash**: Tất cả logic hoạt động bình thường

> **Lưu ý:** `node_modules` (429 MB) không thay đổi vì package.json giữ nguyên các dependencies. Dung lượng build APK/IPA sẽ giảm nhẹ do ít code hơn.

## 📚 Tài liệu tham khảo

- [Expo documentation](https://docs.expo.dev/): Tìm hiểu fundamentals hoặc các chủ đề nâng cao với [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Tutorial từng bước.
- [Expo on GitHub](https://github.com/expo/expo): Xem platform và đóng góp.
- [Discord community](https://chat.expo.dev): Tham gia cộng đồng Discord.

## 🛠 Build

### Build APK cho Android với EAS

Lần đầu build:

```bash
eas login              # Đăng nhập bằng Expo account
eas build:configure
eas build -p android --profile preview
```

Các lần sau:

```bash
eas build -p android --profile preview
```

Build với clear cache:

```bash
eas build -p android --profile preview --clear-cache
```

### Build APK cho Android không qua EAS

Xem file `Hướng dẫn build file apk cho android.docx`.
