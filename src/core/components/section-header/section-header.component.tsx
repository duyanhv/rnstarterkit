import {TouchableOpacity, View, Text, Icon} from '@app/core/components';
import {useAppTheme} from '@app/core/contexts';

export function SectionHeader({title, buttonTitle}: {title: string; buttonTitle: string}): JSX.Element {
  const {appTheme} = useAppTheme();
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Text type='h1'>{title}</Text>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: appTheme.colors.primary}} type='h5'>
          {buttonTitle}
        </Text>
        <Icon color={appTheme.colors.primary} size={30} name={'chevron-right'} />
      </TouchableOpacity>
    </View>
  );
}
