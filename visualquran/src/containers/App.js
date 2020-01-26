import React, { Component } from 'react';
import './App.css';
import Video from '../components/VideoBackground/VideoBackground'
import QuranVerse from '../components/QuranVerse/QuranVerse'
import ModalController from '../components/Controller/ModalController'
class App extends Component {

  state = {
    videoURL: './assets/tree.mp4'
}
onChange = () => {
    this.setState({videoURL:'./assets/een.mp4'})
 
    }
  render() {
    return (<React.Fragment>
    
    <ModalController></ModalController>
      <QuranVerse></QuranVerse>
      <Video videoURL={this.state.videoURL}></Video>

      </React.Fragment>);
  }
}

export default App;
