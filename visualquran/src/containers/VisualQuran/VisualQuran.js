import React, { Component } from 'react';
import Video from '../../components/Video/Video'
import QuranVerse from '../../components/QuranVerse/QuranVerse'
import Modal from '../../components/UI/Modal/Modal'
import axios from 'axios'
import Controller from '../../components/Controller/Controller'
import * as SelectTypes from '../../components/Controller/SelectTypes'

class VisualQuran extends Component {

  state = {
    //DATA TO FILL THE SELECT COMPONENT
    selectData: {
      recitations: [],
      translations: [],
      chapters: [],
    },
    //GALLERY AND BACKGROUND DATA
    gallery: {
      videoURL: './assets/tree.mp4',
      imgURL: 'https://i.gyazo.com/4e15ef40738c296574b4500f418df626.png',
    },

    //CURRENT VERSETEXT DISPLAY
    arabicVerse: null,
    translationVerse: null,

    settings: {
      //CURRENT ID OF CHATPER RECIT OR TRANSL
      currentChapter: null,
      currentRecitation: null,
      currentTranslation: null,
    },
    onRepeatValue:true,
    versesCurrentPage: 0,
    currentPage: 1,
    currentVerseCount: 0,
    apiData: null,
    meta: null
  }

onRepeatHandle=(value)=>{
  this.setState({onRepeatValue:value})
}


  componentDidMount() {
    axios.get('/options/recitations')
      .then(response => {
        const initialRecitations = response.data.recitations;
        this.setState({ selectData: { ...this.state.selectData, recitations: initialRecitations } })
      })
    axios.get('/options/translations')
      .then(response => {
        const initialTranslations = response.data.translations;
        this.setState({ selectData: { ...this.state.selectData, translations: initialTranslations } })
      })
    axios.get('/chapters')
      .then(response => {
        const initialChapters = response.data.chapters;
        this.setState({ selectData: { ...this.state.selectData, chapters: initialChapters } })
      })

  }
  componentDidUpdate() {
    //Only Call Api if user selected a chapter,recitation,translation
    if (this.state.settings.currentChapter && this.state.settings.currentRecitation && this.state.settings.currentTranslation) {
      //Only Call Api if either its the first call or ,(apidata is not null and the chapter is not changed                                        and translation is not changed)
      if (!this.state.apiData ||
        (this.state.apiData && (this.state.apiData.verses[0].chapter_id !== Number(this.state.settings.currentChapter)
          || Number(this.state.settings.currentTranslation) !== this.state.apiData.verses[0].translations[0].resource_id
          || this.state.currentPage !== this.state.apiData.meta.current_page))) {

        axios.get(`/chapters/${this.state.settings.currentChapter}/verses?recitation=${this.state.settings.currentRecitation}&translations=${this.state.settings.currentTranslation}&language=en&text_type=words&page=${this.state.currentPage}`)
          .then(response => {
            this.setState({ apiData: response.data })
            console.log(response.data.verses[0].audio.url)
            console.log(`/chapters/${this.state.settings.currentChapter}/verses?recitation=${this.state.settings.currentRecitation}&translations=${this.state.settings.currentTranslation}&language=en&text_type=words&page=${this.state.currentPage}`)
          }).catch(error => {
            console.log(error)
          })

      }
    }
  }


  nextVerseHandler = () => {
    const currPage = this.state.currentPage;
    const currVerse = this.state.currentVerseCount;
    if (this.state.apiData) {

      if (this.state.currentVerseCount !== this.state.apiData.verses.length - 1) {
        this.setState({ currentVerseCount: currVerse + 1 })

      } else if (this.state.currentVerseCount === this.state.apiData.verses.length - 1 && !this.state.apiData.meta.next_page && this.state.onRepeatValue) {
        console.log(!this.state.apiData.meta.next_page)
        this.setState({ currentVerseCount: 0 })


      } else if (this.state.currentVerseCount === this.state.apiData.verses.length - 1 && this.state.apiData.meta.next_page) {

        this.setState({ currentPage: currPage + 1 })
        console.log(this.state.currentPage + " current page")
      }
    }
  }






  onChangeBackground = (videoURL, imgURL) => {
    this.setState({ gallery: { videoURL: videoURL, imgURL: imgURL } })
  }

  onChangeSettings = (currentSetting, type) => {
    switch (type) {
      case SelectTypes.CHAPTER:
        this.setState({ settings: { ...this.state.settings, currentChapter: currentSetting } })
        break;
      case SelectTypes.RECITATION:
        this.setState({ settings: { ...this.state.settings, currentRecitation: currentSetting } })
        break;
      case SelectTypes.TRANSLATION: {
        this.setState({ settings: { ...this.state.settings, currentTranslation: currentSetting } })
        break;
      }
    }
    //this.setState({settings:currentSettings})
  }
  render() {

    let quranVerse = <QuranVerse arabicVerse="Pleas Select A chapter" translationVerse="Please Select a translation" > </QuranVerse>
    let audio;

    if (this.state.settings.currentChapter && this.state.settings.currentRecitation && this.state.settings.currentTranslation) {
      quranVerse = <QuranVerse arabicVerse="Loading..." translationVerse="Loading..." > </QuranVerse>
    }

    if (this.state.apiData) {
      audio = (<audio className="displayNone" controls autoPlay key={this.state.apiData.verses[this.state.currentVerseCount].audio.url}>
        <source src={this.state.apiData.verses[this.state.currentVerseCount].audio.url} />
      </audio>)
      quranVerse = <QuranVerse arabicVerse={this.state.apiData.verses[this.state.currentVerseCount].text_simple} translationVerse={this.state.apiData.verses[this.state.currentVerseCount].translations[0].text} > </QuranVerse>
    }

    return (<React.Fragment>

      <Modal><Controller onRepeat={this.onRepeatHandle} settings={this.onChangeSettings} imgURL={this.state.gallery.imgURL} changeBackground={this.onChangeBackground} selectData={this.state.selectData}  ></Controller></Modal>
      {quranVerse}
      <button onClick={this.nextVerseHandler}>Next Verse</button>

      {audio}

      <Video videoURL={this.state.gallery.videoURL}></Video>

    </React.Fragment>);
  }
}

export default VisualQuran;
