import React from 'react';
import './Main.scss';

class Main extends React.Component {
  render() {
    return(
      <main role="main" className="col-md-10 ml-sm-auto px-4">
        <div id="main">
          <h1>Header 1</h1>
          <p>This is where the summary goes.</p>

          <h2>Header 1.1</h2>
          <p>This is where the details start to emerge.</p>

          <h3>Header 1.1.1</h3>
          <p>This is where I start to fall asleep.</p>

          <h4>Header 1.1.1.1</h4>
          <p>This is where I am definitely asleep.</p>

          <h5>Header 1.1.1.1.1</h5>
          <p>This is when friends and loved ones report you as missing.</p>

          <h6>Header 1.1.1.1.1.1</h6>
          <p>And this is when they stop looking for you</p>

        </div>
      </main>
    )
  }
}

export default Main;
