import React          from 'react';
import Paragraph      from './Paragraph';
import preventDefault from './prevent-default';
import Title          from './Title';

function HomePage(props) {
  const disableInputs = props.disableInputs || false;
  const settings      = props.settings      || {};
  const project       = [];
  if (!settings.hideProject) {
    project.push((
      <div key="project" className="form-group">
        <label>Project</label>
        <input id="project-filename" className="form-control-file" type="file" name="project-filename" disabled={disableInputs}/>
      </div>
    ));
  }
  return (
    <div>
      <Title display="Setup"/>
      <Paragraph>
        Enter the IP address of the VNA and choose the project to begin.
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form onSubmit={preventDefault}>
            <div className="form-group">
              <label>VNA IP Address</label>
              <input id="ip-address" className="form-control" type="text" name="ip-address" disabled={disableInputs}/>
            </div>
              {project}
            <p></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
