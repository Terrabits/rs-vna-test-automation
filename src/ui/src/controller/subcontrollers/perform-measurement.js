import Page          from '../page';
import Subcontroller from './subcontroller';

class PerformMeasurementSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('PerformMeasurementPage')) {
      return;
    }
    console.log('PerformMeasurement.onNextClicked');
    const steps = await this.model.measurementSteps();
    console.assert(this.currentPage.step >= 0, "step must be >=0");
    console.assert(this.currentPage.step < steps, `step must be <${steps}`);
    const success = await this.model.performMeasurementStep(this.currentPage.step);
    console.assert(success, `Measurement step ${this.currentPage.step} failed`);
    if (success && ++this.currentPage.step >= steps) {
      // ready to save
      this.currentPage = new Page('SaveMeasurementPage');
    }
    this.updateView();
  }

  async updateSubview() {
    if (!this.currentPage.is('PerformMeasurementPage')) {
      return;
    }
    const settings = {
      step:              this.currentPage.step + 1,
      steps:       await this.model.measurementSteps(),
      connections: await this.model.measurementStep(this.currentPage.step)
    };
    this.view.setPage('PerformMeasurementPage', settings);
  }
}

export default PerformMeasurementSubcontroller;
