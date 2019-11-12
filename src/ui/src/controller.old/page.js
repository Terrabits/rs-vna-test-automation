class Page {
  constructor(name='SetupPage', step=-1) {
    this.name = name;
    this.step = step;
  }
  isCalibrating() {
    return this.name === 'PerformCalibrationPage';
  }
  isMeasuring() {
    if (this.name === 'PerformMeasurementPage') {
      return true;
    }
    if (this.name === 'SaveMeasurementPage') {
      return true;
    }
    return false;
  }
}

export default Page;
