import React, {createRef} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Linking} from 'react-native';
import { Layout } from '@app/core/components';

interface WebViewParams {
  title: string;
  url: string;
}

const WHITELIST_URLS = [''];

export const WebViewScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const {title, url}: WebViewParams = route.params as WebViewParams;
  const webviewRef = createRef<WebView>();

  const goBack = (): void => {
    navigation.goBack();
  };

  const handleWebViewNavigationStateChange = (event: WebViewNavigation): void => {
    const {url: newUrl} = event;
    if (!url) return;
    if (WHITELIST_URLS.length < 1) {
      Linking.openURL(newUrl);
      return;
    }
    // only whitelisted websites can be processed
    if (!WHITELIST_URLS.find((whitelistUrl) => newUrl.indexOf(whitelistUrl) > -1) && webviewRef.current) {
      webviewRef.current.stopLoading();
      Linking.openURL(newUrl);
    }
  };

  return (
    <Layout header headerTitle={title} headerBackButton headerBackButtonOnPress={goBack}>
      <WebView ref={webviewRef} source={{uri: url}} onNavigationStateChange={handleWebViewNavigationStateChange} />
    </Layout>
  );
};
