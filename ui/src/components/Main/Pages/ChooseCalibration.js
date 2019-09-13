import React     from 'react';
import Paragraph from './Paragraph';
import Title     from './Title';

function ChooseCalibrationPage(props) {
  let options = ['*New', 'None'];
  if (props.settings && props.settings.hasOwnProperty('options')) {
    options = options.concat(props.settings.options);
  }
  const optionTags = options.map((i) => {
    return (
      <option key={i.toLowerCase()} value={i.toLowerCase()}>{i}</option>
    );
  })
  return (
    <div>
      <Title display="Choose Calibration"/>
      <Paragraph>
        Choose the calibration to use for measurement.<br />
        The choices are either a <code>*New</code> calibration, <code>None</code> or an existing cal group.
      </Paragraph>
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form>
            <div className="form-group">
              <label>Calibration</label>
              <select id="calibration-select" className="form-control">
                {optionTags}
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChooseCalibrationPage;
