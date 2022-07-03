class Gear {
  ratio: number;
  speed: number;
  speeds: Array<Number>;

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

  setSpeeds(speeds: Array<Number>): void {
    this.speeds = speeds;
  }

  getRatio(): number {
    return this.ratio;
  }

  getSpeed(): number {
    return this.speed;
  }

  getSpeeds(): Array<Number> {
    return this.speeds;
  }
}

export default Gear;
