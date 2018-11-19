import React, { Component } from 'react';

import { Editor } from 'proto-mde';

export default class App extends Component {
  
  render() {
    // this.state && console.log(this.state.doc)
    return (
      <div>
        <div>
          <Editor /> 
          {/* onChange={doc => this.setState({ doc })}/> */}
        </div>
        <pre>
          {/* {this.state && <code>{JSON.stringify(this.state.doc.view.state.doc, null, 2)}</code>} */}
        </pre>
      </div>
    );
  }
}
