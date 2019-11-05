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
    for (let i=0; i < subcontrollers.length; i++) {
      this.addSubcontroller(subcontrollers[i]);
    }
  }

  // view
  async updateView() {
    console.log('Controller.updateView()');
    for (let i=0; i < this.subcontroller.length; i++) {
      await this.subcontroller[i].updateSubview();
    }
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
    for (let i=0; i < this.subcontrollers.length; i++) {
      await this.subcontrollers[i].onNextClicked();
    }
  }
  async back() {
    console.log('Controller.back()');
    for (let i=0; i < this.subcontrollers.length; i++) {
      await this.subcontrollers[i].onBackClicked();
    }
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
