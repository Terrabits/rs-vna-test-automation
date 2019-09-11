import React from 'react';
import Paragraph from './Paragraph';
import Title     from './Title';

function SetupPage(props) {
  return (
    <div>
      <Title display="Setup"/>
      <Paragraph>
        Enter the IP address of the VNA and choose the project to begin.
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form>
            <div className="form-group">
              <label>VNA IP Address</label>
              <input id="address" className="form-control" type="text"/>
            </div>
            <div className="form-group">
              <label>Project</label>
              <input id="project" className="form-control-file" type="file" name="project-filename"/>
            </div>
            <p></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SetupPage;
