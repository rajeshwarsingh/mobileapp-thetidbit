import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

export default function Browser({ route }) {
  const { link } = route.params;
  return <WebView source={{ uri: link }} />
}