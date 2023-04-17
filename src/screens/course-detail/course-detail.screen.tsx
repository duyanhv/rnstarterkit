import {Layout, Text, View} from '@app/core/components';
import {hp, wp} from '@app/core/helpers';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect, useLayoutEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {withSpring, withTiming} from 'react-native-reanimated';
import {SharedTransition} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
type Props = StackScreenProps<{}>;
export function CourseDetailScreen(props: Props): JSX.Element {
  const navigation = useNavigation();
  useEffect(() => {
    console.log(props.route.params.item.id);
  }, []);
  return (
    <Layout header headerBackButton>
      <Text type='h1'>{props.route.params.item.title}</Text>
      <SharedElement id={`item.${props.route.params.item.id}.photo`}>
        <FastImage
          style={{width: wp(100), height: wp(60), backgroundColor: '#fff'}}
          source={props.route.params.item.photo as any}
        />
      </SharedElement>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </Layout>
  );
}
