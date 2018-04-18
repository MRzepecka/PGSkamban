import React from "react";
import List from "./List";
import { BASE_URL } from "../constants";
import { withRouter } from 'react-router-dom'
import axios from "axios";
import "./Board.css";

class Board extends React.Component {
  
  constructor() {
    super();
    this.state = {
      boardName: "",
      boardId: 0,
      listName: "",
      boardData: []
    };
  }

  componentDidMount() {
    axios.get(BASE_URL + "/board").then(response => {
      console.log(response);
      this.setState({
        boardData: response.data.lists,
        boardName: response.data.name,
        boardId: response.data.id
      })
    }).catch(() => {
      this.props.history.push('/new');
    });
  }
  
  deleteList = id => {
    this.setState(prevState => {
      return { boardData: prevState.boardData.filter(list => list.id !== id) };
    });
  };

  renderLists = () => {
    return this.state.boardData.map(list => (
        <List key={list.id} boardId={list.boardId} 
          listId={list.id} listName={list.name} cards={list.cards} onClick={this.deleteList}/>
      )
    );
  };

  onClickAdd = (e) => {
    console.log(this.state.listName);
    axios.post(BASE_URL+"/list", 
    {
      boardId: this.state.boardId,
      name: this.state.listName
    })
    .then(response => {
      console.log(response);
      this.setState(prevState =>{
        return{
          boardData: [...prevState.boardData, response.data], //... to przkopiuje to co jest w tym a później doda jeszcze dodatkową to nowe
          listName: ''
        }
      });
    });
  }

  onChangeList =(e) =>{
    this.setState({
      listName: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.boardName}</h1>
          <button className="btn btn-info" onClick={this.onClickAdd}
           disabled={!this.state.listName}>Add new list</button>
          <input type="text" className="listName__input" value={this.state.listName} onChange={this.onChangeList} />
        </div>
        <div className="container-fluid">
          <div className="row flex-row flex-nowrap">{this.renderLists()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Board)