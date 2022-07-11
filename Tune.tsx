import React, {FC} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Text} from 'react-native';
import {VictoryChart, VictoryTheme, VictoryLine} from 'victory-native';

import Tire from './data/model/Tire';
import Gear from './data/model/Gear';
import Tuning from './data/model/Tuning';
import tireSpec from './data/tire';
import gearRatioData from './data/gear';

const tire = new Tire(tireSpec.width, tireSpec.aspectRatio, tireSpec.diameter);

let gears = Array<Gear>();

for (let i = 0; i < gearRatioData.length; i++) {
  const gear = new Gear(gearRatioData[i].ratio, gearRatioData[i].speed);
  gears.push(gear);
}

const tuning = new Tuning(gears, 7000, tire);

tuning.calculateSpeed(7000, 0.245);
tuning.calculateSpeeds(0.245);

gears = tuning.getGears();

interface Speed {
  rpm: number;
  speed: number;
}

const tuningView = gears.map((gear, i) => {
  var colors = ['green', 'red', 'blue', 'orange', 'purple'];

  var rpmSpeed = gears[i].getRatioSpeeds();

  let _rpmList;

  if (i == 0) {
    _rpmList = [0, 4000, 5000, 6000, 7000, 8000];

    var object: Speed = [
      {
        rpm: 0,
        speed: 0,
      },
      {
        rpm: 4000,
        speed: 0,
      },
      {
        rpm: 5000,
        speed: 0,
      },
      {
        rpm: 6000,
        speed: 0,
      },
      {
        rpm: 7000,
        speed: 0,
      },
      {
        rpm: 8000,
        speed: 0,
      },
    ];
  } else {
    _rpmList = [4000, 5000, 6000, 7000, 8000];
    var object: Speed = [
      {
        rpm: 4000,
        speed: 0,
      },
      {
        rpm: 5000,
        speed: 0,
      },
      {
        rpm: 6000,
        speed: 0,
      },
      {
        rpm: 7000,
        speed: 0,
      },
      {
        rpm: 8000,
        speed: 0,
      },
    ];
  }

  for (let m = 0; m < _rpmList.length; m++) {
    object[m] = {
      rpm: _rpmList[m],
      speed: rpmSpeed.get(_rpmList[m]),
    };
  }
  return (
    <VictoryLine
      key={'gear_' + i}
      data={object}
      y="rpm"
      x="speed"
      style={{
        data: {
          // stroke: colors[i],
          stroke: 'green',
          strokeWidth: 2,
        },
      }}
    />
  );
});

let progressivePointsRpm = Array<Number>();
let progressivePointsSpeed = Array<Number>();

const tuningViewVertical = gears.map((gear, i) => {
  if (i !== 4) {
    let speed = gears[i].getSpeeds();

    // get last element of array
    let last = speed[speed.length - 1];

    let rpm =
      (last * gears[i + 1].getRatio()) /
      (0.245 * tire.getCircumference() * 0.001 * 60);

    var object: Speed = [
      {
        rpm: rpm,
        speed: last,
      },
      {
        rpm: 8000,
        speed: last,
      },
    ];
    progressivePointsRpm.push(rpm);
    progressivePointsSpeed.push(last);
    return (
      <VictoryLine
        key={'gear_' + i}
        data={object}
        y="rpm"
        x="speed"
        style={{
          data: {
            stroke: 'black',
            strokeWidth: 2,
          },
        }}
      />
    );
  }
});

const progressiveLine = (
  <VictoryLine
    data={[
      {
        rpm: progressivePointsRpm[0],
        speed: progressivePointsSpeed[0],
      },
      {
        rpm: progressivePointsRpm[1],
        speed: progressivePointsSpeed[1],
      },
      {
        rpm: progressivePointsRpm[2],
        speed: progressivePointsSpeed[2],
      },
      {
        rpm: progressivePointsRpm[3],
        speed: progressivePointsSpeed[3],
      },
    ]}
    y="rpm"
    x="speed"
    style={{
      data: {
        stroke: 'red',
        strokeWidth: 2,
      },
    }}
  />
);

// const tuningViewCombined = gears.map((gear, i) => {
//   var colors = ['green', 'red', 'blue', 'orange', 'purple'];

//   var rpmSpeed = gears[i].getRatioSpeeds();

//   let _rpmList;

//   if (i == 0) {
//     _rpmList = [0, 4000, 5000, 6000, 7000, 8000];

//     var object: Speed = [
//       {
//         rpm: 0,
//         speed: 0,
//       },
//       {
//         rpm: 4000,
//         speed: 0,
//       },
//       {
//         rpm: 5000,
//         speed: 0,
//       },
//       {
//         rpm: 6000,
//         speed: 0,
//       },
//       {
//         rpm: 7000,
//         speed: 0,
//       },
//       {
//         rpm: 8000,
//         speed: 0,
//       },
//     ];
//   } else {
//     _rpmList = [4000, 5000, 6000, 7000, 8000];
//     var object: Speed = [
//       {
//         rpm: 4000,
//         speed: 0,
//       },
//       {
//         rpm: 5000,
//         speed: 0,
//       },
//       {
//         rpm: 6000,
//         speed: 0,
//       },
//       {
//         rpm: 7000,
//         speed: 0,
//       },
//       {
//         rpm: 8000,
//         speed: 0,
//       },
//     ];
//   }

//   for (let m = 0; m < _rpmList.length; m++) {
//     object[m] = {
//       rpm: _rpmList[m],
//       speed: rpmSpeed.get(_rpmList[m]),
//     };
//   }
//   return (
//     <VictoryLine
//       key={'gear_' + i}
//       data={object}
//       y="rpm"
//       x="speed"
//       style={{
//         data: {
//           // stroke: colors[i],
//           stroke: 'green',
//           strokeWidth: 2,
//         },
//       }}
//     />
//   );
// });

var rpmSpeed1 = gears[0].getRatioSpeeds();
var rpmSpeed4 = gears[4].getRatioSpeeds();

const tuningViewCombined = (
  <VictoryLine
    data={[
      {
        rpm: 0,
        speed: 0,
      },
      {
        rpm: 8000,
        speed: rpmSpeed1.get(8000),
      },
      {
        rpm: 8000,
        speed: progressivePointsSpeed[0],
      },
      {
        rpm: progressivePointsRpm[0],
        speed: progressivePointsSpeed[0],
      },
      {
        rpm: 8000,
        speed: progressivePointsSpeed[1],
      },
      {
        rpm: progressivePointsRpm[1],
        speed: progressivePointsSpeed[1],
      },
      {
        rpm: 8000,
        speed: progressivePointsSpeed[2],
      },
      {
        rpm: progressivePointsRpm[2],
        speed: progressivePointsSpeed[2],
      },
      {
        rpm: 8000,
        speed: progressivePointsSpeed[3],
      },
      {
        rpm: progressivePointsRpm[3],
        speed: progressivePointsSpeed[3],
      },
      {
        rpm: 8000,
        speed: rpmSpeed4.get(8000),
      },
    ]}
    y="rpm"
    x="speed"
    style={{
      data: {
        stroke: 'black',
        strokeWidth: 2,
      },
    }}
  />
);

const Tune: FC = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>{props.speed}</Text>
          <VictoryChart minDomain={{y: 0}} theme={VictoryTheme.material}>
            {/* {tuningView} */}
            {/* {tuningViewVertical} */}
            {progressiveLine}
            {tuningViewCombined}
          </VictoryChart>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default Tune;
