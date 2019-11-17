import Callbacks     from './callbacks';
import Page          from '../../page';
import Subcontroller from '../subcontroller';

class SidebarSubcontroller extends Subcontroller {
  constructor(model, view, controller) {
    super(model, view, controller);

    // register callbacks to changePage
    this.callbacks = new Callbacks();
    this.callbacks.setFor('Home', (index) => {
      this.controller.changePage(new Page('HomePage'));
    });
    this.callbacks.setFor('Calibrate', (index) => {
      if (index === null) {
        this.controller.changePage(new Page('ChooseCalibrationPage'));
      }
      else {
        this.controller.changePage(new Page('PerformCalibrationPage', index));
      }
    });
    this.callbacks.setFor('Measure', (index) => {
      if (index === null) {
        this.controller.changePage(new Page('StartMeasurementPage'));
      }
      else {
        this.controller.changePage(new Page('PerformMeasurementPage', index));
      }
    });
  }
  async onSidebarItemClicked(originalPage, destinationPage) {
    this.currentPage = destinationPage;
    await this.updateView();
  }

  async updateSubview() {
    // home
    const isHome = this.currentPage.is('HomePage');
    const home   = {
      text:     'Home',
      icon:     'home',
      active:   isHome,
      callback: this.callbacks.generateForItem('Home')
    };

    // calibrate
    const isCalibrating   = this.currentPage.is('PerformCalibrationPage')
                         || this.currentPage.is('SaveCalibrationPage');
    const isCalibratePage = this.currentPage.is('ChooseCalibrationPage') || isCalibrating;
    const calibrate = {
      text: 'Calibrate',
      icon: 'tools',
      active: isCalibratePage,
      callback: this.callbacks.generateForItem('Calibrate'),
      subitems: []
    };
    if (isCalibrating) {
      const step  =       this.currentPage.step;
      const steps = await this.model.calibrationSteps();
      for (let i=0; i < steps; i++) {
        const subitem = {
          text:    `Step ${i+1}`,
          active:   i === step,
          callback: this.callbacks.generateForItem('Calibrate', i)
        };
        calibrate['subitems'].push(subitem);
      }
    }

    // Measure
    const isMeasuring   = this.currentPage.is('PerformMeasurementPage')
                       || this.currentPage.is('SaveMeasurementPage');
    const isMeasurePage = this.currentPage.is('StartMeasurementPage') || isMeasuring;
    const measure = {
      text: "Measure",
      icon: "pulse",
      active: isMeasurePage,
      callback: this.callbacks.generateForItem("Measure"),
      subitems: []
    };
    if (isMeasuring) {
      const step  =       this.currentPage.step;
      const steps = await this.model.measurementSteps();
      for (let i=0; i < steps; i++) {
        const json = await this.model.measurementStep(i);
        const subitem = {
          text:     json.name,
          active:   i === step,
          callback: this.callbacks.generateForItem('Measure', i)
        };
        measure['subitems'].push(subitem);
      }
    }

    // update
    this.view.sidebarItems = [home, calibrate, measure];
  }
}

export default SidebarSubcontroller;
