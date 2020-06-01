import React, { Component } from 'react'
import './QuranVerse'

import ReactHtmlParser from 'react-html-parser';
export default class QuranVerse extends Component {

    toggleAppear = () => {

    }

    render() {

        return (<React.Fragment>
            <div  className="container block">
                <div key={this.props.currentVerse} className="arabic fade-in zoomIn block">
                <h1>{this.props.ayahSymbol} {ReactHtmlParser(this.props.arabicVerse)}</h1>
                </div>
            </div>

            <div key={this.props.currentVerse} className="translation fade-in zoomIn">
            <h2 >{this.props.currentVerse} {ReactHtmlParser(this.props.translationVerse)}</h2>
            </div>

   
        </React.Fragment>

        )
    }
}
