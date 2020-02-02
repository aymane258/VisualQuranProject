import Controller from '../components/Controller/Controller'
import Modal from '../components/UI/Modal/Modal'
import React, { Component } from 'react'
import axios from 'axios'

class ModalController extends Component {

    state = {
        recitations:[],
        translations:[],
        chapters:[],
        selectedChapterId:null
    }
componentDidMount(){
    axios.get('/options/recitations')
    .then(response => {
        this.setState({recitations:response.data.recitations})  
    })
    axios.get('/options/translations')
    .then(response => {
        this.setState({translations:response.data.translations})  
    })
    axios.get('/chapters')
    .then(response => {
        this.setState({chapters:response.data.chapters})  
    })
}

    render() {
        return (
            <Modal><Controller changeBackground={this.props.changeBackground}  recitations={this.state.recitations} translations={this.state.translations} chapters={this.state.chapters} ></Controller></Modal>
        )
    }
}

export default ModalController
