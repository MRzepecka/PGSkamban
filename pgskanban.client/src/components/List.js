import React, { Component } from 'react';
import Card from './Card';
import axios from "axios";
import {BASE_URL} from "../constants";
import './List.css';
import PropTypes from 'prop-types';

class List extends Component {
constructor(props){
    super(props);
    this.state = {
        name: props.listName,
        boardId: props.boardId
    };
}
    renderCards = () => {
        return (
            this.props.cards.map((card) => <Card cardName={card.name}/>)
        );
    }

    onChangeList = (e) => {
        this.setState({name: e.target.value});
    }

    saveListName = () => {
        axios.put(BASE_URL+"/list", {name: this.state.name, boardId: this.state.boardId, listId: this.props.listId}).then(() =>{
            console.log("Successfully update list!")
        }).catch((error) => {
            console.log(error);
        });
    }

    deleteList = () => {
        axios.delete(BASE_URL+"/list/" + this.props.listId + "/"+ this.state.boardId).then(()=>{
            console.log("Seccessfully delete lits!");
            this.props.onClick(this.props.listId);
        });
    }

    render() {
        return(
            <div className="col-3">
            <div className="row">
                <input value={this.state.name} onChange={this.onChangeList} className="form-control col-8"/>
                <button className="btn btn-success col-2" onClick={this.saveListName}>Edit</button>
                <button className="btn btn-danger col-2" onClick={this.deleteList}>X</button>
            </div>
              <h3>{this.props.listName}</h3>
              <div className="card card-block">
                {this.renderCards()}
              </div>
              <div>
                <button className="btn btn-warning btn-sm">Add Card</button>
              </div>
            </div>
        )
    }
}

List.propTypes = {
    listId: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    boardId: PropTypes.number.isRequired,
    listName: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
  };

  export default List;