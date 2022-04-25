import {BannerAd} from '@react-native-admob/admob';
import React from 'react';
import {View, Text} from 'react-native';
import BannerAds from './ads/BannerAds';
import NativeAds from './ads/NativeAds';
import List from './ads/List';

const TestScreen = () => {
  return (
    <>
      <View>
        <List />
      </View>
    </>
  );
};

export default TestScreen;
