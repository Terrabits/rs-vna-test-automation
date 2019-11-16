import Callbacks     from './callbacks';
import Page          from '../../page';
import Subcontroller from '../subcontroller';

class SidebarSubcontroller extends Subcontroller {
  constructor(model, view, controller) {
    super(model, view, controller);

    // register callbacks to changePage
    this.callbacks = new Callbacks();
    this.callbacks.setFor('Home', (index) => {
      console.log('sidebar.home clicked');
      this.controller.changePage(new Page('HomePage'));
    });
    this.callbacks.setFor('Calibrate', (index) => {
      console.log(`sidebar.calibrate(${index}) clicked`);
      if (index === null) {
        this.controller.changePage(new Page('ChooseCalibrationPage'));
      }
      else {
        this.controller.changePage(new Page('PerformCalibrationPage', index));
      }
    });
    this.callbacks.setFor('Measure', (index) => {
      console.log(`sidebar.measure(${index}) clicked`);
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
    // TODO: update sidebar
    const home = {
      text: 'Home',
      icon: 'home',
      active: true,
      callback: this.callbacks.generateForItem('Home')
    };
    const calibrate = {
      text: 'Calibrate',
      icon: 'tools',
      active: false,
      callback: this.callbacks.generateForItem('Calibrate'),
      subitems: []
    };
    const isCalibrating = this.currentPage.is('PerformCalibrationPage')
                       || this.currentPage.is('SaveCalibrationPage');
    if (isCalibrating) {
      const step  = this.currentPage.step;
      const steps = await this.model.calibrationSteps();
      for (let i=0; i < steps; i++) {
        const subitem = {
          text:    `Step ${i+1}`,
          active:   step === i,
          callback: this.callbacks.generateForItem('Calibrate', step)
        };
        calibrate['subitems'].push(subitem);
      }
    }
    const measure = {
      text: "Measure",
      icon: "pulse",
      active: false,
      callback: this.callbacks.generateForItem("Measure"),
      subitems: []
    }
    const isMeasuring = this.currentPage.is('PerformMeasurementPage')
                     || this.currentPage.is('SaveMeasurementPage');
    if (isMeasuring) {
      const step  = this.currentPage.step;
      const steps = await this.model.measurementSteps();
      const json  = await this.model.measurementStep(step);
      for (let i=0; i < steps; i++) {
        const subitem = {
          text:   json['name'],
          active: step === i,
          callback: this.callbacks.generateForItem('Measure', step)
        };
        measure['subitems'].push(subitem);
      }
    }
    const items = [home, calibrate, measure];
    this.view.sidebarItems = items;
  }
}

export default SidebarSubcontroller;
