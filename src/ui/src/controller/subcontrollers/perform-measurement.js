import Page          from '../page';
import Subcontroller from './subcontroller';

class PerformMeasurementSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('PerformMeasurementPage')) {
      return;
    }
    console.log('PerformMeasurement.onNextClicked');
    const steps = await this.model.measurementSteps();
    const step  = this.currentPage.step;
    if (step < 0) {
      throw new Error('step must be >= 0');
    }
    if (step >= steps) {
      throw new Error(`step must be < ${steps}`);
    }
    this.view.alert.show('light', `performing measurement ${step + 1}...`, false);
    const success = await this.model.performMeasurementStep(step);
    if (!success) {
      this.view.alert.show('danger', `*Measurement step ${step + 1} could not be performed!`);
      return;
    }
    this.view.alert.show('success', `*Measurement step ${step + 1} is complete!`);
    if (success && ++this.currentPage.step >= steps) {
      // ready to save
      this.view.alert.show('success', '*Measurements are complete!');
      this.currentPage = new Page('SaveMeasurementPage');
    }
    await this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('PerformMeasurementPage')) {
      return;
    }
    console.log('perform-measurement.updateSubview()');
    const step  =       this.currentPage.step;
    const steps = await this.model.measurementSteps();
    const json  = await this.model.measurementStep(step);
    const settings = {
      step:        step + 1,
      steps:       steps,
      connections: json
    };
    this.view.setPage('PerformMeasurementPage', settings);
  }
}

export default PerformMeasurementSubcontroller;
