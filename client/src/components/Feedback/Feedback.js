import React, { Component } from 'react';
import FeedbackService from '../../services/feedback';
import loadingIcon from '../loading.gif';
import './Feedback.css';

class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            isLoading: false,
            error: false,
            errorText: ''
        }
    }

    Submit(e) {
        e.preventDefault();
        if (!document.querySelector("textarea[name=comment]").value)
            return alert('Feedback não pode ser vazio.');
        let radioSelected;
        let radios = document.getElementsByName('evaluation');
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked)
                radioSelected = radios[i].value;
        }
        let data = {
            'evaluation': radioSelected,
            'comment': document.querySelector("textarea[name=comment]").value
        };
        this.setState({
            isLoading: true,
            error: false
        });
        FeedbackService.sendFeedback(data)
            .then((resp) => {
                return this.setState({
                    message: resp,
                    isLoading: false
                });
            })
            .catch((err) => {
                return this.setState({
                    isLoading: false,
                    error: true,
                    errorText: err.message
                });
            })
    }

    render() {
        return (
            <div id="Feedback-popup">
                <div id="Feedback-popup-popup_inner">
                    <p id="Feedback-close" className="glyphicon glyphicon-remove" title="fechar"
                        onClick={this.props.closePopup}></p>
                    <p>As respostas do chatbot estão de acordo com suas expectativas?</p>
                    <br></br>
                    <form name="feedback" id="Feedback-form" method="POST" action="/api/v1/feedback/">
                        <div id="Feedback-form-radio">
                            <input type="radio" name="evaluation" value="positivo" checked /><div>sim</div>
                            <input type="radio" name="evaluation" value="negativo" /><div>não</div>
                        </div>
                        <textarea id="Feedback-form-input" rows="8" cols="76" placeholder="Digite o seu feedback..."
                            name="comment" title="Digite o seu feedback..." ></textarea>
                        <button id="Feedback-form-cancel" className="btn btn-danger" onClick={this.props.closePopup}>Cancelar</button>
                        {this.state.isLoading ? <img src={loadingIcon} id="Feedback-form-loading" alt="loading" title="carregando" /> :
                            this.state.error ? <p id="Feedback-form-error">Error: {this.state.errorText}</p> :
                                <p id="Feedback-form-success">{this.state.message}</p>}
                        <button id="Feedback-form-submit" className="btn btn-primary" onClick={this.Submit.bind(this)}>Enviar</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default Feedback;