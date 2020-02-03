import React, { Component } from 'react';
import Video from '../../components/Video/Video'
import QuranVerse from '../../components/QuranVerse/QuranVerse'
import Modal from '../../components/UI/Modal/Modal'
import axios from 'axios'
import Controller from '../../components/Controller/Controller'

class VisualQuran extends Component {

  state = {
    //DATA TO FILL THE SELECT COMPONENT
    selectData:{
    recitations: [],
    translations: [],
    chapters: [],
  },
  //GALLERY AND BACKGROUND DATA
    gallery:{
    videoURL: './assets/tree.mp4',
    imgURL: 'https://i.gyazo.com/4e15ef40738c296574b4500f418df626.png',
   },

//CURRENT VERSE DISPLAY
    arabicVerse: "[PLEASE SELECT A CHAPTER/RECITATOR/TRANSLATION]",
    translationVerse: "[PLACEHOLDER]",

   settings:{
    currentChapter: null,
    currentRecitation: null,
    currentTranslation: null,
  },
    apiData:null,
    meta: null
  }
  componentDidMount() {
    axios.get('/options/recitations')
      .then(response => {
        const updateRecitations = response.data.recitations; 
        this.setState({ selectData:{...this.state.selectData,recitations: updateRecitations }})
      })
    axios.get('/options/translations')
      .then(response => {
        const updateTranslations = response.data.translations;
        this.setState({selectData:{...this.state.selectData, translations: updateTranslations }})
      })
    axios.get('/chapters')
      .then(response => {
        const updateChapters =response.data.chapters;
        this.setState({selectData:{...this.state.selectData, chapters: updateChapters }})
      })
  }

  componentDidUpdate() {
    //Only Call Api if user selected a chapter,recitation,translation
    if(this.state.settings.currentChapter && this.state.settings.currentRecitation && this.state.settings.currentTranslation  ){
    axios.get(`/chapters/${this.state.settings.currentChapter}/verses?recitation=${this.state.settings.currentRecitation}&translations=${this.state.settings.currentTranslation}&language=en&text_type=words`)
      .then(response => {
        console.log("Quran verse: ",response.data.verses[0].text_simple)
        console.log("Recitation Of Verse: ",response.data.verses[0].audio.url)
        console.log("Translation Of Verse: ",response.data.verses[0].translations[0].language_name)
      }).catch(error => {
        console.log(error)
      })
    }
  }




  onChangeBackground = (videoURL, imgURL) => {
    this.setState({gallery:{ videoURL: videoURL, imgURL: imgURL }})
  }
  onChangeSettings = (currentSetting, type) => {
    if (type === "SURAH") {
      this.setState({settings:{ ...this.state.settings ,currentChapter: currentSetting }})
    }
    if (type === "RECITATION") {
      this.setState({settings:{ ...this.state.settings ,currentRecitation: currentSetting }})
    }
    if (type === "TRANSLATION") {
      this.setState({settings:{ ...this.state.settings ,currentTranslation: currentSetting }})
    }

    //this.setState({settings:currentSettings})

  }
  render() {
    return (<React.Fragment>

      <Modal><Controller settings={this.onChangeSettings} imgURL={this.state.gallery.imgURL} changeBackground={this.onChangeBackground} recitations={this.state.selectData.recitations} translations={this.state.selectData.translations} chapters={this.state.selectData.chapters} ></Controller></Modal>
      <QuranVerse arabicVerse={this.state.arabicVerse} translationVerse={this.state.translationVerse} ></QuranVerse>
      <Video videoURL={this.state.gallery.videoURL}></Video>

    </React.Fragment>);
  }
}

export default VisualQuran;
