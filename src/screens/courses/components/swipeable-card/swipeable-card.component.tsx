import {View, Text, Button, Icon} from '@app/core/components';
import {useAppTheme} from '@app/core/contexts';
import {hp, wp} from '@app/core/helpers';
import {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
const DATA = [
  {id: 1, colors: ['#D16BA5', '#86A8E7', '#5FFBF1']},
  {id: 2, colors: ['#DCAE47', '#8FA64C', '#16636E']},
  {id: 3, colors: ['#FFDCA9', '#BDC492', '#81A888']},
];
export function SwipeableCard() {
  const {appTheme} = useAppTheme();
  const renderCard = ({id, colors}: {id: number; colors: string[]}) => {
    const cardsStackedAnim = useSharedValue(0);
    const position = useSharedValue(0);
    const scale = useSharedValue({inputRange: [0, 1], outputRange: [1, 0.8]});
    const gesture = Gesture.Pan()
      .onBegin(() => {})
      .onUpdate((e) => {
        position.value = e.translationX;
      })
      .onEnd(() => {
        position.value = withSpring(0);
        cardsStackedAnim.value = 1;
      })
      .onFinalize(() => {
        //   isPressed.value = false;
        //   setCurrentCardIndex(currentCardIndex === 3 ? 1 : currentCardIndex + 1);
      });
    const animStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {translateX: position.value},
        //   {
        //     scale: interpolate(cardsStackedAnim.value, scale.value.inputRange, scale.value.outputRange, {
        //       extrapolateRight: Extrapolation.CLAMP,
        //     }),
        //   },
        ],
        // zIndex: zIndex ? interpolate(cardsStackedAnim.value, zIndex.inputRange, zIndex.outputRange) : undefined,
        // opacity: interpolate(cardsStackedAnim.value, opacity.inputRange, opacity.outputRange),
        // right: interpolate(cardsStackedAnim.value, right.inputRange, right.outputRange),
      };
    });
    return (
      <GestureDetector key={`${id.toString()}`} gesture={gesture}>
        <View>
          <Animated.View
            style={[
              {
                height: hp(25),
                position: 'absolute',
                width: '100%',
                alignSelf: 'center',
              },
              animStyle,
            ]}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              colors={colors}
              style={{
                flex: 1,
                borderRadius: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{marginLeft: 10, flex: 1, rowGap: 10}}>
                <Text style={{flexWrap: 'wrap'}} type='h1'>
                  User Research and Design
                </Text>
                <Text style={{flexWrap: 'wrap'}}>
                  In this course you will learn and practice techniques of user research and early UI design exploration
                </Text>
                <Button style={{backgroundColor: '#fff', width: wp(30)}} icon={'play-circle-outline'}>
                  <Text type='h6' style={{color: appTheme.colors.primary}}>
                    Lesson 1
                  </Text>
                </Button>
              </View>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{width: wp(30), height: hp(20)}}
                source={require('@assets/images/course/course1.png')}
              />
            </LinearGradient>
          </Animated.View>
        </View>
      </GestureDetector>
    );
  };
  return (
    <View style={{height: hp(25)}}>{DATA.map((item, index) => renderCard({id: item.id, colors: item.colors}))}</View>
  );
}
