import Subcontroller from './subcontroller';

class TitleSubcontroller extends Subcontroller {
  constructor(model, view, controller) {
    super(model, view, controller);
    // use self-calling async function
    // since constructor is not async
    (async () => {
      const isProjectOpenPermanently = await this.model.isProjectOpenPermanently();
      if (!isProjectOpenPermanently) {
        this.view.title = 'R&S Test Automation';
      }
      else {
        const projectJson = await this.model.readProject();
        this.view.title = `${projectJson['name']} v${projectJson['version']}`
      }
    })();
  }
}

export default TitleSubcontroller;
