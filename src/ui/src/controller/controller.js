import Page           from './page';
import subcontrollers from './subcontrollers';

class Controller {
  constructor(model, view) {
    // 💩 State that should probably
    // exist somewhere else.
    this.page     = new Page("HomePage");
    this.calGroup = null;

    // constructor
    this.model          = model;
    this.view           = view;
    this.subcontrollers = [];
    this.registerCallbacks();
    this.addSubcontrollers();
    this.updateView();
  }

  // subcontrollers
  addSubcontroller(Subcontroller) {
    const subcontroller = new Subcontroller(this.model, this.view, this);
    this.subcontrollers.push(subcontroller);
  }
  addSubcontrollers() {
    subcontrollers.forEach((Subcontroller) => {
      this.addSubcontroller(Subcontroller);
    });
  }

  // view
  async updateView() {
    this.subcontrollers.forEach(async (subcontroller) => {
      await subcontroller.updateSubview();
    });
  }

  // callbacks
  registerCallbacks() {
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
  }
  async next() {
    console.log('Controller.next()');
    this.subcontrollers.forEach(async (subcontroller) => {
      await subcontroller.onNextClicked();
    });
  }
  async back() {
    console.log('Controller.back()');
    this.subcontrollers.forEach(async (subcontroller) => {
      await subcontroller.onBackClicked();
    });
  }
  async navigateTo(destinationPage) {
    for (let i=0; i < this.subcontrollers.length; i++) {
      if (this.subcontrollers[i].preventSidebarNavigation(destinationPage)) {
        return;
      }
    }
    this.page = destinationPage;
    await this.updateView();
  }
}

export default Controller;
