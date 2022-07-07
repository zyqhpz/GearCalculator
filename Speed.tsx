import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
} from 'victory-native';

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
  // console.log(gear.getRatio());
}

const tuning = new Tuning(gears, 7000, tire);

tuning.calculateSpeed(7000, 0.245);
tuning.calculateSpeeds(0.245);

gears = tuning.getGears();

interface Speed {
  rpm: number;
  speed: number;
}

// hashmap gears to speed
let speeds = Array<Number>();

for (let i = 0; i < gears.length; i++) {
  speeds.push(gears[i].getSpeed());
}

const tireGear = new Tire(
  tireSpec.width,
  tireSpec.aspectRatio,
  tireSpec.diameter,
);

let gearsNew = Array<Gear>();

gearsNew = gears.slice(1, undefined);

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
        speed: 31,
      },
      {
        rpm: 5000,
        speed: 39,
      },
      {
        rpm: 6000,
        speed: 47,
      },
      {
        rpm: 7000,
        speed: 55,
      },
      {
        rpm: 8000,
        speed: 63,
      },
    ];
  } else {
    _rpmList = [4000, 5000, 6000, 7000, 8000];
    var object: Speed = [
      {
        rpm: 4000,
        speed: 31,
      },
      {
        rpm: 5000,
        speed: 39,
      },
      {
        rpm: 6000,
        speed: 47,
      },
      {
        rpm: 7000,
        speed: 55,
      },
      {
        rpm: 8000,
        speed: 63,
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
          stroke: colors[i],
          strokeWidth: 2,
        },
      }}
    />
  );
});

const tuningViewAll = gears.map((gear, i) => {
  if (i != 4) {
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
    // console.log(rpm);
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

const Speed: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {/* <VictoryChart minDomain={{y: 0}}>{gear1View}</VictoryChart> */}
          <VictoryChart minDomain={{y: 0}}>{tuningView}</VictoryChart>
          <VictoryChart minDomain={{y: 0}}>
            {tuningView}
            {/* {tuningView2} */}
            {tuningViewAll}
          </VictoryChart>
          {/* <VictoryChart minDomain={{x: 0, y: 0}}>{gearsView2}</VictoryChart> */}
        </View>
        {/* <View style={styles.container}>
        <VictoryChart>{gearsView}</VictoryChart>
      </View>
      <View style={styles.container}>
        <VictoryChart>{gearsView}</VictoryChart>
      </View> */}
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

export default Speed;
