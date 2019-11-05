import Page from '../page';

class Subcontroller {
  constructor(model, view, controller) {
    this.model      = model;
    this.view       = view;
    this.controller = controller;
  }

  // virtual
  async onNextClicked() {
    // handle next being clicked here
  }

  // virtual
  async onBackClicked() {
    // handle back being clicked here
  }

  // virtual
  preventSidebarNavigation(destinationPage) {
    // chance to prevent (cancel) sidebar navigation.
    return false;
  }

  // virtual
  async updateSubview() {
    // update subview here
  }

  // update entire view
  async updateView() {
    await this.controller.updateView();
  }

  // is page {name}, [{step}]?
  isPage(name, step=-1) {
    if (this.controller.page.name !=== name) {
      // different pages
      return false;
    }

    if (step === -1) {
      // step is not used
      return true;
    }
    else {
      // steps must be equal
      return this.controller.page.step === step;
    }
  }
}

export default Subcontroller;
