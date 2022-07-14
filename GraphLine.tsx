import React, {PureComponent} from 'react';
import {Dimensions, View} from 'react-native';
import {Svg, G, Line, Rect, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';

import Tire from './data/model/Tire';
import Gear from './data/model/Gear';
import Tuning from './data/model/Tuning';
import tireSpec from './data/tire';
import gearRatioData from './data/gear';

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
        data: datadummy,
        yAccessor: ({item}) => item.rpm,
        xAccessor: ({item}) => item.speed,
        svg: {stroke: 'green'},
      },
    ];

    return (
      <>
        <View
          style={{
            padding: 5,
            height: 200,
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
          <LineChart
            // style={{height: 200}}
            style={{flex: 1, marginLeft: 16}}
            // data={data}
            // data={dataY}
            data={dataCombined}
            yAccessor={({item}) => item.rpm}
            xAccessor={({item}) => item.speed}
            // yAccessor={({rpmArray}) => rpmArray}
            // xAccessor={({speedArray}) => speedArray}
            // xAccessor={{speedArray}}
            svg={{stroke: 'green'}}
            contentInset={{top: 20, bottom: 20}}>
            {/* <XAxis
              // style={{marginTop: 10}}
              // style={{marginTop: 10}}
              // data={axisX}
              // formatLabel={(value, index) =>
              //   index % 2 === 0 ? `${value}` : ' '
              // }
              // // formatLabel={value => {
              // //   return dataX.map(item => {
              // //     return `${item}\n`;
              // //   });
              // // }}
              xAccessor={({item}) => item.speed}
              contentInset={{left: 10, right: 10}}
              svg={{
                fill: '#394092',
                fontSize: 8,
                // color: 'white',
              }}
              // numberOfTicks={10}
            /> */}
            <G>
              <XAxis
                style={{width: windowWidth}}
                // style={{marginTop: 10}}
                // style={{marginTop: 10}}
                data={axisX}
                // formatLabel={(value, index) =>
                //   index % 2 === 0 ? `${value}` : ' '
                // }
                // // formatLabel={value => {
                // //   return dataX.map(item => {
                // //     return `${item}\n`;
                // //   });
                // // }}
                xAccessor={({item}) => item}
                contentInset={{left: 10, right: 10}}
                svg={{
                  fill: '#394092',
                  fontSize: 8,
                  // color: 'white',
                }}
                // numberOfTicks={10}
              />
            </G>
            <Grid />
          </LineChart>
        </View>
        <View
          style={{
            padding: 5,
            height: 200,
            width: '95%',
            backgroundColor: 'white',
            // flexDirection: 'row',
          }}>
          <G>
            <XAxis
              // style={{marginTop: 10}}
              style={{marginTop: 10}}
              data={axisX}
              // formatLabel={(value, index) =>
              //   index % 2 === 0 ? `${value}` : ' '
              // }
              // // formatLabel={value => {
              // //   return dataX.map(item => {
              // //     return `${item}\n`;
              // //   });
              // // }}
              xAccessor={({item}) => item}
              contentInset={{left: 10, right: 10}}
              svg={{
                fill: '#394092',
                fontSize: 8,
                // color: 'white',
              }}
              // numberOfTicks={10}
            />
          </G>
        </View>
      </>
    );
  }
}

export default GraphLine;
