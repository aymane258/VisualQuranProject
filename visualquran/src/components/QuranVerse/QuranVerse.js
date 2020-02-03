import React, { Component } from 'react'
import './QuranVerse'
//import axios from 'axios'
export default class QuranVerse extends Component {
    
    render() {
        //const url = "http://staging.quran.com:3000/api/v3/chapters/1/verses?recitation=1&translations=21&language=en&text_type=words"
        return (
            <div className="container">
    <h2>{this.props.translationVerse}</h2>
        <h2>{this.props.arabicVerse}</h2>
            </div>
        )
    }
}
