import Page          from '../page';
import Subcontroller from './subcontroller';

class PerformMeasurementSubcontroller extends Subcontroller {
  async onNextClicked(originalPage) {
    if (!originalPage.is('PerformMeasurementPage')) {
      return;
    }
    console.log('PerformMeasurement.onNextClicked');
    const steps = await this.model.measurementSteps();
    if (this.currentPage.step < 0) {
      throw new Error('steps must be >= 0');
    }
    if (this.currentPage.step >= steps) {
      throw new Error(`step must be < ${steps}`);
    }
    const success = await this.model.performMeasurementStep(this.currentPage.step);
    if (!success) {
      this.view.alert.show('danger', '*Measurement could not be performed!');
      return;
    }
    if (success && ++this.currentPage.step >= steps) {
      // ready to save
      this.view.alert.show('info', '*Measurements complete');
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
