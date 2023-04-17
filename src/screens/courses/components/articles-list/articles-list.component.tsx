import {FlatList, ScrollView, View} from '@app/core/components';
import {IArticle} from '../interface';
import {useNavigation} from '@react-navigation/native';
import {Article} from '@app/screens/courses/components/articles-list/article.component';
import {SCREEN_NAME} from '@app/app.constants';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  articlesList: IArticle[];
}
export function ArticlesList(props: Props): JSX.Element {
  const {articlesList} = props;
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <View style={{flex: 1}}>
      {articlesList.map((item) => (
        <View key={item.id.toString()} style={{paddingBottom: 10}}>
          <Article onOpenArticleDetail={() => navigation.navigate(SCREEN_NAME.COURSE_DETAIL, {item})} data={item} />
        </View>
      ))}
    </View>
  );
}
