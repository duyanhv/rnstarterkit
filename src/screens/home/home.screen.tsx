import {connect} from 'react-redux';
import {Dispatch, RootState} from '@store/store';
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Home(props: Props) {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
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
