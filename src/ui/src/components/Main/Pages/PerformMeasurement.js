import React     from 'react';
import Paragraph from './Paragraph';
import Table     from './Table';
import Title     from './Title';

function PerformMeasurementPage(props) {
  const pageContents = [];

  // title
  const step  = props.settings.step;
  const steps = props.settings.steps;
  pageContents.push((<Title display="Perform Measurement" step={step} steps={steps}/>));

  // instructions
  pageContents.push((
    <Paragraph>
      Make the following connections, then click the <code>Next</code> button to start.
    </Paragraph>
  ));

  // image
  const image = props.settings.image;
  if (image) {
    const imageContents = [];
    const url = URL.createObjectURL(image);
    imageContents.push((<img id="measure-image" className="" src={url} alt="Measurement step illustration"/>));

    // caption
    const caption = props.settings.caption;
    if (caption) {
      imageContents.push((<p id="measure-image-caption" className="">{caption}</p>));
    }
    pageContents = pageContents.concat(imageContents);
  }

  // connections table
  const headers     = props.settings.headers || ['VNA Port', 'Connect to'];
  const connections = props.settings.connections;
  if (connections) {
    pageContents.push((
      <div className="row">
        <Table headers={headers} connections={connections}/>
      </div>
    ));
  }

  return (
    <div>
      {pageContents}
    </div>
  )
}

export default PerformMeasurementPage;
