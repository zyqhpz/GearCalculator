import Gear from './Gear';
import Tire from './Tire';

class Tuning {
  gears: Array<Gear>;
  finalDrive: number;
  tire: Tire;

  constructor(gears: Array<Gear>, finalDrive: number, tire: Tire) {
    this.gears = gears;
    this.finalDrive = finalDrive;
    this.tire = tire;
  }

  setGears(gears: Array<Gear>): void {
    this.gears = gears;
  }

  setFinalDrive(finalDrive: number): void {
    this.finalDrive = finalDrive;
  }

  setTire(tire: Tire): void {
    this.tire = tire;
  }

  getGears(): Array<Gear> {
    return this.gears;
  }

  getFinalDrive(): number {
    return this.finalDrive;
  }

  getTire(): Tire {
    return this.tire;
  }

  calculateSpeed(redLine: number, finalDrive: number): void {
    for (let i = 0; i < this.gears.length; i++) {
      let speed =
        redLine *
        ((1 / this.gears[i].getRatio()) *
          (1 / finalDrive) *
          this.tire.getCircumference() *
          0.001 *
          60);

      // round speed to 2 decimal places
      speed = Math.round(speed * 100) / 100;

      // set gear speed
      this.gears[i].setSpeed(speed);
    }
  }

  calculateRPM(
    rpm: number,
    ratio: number,
    circumference: number,
    finalDrive: number,
  ): number {
    let speed =
      rpm * ((1 / ratio) * (1 / finalDrive) * circumference * 0.001 * 60);

    // round speed to 2 decimal places
    speed = Math.round(speed * 100) / 100;

    // round speed to whole number if 2 decimal places is > 0.5
    if (speed % 1 !== 0) {
      speed = Math.round(speed);
    } else {
      speed = Math.floor(speed);
    }
    return speed;
  }

  calculateSpeeds(finalDrive: number): void {
    let rpm: number[] = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];

    for (let i = 0; i < this.gears.length; i++) {
      let speeds: number[] = [];
      let ratioSpeeds: Map<Number, Number> = new Map<Number, Number>();
      for (let j = 0; j < rpm.length; j++) {
        let speed = this.calculateRPM(
          rpm[j],
          this.gears[i].getRatio(),
          this.tire.getCircumference(),
          finalDrive,
        );

        // add speed to array
        speeds.push(speed);
        ratioSpeeds.set(rpm[j], speed);
      }

      // set gear speeds
      this.gears[i].setSpeeds(speeds);
      this.gears[i].setRatioSpeeds(ratioSpeeds);
    }
  }
}

export default Tuning;
