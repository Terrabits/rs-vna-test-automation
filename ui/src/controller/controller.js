import Page from './page';

class Controller {
  constructor(model, view) {
    this.page  = new Page("HomePage", -1);
    this.model = model;
    this.view  = view;

    this.calGroup = null;

    // init model
    this.model.disconnectFromVna();
    this.model.closeProject();

    // init view
    this.view.ipAddress     = 'localhost';
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
  async setup(ipAddress, projectFilename) {
    console.log(`Controller.setup(${ipAddress}, ${projectFilename})`);
    console.assert(ipAddress,       'No IP address entered!');
    console.assert(projectFilename, 'No project filename entered!');
    this.model.connectToVna(ipAddress);
    const isVnaConnected = await this.model.isVnaConnected();
    console.assert(isVnaConnected, `Could not connect to VNA at ${ipAddress}`);
    this.model.openProject(projectFilename);
    const isProjectOpen = await this.model.isProjectOpen();
    console.assert(isProjectOpen,  `Could not open project ${projectFilename}`);
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

  async next() {
    console.log('Controller.next()');
    switch (this.page.name) {
      case 'HomePage': {
        const ipAddress       = this.view.ipAddress;
        const projectFilename = '~/Documents/Node/test-automation/projects/cable-example/procedure.yaml'//TODO: this.view.projectFilename;
        if (await this.setup(ipAddress, projectFilename)) {
          this.page.name = "ChooseCalibrationPage";
        }
        break;
      }
      case 'ChooseCalibrationPage': {
        const calibration = this.view.calibration;
        if (calibration === '*New') {
          // start new calibration
          this.model.startCalibration();
          this.page.name = "PerformCalibrationPage";
          this.page.step = 0;
          break;
        }

        // set cal group
        if (calibration === 'None') {
          this.calGroup = null;
        }
        else {
          this.calGroup = calibration;
        }
        this.page.name = 'StartMeasurementPage'
        this.page.step = -1;
        break;
      }
      case 'PerformCalibrationPage': {
        const steps = await this.model.calibrationSteps();
        console.assert(this.page.step >= 0, "step must be >=0");
        console.assert(this.page.step < steps, `step must be <${steps}`);
        const success = await this.model.performCalibrationStep(this.page.step);
        console.assert(success, `Calibration step ${this.page.step} failed`);
        if (success && ++this.page.step >= steps) {
          // ready to save
          this.page.name = "SaveCalibrationPage";
          this.page.step = -1;
        }
        break;
      }
      case 'SaveCalibrationPage': {
        const calGroup = this.view.saveAsCalGroup;
        console.assert(calGroup, 'Cal group is empty!');
        const success = await this.model.applyCalibration(calGroup);
        console.assert(success, `Error apply cal and saving to cal group '${calGroup}'`);
        if (success) {
          this.calGroup  = calGroup;
          this.page.name = "StartMeasurementPage";
          this.page.step = -1;
        }
        break;
      }
      case 'StartMeasurementPage':
        const serialNo = this.view.serialNo;
        console.assert(serialNo, `No serial number entered!`);
        this.serialNo = serialNo
        this.model.startMeasurementFor(this.serialNo, this.calGroup);
        this.page.name = 'PerformMeasurementPage';
        this.page.step = 0;
        break;
      case 'PerformMeasurementPage': {
        const steps = await this.model.measurementSteps();
        console.assert(this.page.step >= 0, "step must be >=0");
        console.assert(this.page.step < steps, `step must be <${steps}`);
        const success = await this.model.performMeasurementStep(this.page.step);
        console.assert(success, `Measurement step ${this.page.step} failed`);
        if (success && ++this.page.step >= steps) {
          // ready to save
          this.page.name = "SaveMeasurementPage";
          this.page.step = -1;
        }
        break;
      }
      case 'SaveMeasurementPage': {
        this.page.name = 'StartMeasurementPage';
        this.page.step = -1;
        break;
      }
      default:
        console.assert(false, 'controller.updatePage error: this.page.name not recognized!')
    }
    await this.updateView();
  }
  async back() {
    console.log('Controller.back()');
    this.updateView();
  }
  async updatePage() {
    console.log('Controller.updatePage()');
    switch (this.page.name) {
      case 'HomePage':
        this.view.setPage('HomePage', {hideProject: true})
        break;
      case 'ChooseCalibrationPage':
        const calGroups = await this.model.calGroups();
        this.view.setPage('ChooseCalibrationPage', {options: calGroups});
        break;
      case 'PerformCalibrationPage':
        this.view.setPage('PerformCalibrationPage', {
          step:              this.page.step + 1,
          steps:       await this.model.calibrationSteps(),
          connections: await this.model.calibrationStep(this.page.step)
        });
        break;
      case 'SaveCalibrationPage':
        this.view.setPage('SaveCalibrationPage');
        break;
      case 'StartMeasurementPage':
        this.view.setPage('StartMeasurementPage');
        break;
      case 'PerformMeasurementPage':
        this.view.setPage('PerformMeasurementPage', {
          step:              this.page.step + 1,
          steps:       await this.model.measurementSteps(),
          connections: await this.model.measurementStep(this.page.step)
        });
        break;
      case 'SaveMeasurementPage':
        this.view.setPage('SaveMeasurementPage', {
          serialNo: this.serialNo,
          onClick:  () => console.log('Controller: SaveMeasurementPage.Download clicked!')
        })
        break;
      default:
        console.assert(false, 'controller.updatePage error: this.page.name not recognized!')
    }
  }
  async updateSidebarItems() {
    console.log('Controller.updateSidebarItems()');
    const home = {
      text:     "Home",
      icon:     "home",
      active:   false,
      callback: null
    };
    const calibrate = {
      text:     "Calibrate",
      icon:     "tools",
      active:   false,
      callback: null,
      subitems: []
    };
    if (this.page.isCalibrating()) {
      const steps = await this.model.calibrationSteps();
      for (let i = 0; i < steps; i++) {
        calibrate.subitems.push({
          text:     `Step ${i+1}`,
          active:   false,
          callback: null
        });
      }
    }
    const measure = {
      text: "Measure",
      icon: "pulse",
      active: false,
      callback: null,
      subitems: []
    };
    if (this.page.isMeasuring()) {
      const steps = await this.model.measurementSteps();
      for (let i = 0; i < steps; i++) {
        measure.subitems.push({
          text:     `Step ${i+1}`,
          active:   false,
          callback: null
        });
      }
    }
    const items = [
      home,
      calibrate,
      measure
    ];
    this.view.sidebarItems = items;
  }
  async updateView() {
    console.log('Controller.updateView()');
    await this.updatePage();
    await this.updateSidebarItems();
  }
}

export default Controller;
