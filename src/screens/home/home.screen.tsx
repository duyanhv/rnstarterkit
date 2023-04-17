import {connect} from 'react-redux';
import {Dispatch, RootState} from '@store/store';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS_LOOKUP, useAppTheme} from '@app/core/contexts';
import {Button, Icon, Layout, ProgressBar, ScrollView, Text, View, FlatList, SectionHeader} from '@app/core/components';
import {hp, wp} from '@app/core/helpers';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Card} from './components';
import FastImage from 'react-native-fast-image';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Typography',
    description: 'Clean, smart typography makes you (or your client) look clean and smart, too.',
    image: require('@assets/images/home/typography.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Illustrations',
    description: 'Beautiful illustrations for your projects.',
    image: require('@assets/images/home/icons.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Flower Shapes',
    description: 'Abstract shapes to make your project more modern and attract the eye.',
    image: require('@assets/images/home/flower.png'),
  },
  {
    id: '58194a0f-3da1-471f-bd96-145571e29d72',
    title: 'Icons',
    description: 'Minimalistic Icons to make your design even more enjoyable for the user.',
    image: require('@assets/images/home/illustrations.png'),
  },
];

function Home(props: Props) {
  const {appTheme} = useAppTheme();
  const {t} = useTranslation();
  return (
    <Layout>
      <ScrollView contentContainerStyle={{rowGap: 20, flexGrow: 1}} style={[styles.scrollView]}>
        <Text type='h1'>Hello, Jane!</Text>
        <View style={styles.searchWrapper}>
          <Icon name={'magnify'} color={'#fff'} size={25} />
          <TextInput placeholder={t('common:search') as string} placeholderTextColor={'#fff'} />
        </View>
        <View style={[styles.greetingWrapper, {backgroundColor: '#fff'}]}>
          <View style={{flex: 1.2, paddingRight: 5, rowGap: 10}}>
            <Text type='h1' style={{color: appTheme.colors.background}}>
              {/* What will we study today? */}
              {t('home:greetings')}
            </Text>
            <Button mode='contained' contentStyle={{backgroundColor: COLORS_LOOKUP.ORANGE.darkColor}}>
              {t('common:start')}
            </Button>
          </View>

          <View style={{flex: 2}}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{width: wp(70), height: hp(20)}}
              source={require('@assets/images/home/greeting.png')}
            />
          </View>
        </View>
        <SectionHeader title={t('home:highlights')} buttonTitle={t('home:filters')} />
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Card image={item.image} title={item.title} description={item.description} progress={0.4} />
          )}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text type='h1'>{t('home:yourCourses')}</Text>
          <TouchableOpacity>
            <Text style={{color: appTheme.colors.primary}} type='h5'>
              {t('home:all')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'red', height: hp(30)}}></View>
      </ScrollView>
    </Layout>
  );
}
const BORDER_RADIUS = 15;
const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 15,
  },
  greetingWrapper: {flexDirection: 'row', padding: 10, borderRadius: BORDER_RADIUS},
  searchWrapper: {
    backgroundColor: COLORS_LOOKUP.GRAY.darkColor,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
    flexDirection: 'row',
    columnGap: 10,
  },
});
const mapState = (state: RootState) => ({
  countState: state.count,
});

const mapDispatch = (dispatch: Dispatch) => ({
  count: dispatch.count,
});
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps;

export const HomeScreen = connect(mapState, mapDispatch)(Home);
