import React, {FC} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
} from 'victory-native';

import {data, data2} from './data';

// const data = [
//   {quarter: 1, earnings: 13000},
//   {quarter: 2, earnings: 16500},
//   {quarter: 3, earnings: 14250},
//   {quarter: 4, earnings: 19000},
// ];

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <VictoryChart width={350} theme={VictoryTheme.material}>
//           <VictoryBar data={data} x="quarter" y="earnings" />
//         </VictoryChart>
//       </View>
//     );
//   }
// }

const {width} = Dimensions.get('screen');

const App: FC = props => {
  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryBar
          // style={{data: {fill: 'orange', width: 15}}}
          barWidth={15}
          width={width / 1.0}
          animate
          data={data}
          x="month"
          y="earnings"
        />
      </VictoryChart>
      <VictoryChart>
        <VictoryLine
          style={{data: {stroke: 'blue', strokeWidth: 2}}}
          animate
          data={data2}
          x="month"
          y="earnings"
        />
        <VictoryLine
          style={{data: {stroke: 'orange', strokeWidth: 2}}}
          animate
          data={data}
          x="month"
          y="earnings"
        />
      </VictoryChart>
    </View>
  );
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
