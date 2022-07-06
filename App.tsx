import React, {FC} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';

import Speed from './Speed';

const App: FC = () => {
  return <Speed />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default App;

// npm run lint -- --fix
