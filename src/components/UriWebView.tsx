import React, { useRef } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { WebView } from 'react-native-webview'
import SectionContainer from './ui/SectionContainer/SectionContainer.component'

type Props = {
	uri: string
	headers?: Record<string, string>
	style?: StyleProp<ViewStyle>
}

const UriWebView: React.FC<Props> = ({ uri, headers, style }) => {
	const webviewRef = useRef<any>(null)

	// chèn meta viewport để cho phép zoom (user-scalable=yes) trước khi nội dung load
	const injectedBefore = `(function(){
		try{
				var meta = document.querySelector('meta[name="viewport"]');
				if(!meta){
						meta = document.createElement('meta');
						meta.name = 'viewport';
						meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
						document.head.appendChild(meta);
				} else {
						meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
				}
				document.documentElement.style.overflow = 'auto';
				document.body.style.overflow = 'auto';
				document.body.style.webkitOverflowScrolling = 'touch';
		}catch(e){}
})();true;`

	// script chạy sau khi load xong để ẩn .card (như trước)
	const onWebviewLoadEnd = (_syntheticEvent: any) => {
		const script = `(function(){try{var els=document.querySelectorAll('.card');els.forEach(function(e){e.style.display='none';});}catch(e){} })();true;`
		webviewRef.current?.injectJavaScript?.(script)
	}
	const handleError = (event: any): void => {
		const { description } = event.nativeEvent;

		const isSslError = description?.toLowerCase().includes('ssl');
		if (isSslError) {
			console.log(description);
		}

	};

	return (
		<SectionContainer title=''>
			<WebView
				source={{
					uri,
					headers,
				}}
				ref={webviewRef}
				// bật javascript + dom storage
				javaScriptEnabled={true}
				domStorageEnabled={true}
				// giúp trang co dãn/zoom (iOS/Android)
				scalesPageToFit={false}
				injectedJavaScriptBeforeContentLoaded={injectedBefore}
				onLoadEnd={onWebviewLoadEnd}
				originWhitelist={['*']}
				nestedScrollEnabled={true}
				scrollEnabled={true}
				bounces={false}
				overScrollMode="never"
				style={style}
				onError={handleError}
			/>

		</SectionContainer>
	)
}

export default UriWebView
