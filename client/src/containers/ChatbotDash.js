import React, { Component } from 'react';
import $ from 'jquery';
import Feedback from '../components/Feedback/Feedback';
import Chatbot from '../components/Chatbot/Chatbot';
import user from './img/anonymous_user.png';
import './ChatbotDash.css';

class ChatbotDash extends Component {
    constructor() {
        super();
        this.state = {
            showUsrMng: false,
            showPopup: false
        }
    }

    UserManagement() {
        this.setState({
            showUsrMng: !this.state.showUsrMng
        });
    }

    componentDidMount() {
        let btnMenu = document.getElementById('btn-menu');
        let nav = document.getElementById('nav');
        let $doc = $('html, body');
        // show menu items
        btnMenu.addEventListener('click', function () {
            nav.classList.toggle('show');
        })
        // scroll effect - click on menu items
        $('a').click(function () {
            $doc.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 1000);
            return false;
        });
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        let usrMng = (
            <div>
                <div id="header-UsrMng-box">
                    <p className="header-UsrInfo">
                        <br></br>Usuário<br></br>
                        <br></br>
                        <p className="header-Logout" title="log out"><b><span className="glyphicon glyphicon-log-out"></span> Log Out</b></p>
                    </p>
                </div>
            </div>);

        return (
            <main>
                <div className="header">
                    <div className="btn_menu">
                        <span className="icon-menu" id="btn-menu" title="Configurações do usuário"></span>
                        <nav className="nav" id="nav">
                            <ul className="menu">
                                <li className="menu__item">
                                    <a className="menu__link" id="link1" href="#chatbot">Chat</a>
                                </li>
                                <li className="menu__item">
                                    <a className="menu__link" id="link2" href="#team">Time</a>
                                </li>
                                <li className="menu__item">
                                    <a className="menu__link" id="link3" href="#team">Help</a>
                                </li>
                                <li className="menu__item">
                                    <div className="menu__link" id="link4" onClick={this.togglePopup.bind(this)}>Feedback</div>
                                </li>
                                <li className="menu__item">
                                    <a className="menu__link" id="link5" href="http://www.fatecjd.edu.br/portal/" target="blank">Site</a>
                                </li>
                                <li className="menu__item">
                                    <a className="menu__link" id="link6" href="https://siga.cps.sp.gov.br/aluno/login.aspx" target="blank">SIGA</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <img src={user} className="header-user" alt="Foto do usuário" title="Configurações do usuário"
                        onClick={this.UserManagement.bind(this)} />
                    {this.state.showUsrMng ? usrMng : null}
                </div>

                {this.state.showPopup ?
                    <div className="container">
                        <Feedback closePopup={this.togglePopup.bind(this)} />
                    </div>
                    : null
                }

                <div className="container" id="chatbot">
                    <div id="root"><Chatbot /></div>
                </div>

                <div className="container" id="team">
                    <div className="row">
                        <h3 className="title">Time</h3>

                        <div className="col-xs-6 col-sm-6 col-md-3">
                            <div className="cards">
                                <h4 className="name">Gustavo Guedes</h4>
                                <img src="img/team/gportog.png" className="pics" />
                                <div className="role">Desenvolvedor</div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3">
                            <div className="cards">
                                <h4 className="name">Isabella Leite</h4>
                                <img src="img/team/isa.jpg" className="pics" />
                                <div className="role">Desenvolvedora</div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3">
                            <div className="cards">
                                <h4 className="name">Leticia Costa</h4>
                                <img src="img/team/le.jpg" className="pics" />
                                <div className="role">Desenvolvedora</div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-2">
                            <div className="cards">
                                <h4 className="name">Humberto Zanetti</h4>
                                <img src="img/team/humberto.jpg" className="pics" />
                                <div className="role">Orientador</div>
                            </div>
                        </div>

                    </div>
                </div>
                <p id="terms-of-use">Termos de uso</p>
            </main>
        );
    }
}

export default ChatbotDash;
