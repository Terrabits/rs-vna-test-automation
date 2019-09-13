import Page from './page';

class Controller {
  constructor(model, view) {
    this.page  = new Page();
    this.model = model;
    this.view  = view;
    this.view.onBackClicked = (event) => {
      if (event) {
        event.preventDefault();
      }
      this.back();
    };
    this.view.onNextClicked = (event) => {
      if (event) {
        event.preventDefault();
      }
      this.next();
    };
    this.updateView();
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
  updatePage() {
    console.log('Controller.updatePage()');
  }
  updateSidebarItems() {
    console.log('Controller.updateSidebarItems()');
    const items = [
      {
        text: "Home",
        icon: "home",
        active: false,
        callback: null
      },
      {
        text: "Calibrate",
        icon: "tools",
        active: true,
        callback: null,
        subitems: [
          {
            text: "Step 1",
            active: false,
            callback: null
          },
          {
            text: "Step 2",
            active: true,
            callback: null
          }
        ]
      },
      {
        text: "Measure",
        icon: "pulse",
        active: false,
        callback: null,
        subitems: [
          {
            text: "Step 1",
            active: false,
            callback: null
          },
          {
            text: "Step 2",
            active: false,
            callback: null
          }
        ]
      }
    ];
  }
  updateView() {
    console.log('Controller.updateView()');
    this.updatePage();
    this.updateSidebarItems();
  }
}

export default Controller;
