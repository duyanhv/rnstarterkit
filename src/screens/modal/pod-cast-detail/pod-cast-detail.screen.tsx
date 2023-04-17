import {Layout, View, Text, Icon, TouchableOpacity, ProgressBar} from '@app/core/components';
import {COLORS, COLORS_LOOKUP} from '@app/core/contexts';
import {hp, wp} from '@app/core/helpers';
import FastImage from 'react-native-fast-image';

export const PodCastDetailScreen = () => {
  return (
    <Layout>
      <View style={{flex: 1, paddingHorizontal: 20, rowGap: 10}}>
        <FastImage
          style={{width: wp(90), height: wp(90), borderRadius: 30, backgroundColor: '#fff'}}
          source={require('@assets/images/pod-cast/pod-cast-3.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{flexShrink: 1, flexWrap: 'wrap', width: wp(80)}} type='h2'>
            The importance of collaboration and play
          </Text>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              backgroundColor: 'red',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon color={'#fff'} size={20} name={'bookmark-outline'} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <Text
              style={{flexShrink: 1, flexWrap: 'wrap', width: wp(80), color: COLORS_LOOKUP.ORANGE.darkColor}}
              type='h6'>
              The Creative Boom Podcast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon color={'#fff'} name={'dots-horizontal'} />
          </TouchableOpacity>
        </View>
        <ProgressBar style={{backgroundColor: COLORS_LOOKUP.GRAY.darkColor}} progress={0.2} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>20:01</Text>
          <Text>- 1:04:10</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', columnGap: 15, alignItems: 'center'}}>
          <TouchableOpacity>
            <Icon color={'#fff'} size={30} name={'rewind-10'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon color={'#fff'} size={60} name={'skip-previous'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon color={'#fff'} size={80} name={'play-circle'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon color={'#fff'} size={60} name={'skip-next'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon color={'#fff'} size={30} name={'fast-forward-10'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            justifyContent: 'space-between',
            width: wp(80),
			alignSelf:'center'
          }}>
          <TouchableOpacity>
            <Icon color={'#fff'} size={40} name={'replay'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon color={'#fff'} size={40} name={'animation-outline'} />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};
