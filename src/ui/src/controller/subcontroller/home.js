import SubController from './subcontroller';

class Home extends SubController {
  constructor(controller, settings={}) {
    super(controller);
    this.settings = settings;
  }

  registerCallbacks() {
    this.view.onHome
  }
  updateSubView() {

  }
}

export default Home;
