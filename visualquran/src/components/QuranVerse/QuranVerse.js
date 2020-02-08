import React, { Component } from 'react'
import './QuranVerse'

import ReactHtmlParser from 'react-html-parser';
export default class QuranVerse extends Component {

    toggleAppear = () => {

    }
    
    render() {
      
        return (<React.Fragment>
            <div key={this.props.arabicVerse}className="container block">
     
        <h1 className="quran fade-in">{this.props.ayahSymbol} {ReactHtmlParser(this.props.arabicVerse)}</h1>
  
            </div>
            <h2 className="fade-in" >[{this.props.currentVerse}] {ReactHtmlParser(this.props.translationVerse)}</h2>
            </React.Fragment>
            
        )
    }
}
