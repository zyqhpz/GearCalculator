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
          finalDrive *
          this.tire.getCircumference() *
          0.001 *
          60);

      // round speed to 2 decimal places
      speed = Math.round(speed * 100) / 100;

      // set gear speed
      this.gears[i].setSpeed(speed);
    }
  }

  calculateSpeeds(finalDrive: number): void {
    let rpm: number[] = [
      2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
      13000, 14000, 15000,
    ];

    let speeds: number[] = [];

    for (let i = 0; i < this.gears.length; i++) {
      for (let j = 0; j < rpm.length; j++) {
        let speed =
          rpm[j] *
          ((1 / this.gears[i].getRatio()) *
            finalDrive *
            this.tire.getCircumference() *
            0.001 *
            60);

        // round speed to 2 decimal places
        speed = Math.round(speed * 100) / 100;

        // add speed to array
        speeds.push(speed);
      }

      // set gear speedss
      this.gears[i].setSpeeds(speeds);
    }
  }
}

export default Tuning;
