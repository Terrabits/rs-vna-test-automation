import Subcontroller from './subcontroller';

class AlertSubcontroller extends Subcontroller {
  async updateSubview() {
    console.log('updating alert...');
    this.view.alert.updateCollapse();
  }
}

export default AlertSubcontroller;
