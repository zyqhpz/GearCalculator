import React, {FC} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Example from './Example';

import Speed from './Speed';
import Tune from './Tune';

import C from './C';

const App: FC = () => {
  return <Tune speed={123} />;
  // return <Example />;
  // return <C />;
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
