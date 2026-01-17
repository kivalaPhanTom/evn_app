--- Hướng dẫn build Prod ứng dụng lần đầu trên CH Play ---

## Trước khi build nên clean thư mục android nếu đã tồn tại.

1. Cấu hình App.json 
  "android": {
    "package": "com.genco3.hppgenco3", // Không được thay đổi package, cái này cố định không thay đổi được sau khi app đã publish 
    "versionCode": 1, // Tăng lên sau mỗi lần build 
    "adaptiveIcon": {
      "backgroundColor": "#E6F4FE",
      "foregroundImage": "./src/assets/images/icon.png",
      "backgroundImage": "./src/assets/images/icon.png",
      "monochromeImage": "./src/assets/images/icon.png"
    },
    "edgeToEdgeEnabled": true,
    "predictiveBackGestureEnabled": false
  },

2. Build lại thư mục android 

npx expo prebuild (Bổ sung --clean nếu đã tồn tại)

3. Tạo keystore
Cho lần release đầu 
- Tìm keytool.exe trong thư mục cài đặt Java (phiên bản nào cũng được) trên windows để tạo ( vd "C:\Program Files\Java\jdk1.8.0_231\bin")
- Chạy câu lệnh sau để gen: (Nó sẽ yêu cầu nhập password và các thông tin cá nhân nên lưu lại 1 bản để dự phòng)
.\keytool.exe -genkeypair -v -keystore hppgenco3-release.keystore -alias hppgenco3 -keyalg RSA -keysize 2048 -validity 10000 

Sử dụng keystore đã tạo sẵn cho những lần build sau: https://drive.google.com/file/d/1iZSpamICYtzvpRCI7G_6qo2WV59ZBgrF/view?usp=drive_link

- Sau khi có file keystone thi copy cho vào thư mục android/app

4. Cấu hình android/gradle.properties
- Vào chỉnh file android/gradle.properties
MYAPP_UPLOAD_STORE_FILE=hppgenco3-release.keystore
MYAPP_UPLOAD_STORE_PASSWORD=Hpp@2025
MYAPP_UPLOAD_KEY_ALIAS=hppgenco3
MYAPP_UPLOAD_KEY_PASSWORD=Hpp@2025

5. Cấu hình app/build.gradle

Mở file app/build.gradle thêm cấu hình hình release vào signingConfigs và buildTypes (Thêm chứ không xóa những thuộc tính đã có riêng buildTypes thì comment cái mặc định và copy cái mới vào )
android {
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            shrinkResources false
        }
    }
}

6. Kiểm tra cấu hình key đúng chưa
cd android
./gradlew signingReport

7. Build file AAB
cd android
./gradlew bundleRelease
Bản build tại: android/app/build/outputs/bundle/release/app-release.aab

8. Vào https://play.google.com/console/ tab kiểm thử và phát hành chọn Phát hành công khai > Tạo bản phát hành mới và upload AAB mới Tên bản phát hành cấu trúc
Prod-1.0.1 (Phien ban ke tiep build). Ghi chú phát hành: Note các nội dung mới hoặc thay đổi trong phiên bản build hiện tại. > Xác nhận > Chờ duyệt > Release

