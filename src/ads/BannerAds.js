import React, {useEffect, useRef} from 'react';
import {View} from 'react-native'
import AdMob, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from '@react-native-admob/admob';

const BannerAds = () => {
  const bannerRef = useRef(null);
  const unitId = TestIds.BANNER;
  const config = {
    maxAdContentRating: 'G',
    tagForChildDriectedTreatment: true,
    tagForUnderAgeConsent: false,
  };
  useEffect(() => {
    AdMob.setRequestConfiguration(config);
    const init = async () => {
      await AdMob.initialize();
    };
    init();
  });
  return (
      <BannerAd
        size={BannerAdSize.ADAPTIVE_BANNER}
        unitId={unitId}
        onAdFailedToLoad={error => console.log(error)}
        ref={bannerRef}
      />
  );
};

export default BannerAds;
