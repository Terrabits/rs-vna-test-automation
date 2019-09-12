class Page {
  constructor(name="SetupPage", step=-1) {
    this.name = name;
    this.step = step
  }
  isCalibrating() {
    return this.name === "PerformCalibrationPage";
  }
  isMeasuring() {
    return this.name === "MeasurePage";
  }
}

export default Page;
