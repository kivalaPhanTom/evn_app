Note: Để tránh lỗi của thư viện WebView khi build android lưu ý 

Vào node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewClient.java
```@Override
public void onReceivedSslError(final WebView webView, final SslErrorHandler handler, final SslError error) {
    String topWindowUrl = webView.getUrl();
    String failingUrl = error.getUrl();

   handler.proceed(); // cancel ``` thay handler.cancel() thành proceed.

-> Sau đó tiến hành build. 