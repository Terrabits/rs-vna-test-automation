import Subcontroller from './subcontroller';

class AlertSubcontroller extends Subcontroller {
  async updateSubview() {
    this.view.alert.updateCollapse();
  }
}

export default AlertSubcontroller;
