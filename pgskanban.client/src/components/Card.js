import React, { Component } from 'react';
import './Card.css'
import axios from "axios";
import { BASE_URL } from "../constants";
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        wigth: '5000px'
    }
};

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.state = {
            name: props.cardName,
            listId: props.listId,
            description: props.description
        };
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onChangeDescription = (e) => {
        console.log(e.target.value)
        this.setState({ description: e.target.value });
    }

    deleteCard = () => {
        axios.delete(`${BASE_URL}/card/${this.props.cardId}/${this.state.listId}`).then(() => {
            console.log("Seccessfully delete lits!");
            this.props.onClick(this.props.cardId);
        });
    }

    saveCardName = () => {
        axios.put(BASE_URL + "/card", { name: this.state.name, listId: this.state.listId, cardId: this.props.cardId }).then(() => {
            console.log("Successfully update list!")
        }).catch((error) => {
            console.log(error);
        });
    }

    saveCardDescription = () => {
        console.log(this.state.description);
        axios.put(BASE_URL + "/card/description", { description: this.state.description, id: this.props.cardId, listId: this.state.listId }).then(() => {
            console.log("Successfully update list!")
        }).catch((error) => {
            console.log(error);
        });
    }

    onChangeCard = (e) => {
        console.log(e.target.value)
        this.setState({ name: e.target.value });
    }

    render() {
        return (
            <div className='card__container'>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(subtitle => this.subtitle)}  >{this.props.cardName} </h2>
                    <div className="form-group">
                        <label >Description</label>
                        <textarea className="form-control" rows="5" id="description" placeholder="Add description!" value={this.state.description} onChange={this.onChangeDescription}></textarea>
                        <br />
                        <div className="row">
                            <div className="col-2"></div>
                            <button onClick={this.closeModal} className="btn btn-danger btn-group ">Close</button>
                            <div className="offset-1"></div>
                            <button onClick={this.saveCardDescription} className="btn btn-info">Save</button>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </Modal>
                <div onClick={this.openModal} className="card">{this.state.name}</div>
                <div className="row">
                    <div className="col-2"></div>
                    <input value={this.state.name} onChange={this.onChangeCard} className="form-control form-control-sm col-9" />
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <button className="btn btn-success col-2" onClick={this.saveCardName}>Edit</button>
                    <button className="btn btn-danger col-2 offset-1" onClick={this.deleteCard}>X</button>
                    <div className="col-4"></div>
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    listId: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    cardName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Card;