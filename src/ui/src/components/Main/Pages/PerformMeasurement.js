import React     from 'react';
import Paragraph from './Paragraph';
import Table     from './Table';
import Title     from './Title';

function PerformMeasurementPage(props) {
  const pageContents = [];

  // title
  const step     = props.settings.step;
  const steps    = props.settings.steps;
  const calGroup = props.settings.calGroup;
  const calDate  = props.settings.calDate;
  const serialNo = props.settings.serialNo;
  pageContents.push((<Title key="perform-measurement-page-title" display="Perform Measurement" step={step} steps={steps} calGroup={calGroup} calDate={calDate} serialNo={serialNo}/>));

  // instructions
  pageContents.push((
    <Paragraph key="perform-measurement-page-text">
      Make the following connections, then click the <code>Next</code> button to start.
    </Paragraph>
  ));

  // image
  const image = props.settings.image;
  if (image) {
    const imageContents = [];
    const url = URL.createObjectURL(image);
    imageContents.push((<img id="measure-image" key="measure-image" className="figure-img img-fluid rounded" src={url} alt="Measurement step illustration"/>));

    // caption
    const caption = props.settings.caption;
    if (caption) {
      imageContents.push((<figcaption id="measure-image-caption" key="measure-image-caption" className="figure-caption">{caption}</figcaption>));
    }
    pageContents.push((
      <div className="row" key="image-row">
        <div className="mx-auto">
          <figure className="figure text-center d-block">
            {imageContents}
          </figure>
        </div>
      </div>
    ));
  }

  // connections table
  const headers     = props.settings.headers || ['VNA Port', 'Connect to'];
  const connections = props.settings.connections;
  if (connections) {
    pageContents.push((
      <div className="row" key="perform-measurement-page-row">
        <Table key="perform-measurement-page-table" headers={headers} connections={connections}/>
      </div>
    ));
  }

  return pageContents;
}

export default PerformMeasurementPage;
