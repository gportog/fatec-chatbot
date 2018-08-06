import React, { Component } from 'react';
import '../Chatbot-resp.css';

class EnrichedMsg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          {this.props.answer.text}
          <br></br><br></br>
          {this.props.answer.file? <div><iframe src={this.props.answer.file} class="box" frameborder="0" allowfullscreen="true"></iframe><br></br></div>: null}
      </div>
    );
  };
}

export default EnrichedMsg;