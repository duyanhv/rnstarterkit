import {Layout, SectionHeader, Text, View} from '@app/core/components';
import {useAppTheme} from '@app/core/contexts';
import {ArticlesList, SwipeableCard} from '@app/screens/courses/components';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {}
const DATA = [
  {id: 1, title: 'Design is not Art - but Empathy', photo: require('@assets/images/course/design.png'), createdAt: 'Feb 8, 2022', readTime: '10 mins read'},
  {id: 2, title: 'Design1 is not Art - but Empathy', photo: require('@assets/images/course/design1.png'), createdAt: 'Feb 8, 2022', readTime: '10 mins read'},
  {id: 3, title: 'Design1 is not Art - but Empathy', photo: require('@assets/images/course/design2.png'), createdAt: 'Feb 8, 2022', readTime: '10 mins read'}
];
export function CoursesScreen(props: Props): JSX.Element {
  const {t} = useTranslation('course');
  const {appTheme} = useAppTheme();
  const navigation = useNavigation();
  return (
    <Layout header headerTitle={t('common:courses') as string}>
      <ScrollView contentContainerStyle={{rowGap: 20, flexGrow: 1}} style={{paddingHorizontal:20}}>
        <SectionHeader title={t('continueCourses')} buttonTitle={t('common:all')} />
        <SwipeableCard />
        <SectionHeader title={t('articles')} buttonTitle={t('common:all')} />
        <View>
          <ScrollView horizontal>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: appTheme.colors.primary,
                  borderRadius: 30,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text type='h6'>For you</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <ArticlesList articlesList={DATA} />
        </View>
      </ScrollView>
    </Layout>
  );
}
const styles = StyleSheet.create({});
