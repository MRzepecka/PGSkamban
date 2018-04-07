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

  renderLists = () => {
    return this.state.boardData.map(list => (
      <List listName={list.name} cards={[]} />
    ));
  };

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.boardName}</h1>
          <button className="btn btn-info">Add new list</button>
          <input type="text" className="listName__input" />
        </div>
        <div className="container-fluid">
          <div className="row flex-row flex-nowrap">{this.renderLists()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Board)