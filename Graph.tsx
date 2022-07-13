import React, {FC} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Text} from 'react-native';
import {VictoryChart, VictoryTheme, VictoryLine} from 'victory-native';

import Tire from './data/model/Tire';
import Gear from './data/model/Gear';
import Tuning from './data/model/Tuning';
import tireSpec from './data/tire';
import gearRatioData from './data/gear';

let progressivePointsRPM: number[] = [];
let progressivePointsSPEED: number[] = [];

// a function to generate progressive lines for the graph
function progressiveLine(
  progressivePointsRpm: Array<Number>,
  progressivePointsSpeed: Array<Number>,
) {
  return (
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
      animate={{
        duration: 1000,
        onLoad: {
          duration: 1000,
          before: () => {
            return {
              _y: 0,
              _x: 0,
            };
          },
        },
      }}
      style={{
        data: {
          stroke: 'green',
          strokeWidth: 2,
        },
      }}
    />
  );
}

// create a function that run to create graph
function createGraph(
  gears: Array<Gear>,
  tire: Tire,
  finalDrive: number,
  redLine: number,
  color: string,
) {
  const tuning = new Tuning(gears, redLine, tire);

  tuning.calculateSpeed(redLine, finalDrive);
  tuning.calculateSpeeds(finalDrive);

  gears = tuning.getGears();

  interface Speed {
    rpm: number;
    speed: number;
  }

  let progressivePointsRpm: number[] = [];
  let progressivePointsSpeed: number[] = [];

  var rpmSpeed1 = gears[0].getRatioSpeeds();
  var rpmSpeed4 = gears[4].getRatioSpeeds();

  gears.map((gear, i) => {
    if (i !== 4) {
      let speed = gear.getSpeeds();

      // get last element of array
      let last: number = speed[speed.length - 1];

      let rpm =
        (last * gears[i + 1].getRatio() * finalDrive) /
        (tire.getCircumference() * 0.001 * 60);

      progressivePointsRpm.push(rpm);
      progressivePointsSpeed.push(last);
    }
  });

  progressivePointsRPM = progressivePointsRpm;
  progressivePointsSPEED = progressivePointsSpeed;

  return (
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
      animate
      style={{
        data: {
          stroke: color,
          strokeWidth: 2,
        },
      }}
    />
  );
}

const Graph: FC = props => {
  const tire = new Tire(
    tireSpec.width,
    tireSpec.aspectRatio,
    tireSpec.diameter,
  );

  let gears: Gear[] = [];

  for (let i = 0; i < gearRatioData.length; i++) {
    const gear = new Gear(gearRatioData[i].ratio, gearRatioData[i].speed);
    gears.push(gear);
  }
  return (
    <View>
      <Text>{props.speed}</Text>
      <VictoryChart minDomain={{y: 0}} theme={VictoryTheme.material}>
        {createGraph(gears, tire, 4.0816, 7000, 'lightblue')}
        {progressiveLine(progressivePointsRPM, progressivePointsSPEED)}
        {createGraph(gears, tire, 5, 7000, 'red')}
        {progressiveLine(progressivePointsRPM, progressivePointsSPEED)}
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

export default Graph;
