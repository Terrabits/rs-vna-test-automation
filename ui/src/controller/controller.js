import Page from './page';

class Controller {
  constructor(model, view) {
    this.page = new Page();
    this.model = model;
    this.view  = view;
  }

  // Home
  setup(ipAddress, project_filename) {
    console.log(`Controller.setup(${ipAddress}, ${project_filename})`);
    return true;
  }

  // Calibrate
  setCalGroup(calGroup) {
    console.log(`Controller.setCalGroup(${calGroup})`);
    return true;
  }
  startCalibration() {
    console.log(`Controller.startCalibration()`);
    return true;
  }
  performCalibrationStep(step) {
    console.log(`Controller.performCalibrationStep(${step})`);
    return true;
  }
  saveCalibrationAs(calGroup) {
    console.log(`Controller.saveCalibrationAs(${calGroup})`);
    return true;
  }

  // Measure
  startMeasurementFor(serialNo) {
    console.log(`Controller.startMeasurementFor(${serialNo})`);
    return true;
  }
  performMeasurementStep(step) {
    console.log(`Controller.performMeasurementStep(${step})`);
    return true;
  }
  saveMeasurementsTo(path) {
    console.log(`Controller.saveMeasurementsTo(${path})`);
    return true;
  }

  next() {
    console.log('Controller.next()');
  }
  back() {
    console.log('Controller.back()');
  }
}

export default Controller;
