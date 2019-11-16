import Page           from './page';
import subcontrollers from './subcontrollers';

class Controller {
  constructor(model, view) {
    // 💩 State that should probably
    // exist somewhere else.
    this.page     = new Page("HomePage");
    this.calGroup = undefined;

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
    // TODO: handle sidebar callbacks
  }
  async next() {
    console.log('Controller.next()');
    this.view.alert.close();
    const originalPage = this.page.copy();
    this.subcontrollers.forEach(async (subcontroller) => {
      await subcontroller.onNextClicked(originalPage);
    });
  }
  async back() {
    console.log('Controller.back()');
    this.view.alert.close();
    const originalPage = this.page.copy();
    this.subcontrollers.forEach(async (subcontroller) => {
      await subcontroller.onBackClicked(originalPage);
    });
  }
  async changePage(destinationPage) {
    console.log(`controller.changePage(${destinationPage.name}, ${destinationPage.step})`);
    this.view.alert.close();
    const originalPage = this.page.copy();
    // cycle through prevents and return if prevented
    for (let i=0; i < this.subcontrollers.length; i++) {
      const subcontroller = this.subcontrollers[i];
      if (subcontroller.preventSidebarNavigation(originalPage, destinationPage)) {
        return;
      }
    }
    // process sidebarItemClickeds
    for (let i=0; i < this.subcontrollers.length; i++) {
      const subcontroller = this.subcontrollers[i];
      await subcontroller.onSidebarItemClicked(originalPage, destinationPage);
    }
  }
}

export default Controller;
