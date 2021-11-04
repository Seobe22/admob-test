import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  DeviceEventEmitter,
  Image
} from 'react-native';
import BannerAds from './BannerAds';
import {NativeAds} from './NativeAds';
import {listItemsGenerator, Events} from './Utils';
const dummyData = listItemsGenerator(4);
let viewableItemsChanged = null;

const List = () => {
  const renderItem = React.useCallback(
    ({item, index}) =>
      item.includes('ad') ? (
        <NativeAds loadOnMount={false} index={index} type="image" />
      ) : (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'orange',
            width: '100%',
            paddingHorizontal: 30,
            flexDirection: 'row',
            alignItems : 'center'
          }}>
          <Image
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height : 50
            }}
            source={require("./icons.png")}
            />
          <Text
            style={{
              paddingHorizontal: 6,
              height: 60,
              textAlignVertical: 'center',
              marginLeft: 40,
            }}>
            {item}
          </Text>
        </View>
      ),
    [],
  );

  const onScrollEnd = React.useCallback(() => {
    DeviceEventEmitter.emit(
      Events.onViewableItemsChanged,
      viewableItemsChanged,
    );
  }, []);

  /**
   * [STEP I] When viewable items change in the list
   * we want to know what items are visible and store them
   * in a variable for later us.
   */
  const onViewableItemsChanged = React.useCallback(e => {
    viewableItemsChanged = e;
  }, []);

  const keyExtractor = React.useCallback(item => item, []);
  return (
    <View style={styles.container}>
      <BannerAds />
      <FlatList
        style={styles.list}
        keyExtractor={keyExtractor}
        data={dummyData}
        onScrollAnimationEnd={onScrollEnd}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={renderItem}
      />
      <View style={{paddingBottom : 10}}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    marginBottom: 10,
  },
});

export default List;
