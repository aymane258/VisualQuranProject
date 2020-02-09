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
      videoURL: './assets/videos/GrassField.mp4',
      imgURL: 'https://i.gyazo.com/4e15ef40738c296574b4500f418df626.png',
    },

    //TEXT OF CURRENT VERSE IN ARABIC OR
    arabicVerse: null,
    translationVerse: null,

    settings: {
      //CURRENT ID OF CHATPER RECIT OR TRANSL
      currentChapterId: null,
      currentRecitationId: null,
      currentTranslationId: null,
      currentRecitorName:null
    },
    repeat: true,
    versesCurrentPage: 0,
    currentPage: 1,
    currentVerseCount: 0,
    apiData: null,
    meta: null,
    
  }



  onRepeatHandle = (value) => {
    this.setState({ repeat: value })
  }


  componentDidMount() {
    window.addEventListener("keydown", this.nextVerseHandler);

    axios.get('/options/recitations')
      .then(response => {
        const initialRecitations = response.data.recitations;
        const updatedRecitations = initialRecitations.map(recitator => {
      
       return {...recitator,imgURL:`assets/images/reciters/${recitator.id}.jpg` }
        })
        this.setState({ selectData: { ...this.state.selectData, recitations: updatedRecitations } })
      })
    axios.get('/options/translations')
      .then(response => {
        const initialTranslations = response.data.translations.sort((a, b) => {
          if (a.language_name < b.language_name) return -1
          if (a.language_name > b.language_name) return 1
          return 0
        });
        this.setState({ selectData: { ...this.state.selectData, translations: initialTranslations } })
      })
    axios.get('/chapters')
      .then(response => {
        const initialChapters = response.data.chapters;
        this.setState({ selectData: { ...this.state.selectData, chapters: initialChapters } })
      })

  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.nextVerseHandler, true);
  }
  componentDidUpdate() {
    //Only Call Api if user selected a chapter,recitation,translation
    if (this.state.settings.currentChapterId && this.state.settings.currentRecitationId && this.state.settings.currentTranslationId) {
      //Only Call Api if either its the first call or ,(apidata is not null and the chapter is not changed and translation is not changed or if page is)
      if (!this.state.apiData ||
        (this.state.apiData && (this.state.apiData.verses[0].chapter_id !== Number(this.state.settings.currentChapterId)
          || Number(this.state.settings.currentTranslationId) !== this.state.apiData.verses[0].translations[0].resource_id
          || this.state.currentPage !== this.state.apiData.meta.current_page))) {

        axios.get(`/chapters/${this.state.settings.currentChapterId}/verses?recitation=${this.state.settings.currentRecitationId}&translations=${this.state.settings.currentTranslationId}&language=en&text_type=words&page=${this.state.currentPage}`)
          .then(response => {
            this.setState({ apiData: response.data, currentVerseCount: 0 })
            console.log(response.data.verses[0].audio.url)
            console.log(`/chapters/${this.state.settings.currentChapterId}/verses?recitation=${this.state.settings.currentRecitationId}&translations=${this.state.settings.currentTranslationId}&language=en&text_type=words&page=${this.state.currentPage}`)
          }).catch(error => {
            console.log(error)
          })

      }
    }
  }

nextChapterHandler= () => {
  const currentChapter=this.state.settings.currentChapterId 
  if(currentChapter<=113)
  this.setState({settings:{
    currentChapterId:currentChapter+1
  }})
}
previousChapterHandler=()=> {
  const currentChapter=this.state.settings.currentChapterId 
  if(currentChapter>=2)
  this.setState({settings:{
    currentChapterId:currentChapter-1
  }})
}
  nextVerseHandler = (event) => {
    const currPage = this.state.currentPage;
    const currVerse = this.state.currentVerseCount;

    //NEXT VERSE
    if ( this.state.apiData && event.keyCode === 39) {
      if (this.state.currentVerseCount !== this.state.apiData.verses.length - 1) {
        this.setState({ currentVerseCount: currVerse + 1 })
      } else if (this.state.currentVerseCount === this.state.apiData.verses.length - 1 && !this.state.apiData.meta.next_page && this.state.repeat) {
        console.log(!this.state.apiData.meta.next_page)
        this.setState({ currentVerseCount: 0 })
      } else if (this.state.currentVerseCount === this.state.apiData.verses.length - 1 && this.state.apiData.meta.next_page) {
        this.setState({ currentPage: currPage + 1 })

        console.log(this.state.currentPage + " current page")

      }
    }
    //PREVIOUS VERSE
    if (this.state.apiData && event.keyCode === 37) {
      if (this.state.currentVerseCount !== 0 ) {
        this.setState({ currentVerseCount: currVerse - 1 })
      } else if (this.state.currentVerseCount === 0  && !this.state.apiData.meta.prev_page) {
        console.log(!this.state.apiData.meta.next_page)
        this.setState({ currentVerseCount: 0 })
      } else if (this.state.currentVerseCount === 0 && this.state.apiData.meta.prev_page) {
        this.setState({ currentPage: currPage -1 })

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
        this.setState({ settings: { ...this.state.settings, currentChapterId: currentSetting } })
        break;
      case SelectTypes.RECITATION:
        this.setState({ settings: { ...this.state.settings, currentRecitationId: currentSetting } })
        break;
      case SelectTypes.TRANSLATION: {
        this.setState({ settings: { ...this.state.settings, currentTranslationId: currentSetting } })
        break;
      }
    }
    //this.setState({settings:currentSettings})
  }
  render() {

    let quranVerse = <QuranVerse arabicVerse="Pleas Select A chapter" translationVerse="Please Select a translation" > </QuranVerse>
    let audio;

    if (this.state.settings.currentChapterId && this.state.settings.currentRecitationId && this.state.settings.currentTranslationId) {
      quranVerse = <QuranVerse arabicVerse="Loading..." translationVerse="Loading..." > </QuranVerse>
    }

    if (this.state.apiData) {
      audio = (<audio className="displayNone" controls autoPlay key={this.state.apiData.verses[this.state.currentVerseCount].audio.url}>
        <source src={this.state.apiData.verses[this.state.currentVerseCount].audio.url} />
      </audio>)
      quranVerse = <QuranVerse  currentVerse={this.state.apiData.verses[this.state.currentVerseCount].verse_key} arabicVerse={this.state.apiData.verses[this.state.currentVerseCount].text_madani} translationVerse={this.state.apiData.verses[this.state.currentVerseCount].translations[0].text} > </QuranVerse>
    }

    return (<React.Fragment>

      <Modal><Controller nextChapter={this.nextChapterHandler} prevChapter={this.previousChapterHandler} onRepeat={this.onRepeatHandle} settings={this.onChangeSettings} imgURL={this.state.gallery.imgURL} changeBackground={this.onChangeBackground} selectData={this.state.selectData}  ></Controller></Modal>
      {quranVerse}

      {audio}

      <Video videoURL={this.state.gallery.videoURL}></Video>

    </React.Fragment>);
  }
}

export default VisualQuran;
