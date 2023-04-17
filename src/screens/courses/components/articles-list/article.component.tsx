import {TouchableOpacity, View, Text, Icon} from '@app/core/components';
import {hp, wp} from '@app/core/helpers';
import {useTranslation} from 'react-i18next';
import {SharedElement} from 'react-navigation-shared-element';
import {IArticle} from '../interface';
import FastImage from 'react-native-fast-image';

interface Props {
  data: IArticle;
  onOpenArticleDetail: () => void;
}
export function Article(props: Props): JSX.Element {
  const {data, onOpenArticleDetail} = props;
  const {t} = useTranslation();
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => onOpenArticleDetail()}>
        <SharedElement id={`item.${data.id}.photo`}>
          <FastImage
            style={{width: wp(30), height: wp(30), borderRadius:30, backgroundColor:'#fff'}}
            source={data.photo as any}
          />
        </SharedElement>
      </TouchableOpacity>
      <View style={{flex: 1, marginLeft: 8, justifyContent: 'space-between', paddingVertical: 10}}>
        <View>
          <TouchableOpacity onPress={() => onOpenArticleDetail()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text type='h5'>{data.title}</Text>
              <Icon color={'#fff'} name={'chevron-right'} />
            </View>
          </TouchableOpacity>
          <Text>{`${data.createdAt} - ${data.readTime}`}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>{t('course:selectedForYou')}</Text>
          <TouchableOpacity>
            <Icon color={'#fff'} name={'bookmark-outline'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
