import React, {useEffect, useRef, useState} from 'react';
import {View, DeviceEventEmitter} from 'react-native';
import { Events, Logger } from './Utils';
import NativeAdView, {
  AdBadge,
  HeadlineView,
  IconView,
  TaglineView,
  AdvertiserView,
  StoreView,
  StarRatingView,
} from 'react-native-admob-native-ads';

export const NativeAds = ({index, loadOnMount = true, type }) => {
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const nativeAdViewRef = useRef();

  const onAdFailedToLoad = event => {
    setError(true);
    setLoading(false);
    /**
     * Sometimes when you try to load an Ad, it will keep failing
     * and you will recieve this error: "The ad request was successful,
     * but no ad was returned due to lack of ad inventory."
     *
     * This error is not a bug or issue with our Library.
     * Just remove the app from your phone & clean your build
     * folders by running ./gradlew clean in /android folder
     * and for iOS clean the project in xcode. Hopefully the error will
     * be gone.
     *
     * [iOS] If you get this error: "Cannot find an ad network adapter with
     * the name(s): com.google.DummyAdapter". The ad inventory is empty in your
     * location. Try using a vpn to get ads in a different location.
     *
     * If you have recently created AdMob IDs for your ads, it might take
     * a few days until the ads will start showing.
     */
    Logger('AD', 'FAILED', event.error.message);
  };

  const onAdLoaded = () => {
    Logger('AD', 'LOADED', 'Ad has loaded successfully');
  };

  const onAdClicked = () => {
    Logger('AD', 'CLICK', 'User has clicked the Ad');
  };

  const onAdImpression = () => {
    Logger('AD', 'IMPRESSION', 'Ad impression recorded');
  };

  const onNativeAdLoaded = event => {
    Logger('AD', 'RECIEVED', 'Unified ad  Recieved', event);
    setLoading(false);
    setLoaded(true);
    setError(false);
    setAspectRatio(event.aspectRatio);
  };

  const onAdLeftApplication = () => {
    Logger('AD', 'LEFT', 'Ad left application');
  };

  const onViewableItemsChanged = event => {
    /**
     * [STEP IV] We check if any AdViews are currently viewable.
     */
    let viewableAds = event.viewableItems.filter(
      i => i.key.indexOf('ad') !== -1,
    );

    viewableAds.forEach(adView => {
      if (adView.index === index && !loaded) {
        /**
         * [STEP V] If the ad is viewable and not loaded
         * already, we will load the ad.
         */
        setLoading(true);
        setLoaded(false);
        setError(false);
        Logger('AD', 'IN VIEW', 'Loading ' + index);
        nativeAdViewRef.current?.loadAd();
      } else {
        /**
         * We will not reload ads or load
         * ads that are not viewable currently
         * to save bandwidth and requests sent
         * to server.
         */
        if (loaded) {
          Logger('AD', 'IN VIEW', 'Loaded ' + index);
        } else {
          Logger('AD', 'NOT IN VIEW', index);
        }
      }
    });
  };

  useEffect(() => {
    /**
     * for previous steps go to List.js file.
     *
     * [STEP III] We will subscribe to onViewableItemsChanged event in all AdViews in the List.
     */
    if (!loadOnMount) {
      DeviceEventEmitter.addListener(
        Events.onViewableItemsChanged,
        onViewableItemsChanged,
      );
    }

    return () => {
      if (!loadOnMount) {
        DeviceEventEmitter.removeListener(
          Events.onViewableItemsChanged,
          onViewableItemsChanged,
        );

      }
    };
  }, [index, loadOnMount, loaded]);

  useEffect(() => {
    if (loadOnMount || index <= 15) {
      setLoading(true);
      setLoaded(false);
      setError(false);
      nativeAdViewRef.current?.loadAd();
    }
    return () => {
      setLoaded(false);
    };
  }, [loadOnMount]);

  return (
      <NativeAdView
        ref={nativeAdViewRef}
        adUnitID="ca-app-pub-3940256099942544/2247696110"
        style={{
          width: '98%',
          backgroundColor: 'transparent',
          marginTop: 30,
        }}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={onAdFailedToLoad}
        onAdLeftApplication={onAdLeftApplication}
        onAdClicked={onAdClicked}
        onAdImpression={onAdImpression}
        onNativeAdLoaded={onNativeAdLoaded}
        >
        <View
          style={{
            width: '100%',
          }}>
          <AdBadge style={{width: 15, height: 15, marginLeft: 10}} />
          <View
            style={{
              height: 60,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <IconView
              style={{
                height: 50,
                width: 50,
                marginRight: 40,
              }}
            />
            <View
              style={{
                width: '60%',
                maxWidth: '60%',
                paddingHorizontal: 6,
              }}>
              <HeadlineView
                hello="abc"
                style={{
                  fontWeight: 'bold',
                  fontSize: 10,
                }}
              />
              <TaglineView
                numberOfLines={2}
                style={{
                  fontSize: 10,
                  color: 'gray',
                }}
              />
              <AdvertiserView
                style={{
                  fontSize: 5,
                  color: 'gray',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <StoreView style={{fontSize: 12}} />
                <StarRatingView
                  startSize={12}
                  fullStarColor="orange"
                  emptyStarColor="gray"
                  style={{
                    width: 65,
                    marginLeft: 10,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </NativeAdView>
  );
};

export default NativeAds;
