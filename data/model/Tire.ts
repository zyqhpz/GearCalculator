class Tire {
  width: number;
  aspectRatio: number;
  diameter: number;
  circumference: number;

  constructor(width: number, aspectRatio: number, diameter: number) {
    this.width = width;
    this.aspectRatio = aspectRatio;
    this.diameter = diameter;
    this.circumference = this.calculateCircumference(
      width,
      aspectRatio,
      diameter,
    );
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setAspectRatio(aspectRatio: number): void {
    this.aspectRatio = aspectRatio;
  }

  setDiameter(diameter: number): void {
    this.diameter = diameter;
  }

  setCircumference(circumference: number): void {
    this.circumference = circumference;
  }

  getWidth(): number {
    return this.width;
  }

  getAspectRatio(): number {
    return this.aspectRatio;
  }

  getDiameter(): number {
    return this.diameter;
  }

  getCircumference(): number {
    return this.circumference;
  }

  calculateCircumference(
    width: number,
    aspectRatio: number,
    diameter: number,
  ): number {
    let diameterMiliMetre: number = diameter * 25.4;
    let sidewall: number = width * (aspectRatio / 100);
    let overallDiameter: number = diameterMiliMetre + sidewall * 2;
    let circumference: number = Math.PI * overallDiameter;

    // convert into metres
    circumference = circumference * 0.001;

    // round off to 2 decimal places
    circumference = Math.round(circumference * 100) / 100;

    return circumference;
  }
}

export default Tire;
