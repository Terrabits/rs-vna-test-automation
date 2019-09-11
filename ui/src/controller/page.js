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

  back() {
    //
    return this;
  }
  next() {
    //
    return this;
  }

  cancel() {
    if (this.isCalibrating()) {
      // cancel
    }
    if (this.isMeasuring()) {
      // cancel
    }
    // else do nothing
  }
  reset() {
    this.name = 'SetupPage';
    this.step = -1;
  }
}

export default Page;
