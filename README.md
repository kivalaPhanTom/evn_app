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
│   │   ├── domains/                 # Redux theo nghiệp vụ
│   │   │   ├── auth/                # actions + slice + saga entry point
│   │   │   ├── documents/
│   │   │   ├── hydrology/
│   │   │   ├── maintenance/
│   │   │   ├── modules/
│   │   │   ├── power/
│   │   │   ├── production-output/
│   │   │   ├── refresh/
│   │   │   ├── revenue-profit/
│   │   │   └── technology/
│   │   ├── Sagas/                   # Chỉ chứa RootSaga orchestration
│   │   ├── hooks.ts                 # useAppDispatch/useAppSelector
│   │   ├── index.ts                 # Public API của Redux
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

| Domain slice | Trước | Sau | Ghi chú |
|-------|------:|----:|-----:|
| `revenue-profit.slice.ts` | 540 | 230 | Đã chuyển vào domain `revenue-profit` |
| `hydrology.slice.ts` | 422 | 280 | Đã chuyển vào domain `hydrology` |
| `power.slice.ts` | 186 | 165 | Đã chuyển vào domain `power` |

### Cải thiện chất lượng code

- ✅ **Xóa dead code**: ~50 files không dùng đã được loại bỏ
- ✅ **Gộp duplicate slices**: state refresh dùng chung cho các màn hình home và factory detail
- ✅ **Sạch cấu trúc thư mục**: bỏ `validators/`, `layouts/`, `core/store/`, `core/scripts/`
- ✅ **Tổ chức Redux theo domain**: action creator và slice mới nằm cạnh nhau trong `core/redux/domains/`
- ✅ **Typed Redux API**: dùng `useAppDispatch`, `useAppSelector`, `RootState` và `AppDispatch`
- ✅ **Co-locate saga theo domain**: mỗi domain quản lý actions, slice và saga của chính nó
- ✅ **Giảm race condition**: các request dữ liệu theo tab/ngày dùng `takeLatest`
- ✅ **Xóa `Actions/` và `ActionTypes/`**: action type được định nghĩa tại domain action creator
- ✅ **Giữ nguyên i18next**: Toàn bộ `src/core/i18n/` được giữ nguyên
- ✅ **Giữ nguyên redux-saga**: saga vẫn được khởi chạy tập trung qua `RootSaga`
- ✅ **Giữ tương thích state**: reducer keys hiện tại được giữ nguyên để không phá các selector đang dùng

### Quy ước Redux mới

Code mới nên import từ public API của Redux hoặc domain tương ứng:

```tsx
import { useAppDispatch, useAppSelector } from '@/core/redux'
import { getHydrologyflowChart } from '@/core/redux/domains/hydrology'

const dispatch = useAppDispatch()
const isLoading = useAppSelector((state) => state.hydrologySlice.isLoadingFlowChart)
```

Không tạo action type ở thư mục riêng và không import trực tiếp từ `Sagas/` trong màn hình mới. Reducer, action creator và logic domain nằm trong `domains/`.

Kiểm tra code trước khi commit:

```bash
npm run lint
npm run typecheck
```

`serializableCheck: false` trong Redux store hiện được giữ nguyên để tương thích với các action fact-detail đang dùng callback UI.

### Trạng thái hiện tại

- ✅ Toàn bộ text tiếng Việt trong `app/` và `src/` đã được chuẩn hóa về UTF-8, tránh lỗi hiển thị dạng `ThÃ´ng` hoặc `Lá»£i`.
- ✅ `npm run typecheck` đã chạy thành công.
- ✅ `npx eslint src/core/redux` đã chạy thành công.
- ✅ Cấu trúc Redux hiện chỉ còn domain implementations và `RootSaga` orchestration.
- ℹ️ Các warning lint còn lại nằm ngoài Redux, chủ yếu liên quan dependency của React Hook và có thể xử lý độc lập.

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
