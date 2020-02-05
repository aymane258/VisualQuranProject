import React, { Component } from 'react'
import './QuranVerse'

import ReactHtmlParser from 'react-html-parser';
export default class QuranVerse extends Component {

    toggleAppear = () => {

    }
    
    render() {
      
        return (
            <div key={this.props.arabicVerse}className="container">
      <h2 className="fade-in" >{ReactHtmlParser(this.props.translationVerse)}</h2>
        <h2 className="arabic fade-in">{ReactHtmlParser(this.props.arabicVerse)}</h2>
            </div>
        )
    }
}
