import React, { Component } from 'react';
import PropTypes from "prop-types";
import './PlayerSubmissionForm.css';

class PlayerSubmissionForm extends Component {
  constructor(props) {
    super(props);

    let newFields = {};

    props.fields.forEach((element) => {
      if (element.key)
        newFields[element.key] = ""
    })

    this.state = newFields;

    this.validator = {
      text: /.+/,
    };
  }

  validate = (fieldName) => {
    const value = this.state[fieldName];
    const validation = this.validator.text;

    if (value.match(validation)) {
      return true;
    }
    return false;
  }

  onFieldChange = (event) => {
    const { name, value } = event.target;

    const updatedState = {};
    updatedState[name] = value;

    this.setState(updatedState);
  }

  makeFields () {
    const allFields = this.props.fields.map((field, i) => {

      if(field.key){
        let wordType = field.key
        return <input key={i} name={wordType} value={this.state[wordType]} placeholder={field.placeholder} type="text" onChange={this.onFieldChange} className={this.validate(wordType) ? "PlayerSubmissionForm__input" : "PlayerSubmissionForm__input--invalid"} />
      } else {
        return <span key={i}>{field}</span>
      }
    });

    return allFields
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    let allValid = true;

    Object.keys(this.state).forEach((key) => {
      if (!this.state[key].match(this.validator.text)) {
        allValid = false;
      }
    });

    if (!allValid) {
      return;
    }

    const newLine = {
      adj1: this.state.adj1,
      noun1: this.state.noun1,
      adv: this.state.adv,
      verb: this.state.verb,
      adj2: this.state.adj2,
      noun2: this.state.noun2
    };

    this.setState({
      adj1: "",
      noun1: "",
      adv: "",
      verb: "",
      adj2: "",
      noun2: "",
    });

    this.props.addLineCallback(newLine);
  }

  render() {
    return (
      <div className="PlayerSubmissionForm">
        <h3>Player Submission Form for Player #{ this.props.playerNum }</h3>
        <form className="PlayerSubmissionForm__form" onSubmit={this.onFormSubmit}>
          <div className="PlayerSubmissionForm__poem-inputs">
            { this.makeFields() }
          </div>
          <div className="PlayerSubmissionForm__submit">
            <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
          </div>
        </form>
      </div>
    );
  }
}

PlayerSubmissionForm.propTypes = {
  fields: PropTypes.array.isRequired,
  playerNum: PropTypes.number.isRequired,
  addLineCallback: PropTypes.func.isRequired,
};

export default PlayerSubmissionForm;
