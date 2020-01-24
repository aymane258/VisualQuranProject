import React, { Component } from 'react';
import './App.css';
import Video from './components/VideoBackground/VideoBackground'
import QuranVerse from './components/QuranVerse/QuranVerse'
import Gallery from './components/Gallery/Gallery'
class App extends Component {

  state = {
    videoURL: 'tree.mp4'
}
onChange = () => {
    this.setState({videoURL:'een.mp4'})
 
    }
  render() {
    return (<React.Fragment>
      <Gallery change={this.onChange}/>
      <QuranVerse></QuranVerse>
      <Video videoURL={this.state.videoURL}></Video>

      </React.Fragment>);
  }
}

export default App;
