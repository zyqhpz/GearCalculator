class Gear {
  ratio: number;
  speed: number;
  speeds: Array<number>;
  ratioSpeeds: Map<Number, Number>;

  constructor(ratio: number, speed: number) {
    this.ratio = ratio;
    this.speed = speed;
    this.speeds = [];
  }

  setRatio(ratio: number): void {
    this.ratio = ratio;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  setSpeeds(speeds: Array<number>): void {
    this.speeds = speeds;
  }

  getRatio(): number {
    return this.ratio;
  }

  getSpeed(): number {
    return this.speed;
  }

  //   getSpeeds(): Map<Number, Number> {
  //   // set speed as Key and Y as value
  //   let speedMap: Map<Number, Number> = new Map<Number, Number>();
  //   for (let i = 0; i < this.speeds.length; i++) {
  //     speedMap.set(this.speeds[i], i);
  //   }
  //   return speedMap;
  // }

  getSpeeds(): Array<number> {
    return this.speeds;
  }

  setRatioSpeeds(ratioSpeeds: Map<Number, Number>): void {
    this.ratioSpeeds = ratioSpeeds;
  }

  getRatioSpeeds(): Map<Number, Number> {
    // // set speed as Key and Y as value
    // let rpm: number[] = [
    //   2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
    //   13000, 14000, 15000,
    // ];
    // let ratioSpeeds: Map<Number, Number> = new Map<Number, Number>();
    // for (let i = 0; i < this.speeds.length; i++) {
    //   // ratioSpeeds.set(this.speed, rpm[i]);
    //   ratioSpeeds.set(this.speeds[i], rpm[i]);
    // }
    // // for (let i = 0; i < this.speeds.length; i++) {
    // //   ratioSpeeds.set(this.speeds[i], rpm[i]);
    // // }
    return this.ratioSpeeds;
  }
}

export default Gear;
