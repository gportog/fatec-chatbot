import React, { Component } from 'react';
import '../Chatbot.css';

class ProjectTeam extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Quem está me desenvolvendo são esses feras aqui:</h3>
        <div>
          <p><b>Nome: </b>Gustavo Guedes</p>
          <p><b>Função: </b>Desenvolvedor</p>
          <br></br>
        </div>
        <div>
          <p><b>Nome: </b>Isabella Leite</p>
          <p><b>Função: </b>Desenvolvedora</p>
          <br></br>
        </div>
        <div>
          <p><b>Nome: </b>Leticia Costa</p>
          <p><b>Função: </b>Desenvolvedora</p>
          <br></br>
        </div>
        <div>
          <p><b>Nome: </b>Humberto Zanetti</p>
          <p><b>Função: </b>Orientador</p>
          <br></br>
        </div>
      </div>
    );
  };
}

export default ProjectTeam;