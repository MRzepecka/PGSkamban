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
        boardId: props.boardId,
        cardName: "",
        listData: props.cards
    };
    console.log(props.cards);
}
    renderCards = () => {
        return (
            this.state.listData.map((card) => <Card cardName={card.name} key={card.id} listId={card.listId} 
            cardId={card.id} onClick={this.deleteCard}/>)
        );
    }

    onChangeList = (e) => {
        this.setState({name: e.target.value});
    }

    onChangeCard = (e) => {
        this.setState({cardName: e.target.value});
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

    addCard = (e) => {
        console.log(this.state.listName);
        axios.post(BASE_URL+"/card", 
        {
         listId: this.props.listId,
         name: this.state.cardName
        })
        .then(response => {
          console.log(response);
          this.setState(prevState =>{
            const result = [...prevState.listData, response.data];
            return{
              listData: result, //... to przkopiuje to co jest w tym a później doda jeszcze dodatkową to nowe
              cardName: ''
            }
          });
        });
      }

      deleteCard = id => {
        this.setState(prevState => {
          return { listData: prevState.listData.filter(card => card.id !== id) };
        });
      };
    
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
              <input value={this.state.cardName} onChange={this.onChangeCard} className="form-control col-8"/>
                <button className="btn btn-warning btn-sm" onClick={this.addCard}>Add Card</button>
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