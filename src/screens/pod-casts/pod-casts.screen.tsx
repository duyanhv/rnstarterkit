import {MODAL_SCREEN_NAME} from '@app/app.constants';
import {Layout, ScrollView, SectionHeader, TouchableOpacity, View, Text, Icon, FlatList} from '@app/core/components';
import {useAppTheme} from '@app/core/contexts';
import {hp, wp} from '@app/core/helpers';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

const PodCast = ({
  title,
  description,
  handleOnPress,
  createdAt,
  photo,
}: {
  title: string;
  description: string;
  createdAt: string;
  photo: string;
  handleOnPress: () => void;
}) => {
  return (
    <TouchableOpacity style={{rowGap: 5, width: wp(50), marginRight: 10}} onPress={handleOnPress}>
      <FastImage
        style={{width: wp(50), height: wp(50), borderRadius: 30, backgroundColor: '#fff'}}
        source={photo as any}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={{flexDirection: 'row', columnGap: 5}}>
        <Icon color={'#fff'} size={10} name={'clock-outline'} />
        <Text>{createdAt}</Text>
      </View>
      <Text type='h6'>{title}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};
const DATA = [
  {
    id: 1,
    title: 'App design: Build Mobile Apps Without Coding',
    description: 'Learn to build beautiful mobile apps without writing a single line of code',
    createdAt: '20 hours ago . 25 min left',
    photo: require('@assets/images/pod-cast/pod-cast-1.png'),
  },
  {
    id: 2,
    title: 'App design: Build Mobile Apps Without Coding',
    description: 'Learn to build beautiful mobile apps without writing a single line of code',
    createdAt: '20 hours ago . 25 min left',
    photo: require('@assets/images/pod-cast/pod-cast-2.png'),
  },
];
export const PodCastScreen = () => {
  const {t} = useTranslation('podCast');
  const {appTheme} = useAppTheme();
  const navigation = useNavigation();
  return (
    <Layout header headerTitle={t('podCast') as string}>
      <ScrollView contentContainerStyle={{rowGap: 20, flexGrow: 1}} style={{paddingHorizontal: 20}}>
        <SectionHeader title={t('continueListening')} buttonTitle={t('common:all')} />
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{maxHeight: hp(30)}}
          renderItem={({item}) => (
            <PodCast {...item} handleOnPress={() => navigation.navigate(MODAL_SCREEN_NAME.POD_CAST_DETAIL)} />
          )}
        />
        <SectionHeader title={t('youMightAlsoLike')} buttonTitle={t('common:all')} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate(MODAL_SCREEN_NAME.POD_CAST_DETAIL)}>
            <FastImage
              style={{width: wp(28), height: wp(28), borderRadius: 30, backgroundColor: '#fff'}}
              source={require('@assets/images/pod-cast/pod-cast-3.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 8, justifyContent: 'space-between', paddingVertical: 10}}>
            <View>
              <TouchableOpacity onPress={() => {}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', columnGap: 5}}>
                  <Text style={{flexShrink: 1, flexWrap: 'wrap', width: wp(80)}} type='h5'>
                    {'Pet Projects: Where to look for idea'}
                  </Text>
                  <Icon color={appTheme.colors.primary} name={'play-circle'} />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  flexShrink: 1,
                  flexWrap: 'wrap',
                  width: wp(50),
                }}>{`What IT people work on their free time and what motivates them`}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text>{t('selectedForYou')}</Text>
              <TouchableOpacity>
                <Icon color={'#fff'} name={'dots-horizontal'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};
