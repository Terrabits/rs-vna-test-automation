import React     from 'react';
import Paragraph from './Paragraph';
import Title     from './Title';

function _Page(props) {
  return (
    <div>
      <Title display="Title"/>
      <Paragraph>
        Summary.
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form>
            <div className="form-group">
              <label>Calibration</label>
              <select id="select" className="form-control">
                {[]}
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default _Page;
