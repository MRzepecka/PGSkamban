import React, { Component } from 'react';
import './Card.css'
import axios from "axios";
import {BASE_URL} from "../constants";
import PropTypes from 'prop-types';
class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.cardName,
            listId: props.listId
        };
    }

    deleteCard = () => {
        axios.delete(BASE_URL+"/card/" + this.props.cardId + "/"+ this.state.listId).then(()=>{
            console.log("Seccessfully delete lits!");
            this.props.onClick(this.props.cardId);
        });
    }
    saveCardName = () => {
        axios.put(BASE_URL+"/card", {name: this.state.name, listId: this.state.listId, cardId: this.props.cardId}).then(() =>{
            console.log("Successfully update list!")
        }).catch((error) => {
            console.log(error);
        });
    }

    onChangeCard = (e) => {
        this.setState({name: e.target.value});
    }
    render() {
        return(
            <div>      
                <div className="row">
                    <input value={this.state.name} onChange={this.onChangeCard} className="form-control form-control-sm col-9"/>
                    <button className="btn btn-success col-1" onClick={this.saveCardName}>Edit</button>
                    <button className="btn btn-danger col-1" onClick={this.deleteCard}>X</button>
                </div>
            </div>
        )}
}

Card.propTypes = {
    listId: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  };

export default Card;