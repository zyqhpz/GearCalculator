import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import Example from './Example';

import Speed from './Speed';
import Tune from './Tune';

import C from './C';
import Graph from './Graph';

import Map from './examples/Map';
import Line from './examples/LineD';
import LineChart from './examples/LineChart';

import BarChart from './examples/Bar';

const App: FC = () => {
  const dimensions = Dimensions.get('window');

  const data = [
    {label: 'Jan', value: 500},
    {label: 'Feb', value: 312},
    {label: 'Mar', value: 424},
    {label: 'Apr', value: 745},
    {label: 'May', value: 89},
    {label: 'Jun', value: 434},
    {label: 'Jul', value: 650},
    {label: 'Aug', value: 980},
    {label: 'Sep', value: 123},
    {label: 'Oct', value: 186},
    {label: 'Nov', value: 689},
    {label: 'Dec', value: 643},
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Graph speed={123} />
        </View>
        {/* <Map dimensions={dimensions} /> */}
        <View style={styles.container}>
          <BarChart data={data} round={100} unit="€" />
        </View>
        {/* <BarChart /> */}
        {/* <View> */}
        {/* <Line /> */}
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
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
