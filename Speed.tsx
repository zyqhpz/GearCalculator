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

// gears.forEach((c, i) => console.log(c, i));

const _renderShifts = () => {
  const shifts = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let rpm = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  return rpm.map(rpm => {
    <VictoryLine key={rpm} data={[{x: rpm, y: rpm}]} x="x" y="y" />;
  });

  // return shifts.map(shift => {
  //   <Picker.Item key={'shift_' + i} label={shift} value={shift} />;
  // });
};

const tireGear = new Tire(
  tireSpec.width,
  tireSpec.aspectRatio,
  tireSpec.diameter,
);

// const

// tireGear.copyInto(jsonResult);

const _renderRpm = () => {
  const rpm = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  return rpm;

  // return rpm.map((rpm) => {
  //   // <VictoryLine key={rpm} data={[{x: rpm, y: rpm}]} x="x" y="y" />;
  // });
};

const _renderSpeeds = () => {
  const speedV = [50, 100, 150, 200, 250, 300, 350, 400, 450];

  return speedV;
};

let _ratioSpeed = gears[0].getSpeeds();

const gearsView = gears.map((gear, i) => {
  let _speeds = gears[i].getSpeeds();
  let _ratioSpeeds = gears[i].getRatioSpeeds();
  // let _rpm = gears[i]

  // let rpm[] = {};

  // let _rpm = _ratioSpeed.map((ratioSpeed, i) => {
  //   rpm[i] = {x: ratioSpeed, y: _speeds[i]};
  // },
  // rpm);

  interface Speed {
    rpm: number;
    speed: number;
  }

  const myVar: Record<number, number> = {
    10: 100,
    20: 200,
  };

  var obj: Speed = [
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

  // for (let i = 0; i < _ratioSpeeds.length; i++) {

  return (
    <VictoryLine
      key={'gear_' + i}
      // data={_ratioSpeeds}
      // data={myVar}
      data={obj}
      y="rpm"
      x="speed"
      style={{
        data: {
          stroke: '#c43a31',
          strokeWidth: 2,
        },
      }}
    />
  );
});

let gear1 = Array<Gear>();
gear1 = gears.slice(0, 1);

const gear1View = gear1.map((gear, i) => {
  let _speeds = gears[0].getRatioSpeeds();
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

  let _rpms = [0, 4000, 5000, 6000, 7000, 8000];

  // map rpmSpeed to Speed object
  for (let m = 0; m < _rpms.length; m++) {
    object[m] = {
      rpm: _rpms[m],
      speed: _speeds.get(_rpms[m]),
    };
  }
  return (
    <VictoryLine
      key={'gearD_' + i}
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
});

let gearsNew = Array<Gear>();

gearsNew = gears.slice(1, undefined);

const gearsView2 = gearsNew.map((gear, i) => {
  interface Speed {
    rpm: number;
    speed: number;
  }

  var colors = ['green', 'red', 'blue', 'orange', 'purple'];

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

  // var rpmSpeed = gear[i].getRatioSpeeds();
  var rpmSpeed = gears[i].getRatioSpeeds();

  let _rpms = [0, 4000, 5000, 6000, 7000, 8000];

  // map rpmSpeed to Speed object
  for (let m = 0; m < _rpms.length; m++) {
    object[m] = {
      rpm: _rpms[m],
      speed: rpmSpeed.get(_rpms[m]),
    };
  }

  // let objectArray = rpmSpeed.map((rpmSpeed, i) => {
  //   object = {
  //     rpm: rpmSpeed,
  //     speed: gear.getSpeeds()[i],
  //   };
  //   return object;
  // }

  var obj: Speed = [
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

  let _rpmList = [0, 4000, 5000, 6000, 7000, 8000];
  // let _speedList = [0, 44, 55, 66, 77, 88];
  // let _speedList = gears[i].getSpeeds();

  // // obj.rpm = _rpmList;
  // for (let k = 0; k < _rpmList.length; k++) {
  //   obj[k].rpm = _rpmList[k];
  //   obj[k].speed = _speedList[k];
  // }

  // let _speeds = gear.getSpeeds();
  // obj[0].rpm = 0;
  // obj[0].speed = 12;

  // // set new value to obj
  // obj[0].rpm = gear.getRatio();
  // obj[0].speed = gear.getSpeed();

  return (
    <VictoryLine
      key={'gear_' + i}
      // data={_ratioSpeeds}
      // data={myVar}
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

const Speed: FC = () => {
  // forEach gears to View

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <VictoryChart minDomain={{y: 0}}>
            {gear1View}
            {gearsView2}
          </VictoryChart>
          {/* <VictoryChart minDomain={{x: 0, y: 0}}>{gearsView2}</VictoryChart> */}
        </View>
        <View>
          <VictoryChart minDomain={{y: 0}}>{gear1View}</VictoryChart>
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
