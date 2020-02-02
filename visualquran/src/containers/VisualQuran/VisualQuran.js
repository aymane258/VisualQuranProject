import React, { Component } from 'react';
import Video from '../../components/Video/Video'
import QuranVerse from '../../components/QuranVerse/QuranVerse'
import ModalController from '../ModalController'

class VisualQuran extends Component {

  state = {
    videoURL: './assets/tree.mp4'
}
onChangeBackground = (videoURL) => {
    this.setState({videoURL:videoURL})
    }
  render() {
    return (<React.Fragment>
    
    <ModalController changeBackground={this.onChangeBackground}></ModalController>
      <QuranVerse></QuranVerse>
      <Video videoURL={this.state.videoURL}></Video>

      </React.Fragment>);
  }
}

export default VisualQuran;
