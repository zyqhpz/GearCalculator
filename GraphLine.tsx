import React, {PureComponent} from 'react';
import {Dimensions, View} from 'react-native';
import {Svg, G, Line, Rect, Text, ClipPath, Defs} from 'react-native-svg';
import * as d3 from 'd3';
import {LineChart, Grid, YAxis, XAxis, Path} from 'react-native-svg-charts';

import Tire from './data/model/Tire';
import Gear from './data/model/Gear';
import Tuning from './data/model/Tuning';
import tireSpec from './data/tire';
import gearRatioData from './data/gear';
import {index} from 'd3';

let progressivePointsRPM: number[] = [];
let progressivePointsSPEED: number[] = [];

class GraphLine extends React.PureComponent {
  render() {
    const data1 = [
      0, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
    ];
    const data2 = [
      0, 20, 10, 40, 95, -5, -24, 85, 101, 35, 53, -53, 24, 50, -20, -80,
    ];

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

    let redLine: number = 7000;
    let finalDrive: number = 4.0816;

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

    const datadummy = [
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
    ];

    const progressivePoints = [
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
    ];

    const axisX = [0, 50, 100, 150, 200, 250];

    const dataX = [
      0,
      rpmSpeed1.get(8000),
      progressivePointsSpeed[0],
      // progressivePointsSpeed[0],
      progressivePointsSpeed[1],
      // progressivePointsSpeed[1],
      progressivePointsSpeed[2],
      // progressivePointsSpeed[2],
      // progressivePointsSpeed[3],
      progressivePointsSpeed[3],
    ];

    const dataY = [
      0,
      8000,
      8000,
      progressivePointsRpm[0],
      8000,
      progressivePointsRpm[1],
      8000,
      progressivePointsRpm[2],
      8000,
      progressivePointsRpm[3],
      8000,
    ];

    // get rpm from datadummy and push to a new array
    let rpmArray: number[] = [];
    let speedArray: number[] = [];

    datadummy.map(data => {
      rpmArray.push(data.rpm);
      speedArray.push(data.speed);
    });

    // data =

    // const aspectRatio = originalWidth / originalHeight;
    const windowWidth = Dimensions.get('window').width;

    const dataCombined = [
      {
        data: progressivePoints,
        svg: {stroke: 'red'},
      },
      {
        data: [
          {
            rpm: progressivePointsRpm[0],
            speed: progressivePointsSpeed[0],
          },
          {
            rpm: progressivePointsRpm[0] + 200,
            speed: progressivePointsSpeed[0] + 10,
          },
        ],
        svg: {stroke: 'blue'},
      },
      {
        data: datadummy,
        svg: {stroke: 'green'},
      },
    ];

    const indexToClipFrom = 10;

    const Clips = ({x, width}) => (
      <Defs key={'clips'}>
        <ClipPath id="clip-path-1">
          <Rect
            x={'0'}
            y={'0'}
            width={x(dataCombined[0].data[0].speed)}
            height={'100%'}
          />
        </ClipPath>
        <ClipPath id={'clip-path-2'}>
          <Rect
            x={x(dataCombined[0].data[0].speed)}
            y={'0'}
            width={x(dataCombined[0].data[0].speed)}
            height={'100%'}
          />
        </ClipPath>
      </Defs>
    );

    // Line extras:
    const DashedLine = ({line}) => (
      <Path
        key={'line-1'}
        d={line}
        stroke={'rgb(134, 65, 244)'}
        strokeWidth={2}
        fill={'none'}
        strokeDasharray={[4, 4]}
        // clipPath={'url(#clip-path-2)'}
      />
    );

    const Shadow = ({line}) => (
      <Path
        y={3}
        key={'shadow-1'}
        d={line}
        stroke={'rgba(134, 65, 244, 0.2)'}
        strokeWidth={5}
        fill={'none'}
      />
    );

    const axesSvg = {fontSize: 10, fill: 'grey'};
    const verticalContentInset = {top: 10, bottom: 10};
    const xAxisHeight = 30;

    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          height: 300,
          // width: '100%',
          width: windowWidth,
          flexDirection: 'row',
          backgroundColor: '#fff',
        }}>
        <YAxis
          data={dataY}
          contentInset={{top: 20, bottom: 20}}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={value => `${value}ºC`}
        />
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          <LineChart
            // style={{height: 200}}
            // style={{flex: 1, marginLeft: 16}}
            style={{flex: 1}}
            // data={data}
            // data={dataY}
            data={dataCombined}
            yAccessor={({item}) => item.rpm}
            xAccessor={({item}) => item.speed}
            // gridMin={0}
            // gridMax={Math.max(...dataX)}
            svg={{
              stroke: 'green',
              strokeWidth: 2,
              clipPath: 'url(#clip-path-1)',
            }}
            contentInset={{top: 20, bottom: 20}}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10, height: xAxisHeight}}
            // data={axisX}
            data={dataCombined[2].data}
            // display ac as xAxis
            formatLabel={value => `${value}`}
            // xAccessor={({item}) => item}
            xAccessor={({item}) => item.speed}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'grey'}}
          />
        </View>
      </View>
    );
  }
}

export default GraphLine;
