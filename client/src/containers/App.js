import React, { Component } from 'react';
import Conversation from '../services/conversation';
import ProjectTeam from '../components/ProjectTeam';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      conversationHistory: []
    };
  }

  componentDidMount() {
    this.sendMessage('')
  }

  render() {
    return (
     <div className="app">     
      <header>Fatec Chatbot</header>
      <section ref="main">
       { this.state.conversationHistory.map((h,i) => 
         this.renderExchange(h, i)) }
      </section>
      <footer>
      { this.renderInputView() }
      </footer>
     </div>
    );
  }

  renderExchange(exchange, key) {
    return !!exchange.output.cardType
      ? this.renderCard(exchange, key)
      : this.renderText(exchange, key);
  }

  renderCard(exchange, key) {
    switch(exchange.output.cardType) {
      case 'project_team':  
       return (
        <div key={key} className="exchange">
          { exchange.input.text ? <div className="user-msg">{exchange.input.text}</div> : null }
          <div className="watson-msg"><ProjectTeam/></div>
        </div>);   
      default:
        this.renderText(exchange,key);
    }
  }

  renderText(exchange, key) {
    return (
      <div key={key} className="exchange">
        { exchange.input.text ? <div className="user-msg">{exchange.input.text}</div> : null }
        { exchange.output.text.map((t, i) => <div key={i} className="watson-msg">{t}</div>) }
      </div>);
  }

  renderInputView() {
    return <input type="text" autoComplete="off" placeholder='Escreva aqui...'
                  onKeyUp={e => this.onInputKeyUp(e)}/>;
  }
 

  onInputKeyUp(e) {
    switch (e.which) {
      case 0x0d:
        this.sendMessage(e.target.value);
        e.target.value = '';      
        break;
      default:
        break;
    }
  }

  sendMessage(text) {
    Conversation.message({
      text
    }).then(r => {
      this.state.conversationHistory.push(r);
      this.setState({
        conversationHistory: this.state.conversationHistory
      })
    });
  }

  componentDidUpdate() {
    const scrollTo = (element, to, duration) => {
      if (duration <= 0) return;
      const difference = to - element.scrollTop;
      const perTick = difference / duration * 10;

      setTimeout(function () {
        element.scrollTop += perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
      }, 10);
    };
    const node = this.refs.main;
    scrollTo(node, node.scrollHeight, 300);
  }
}

export default App;
