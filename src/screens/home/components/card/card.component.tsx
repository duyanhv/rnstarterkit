import React from 'react';
import {Icon, View, Text, ProgressBar} from '@app/core/components';
import {wp, hp} from '@app/core/helpers';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useAppTheme} from '@app/core/contexts';
import FastImage from 'react-native-fast-image';

interface Props {
  title: string;
  description: string;
  image: string;
  progress: number;
}
const BORDER_RADIUS = 15;
export function Card(props: Props): JSX.Element {
  const {appTheme} = useAppTheme();
  const {title, description, image, progress} = props;
  //   const _image = require(`@assets/images${image}`)
  return (
    <TouchableOpacity>
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text type={'h3'} style={{color: appTheme.colors.primary}}>
            {title}
          </Text>
          <Icon name={'chevron-right'} color={appTheme.colors.primary} />
        </View>
        <ProgressBar progress={progress} />
        <Text style={{color: appTheme.colors.background}}>{description}</Text>
        <View style={styles.imageWrapper}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={{width: wp(70), height: hp(20)}}
            source={image as any}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS,
    padding: 20,
    rowGap: 10,
    width: wp(50),
    marginRight: 10,
    height: hp(35),
  },
  titleWrapper: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  imageWrapper: {
    borderRadius: BORDER_RADIUS,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
