import React, { Component } from 'react'
import './QuranVerse'
//import axios from 'axios'
export default class QuranVerse extends Component {
    
    render() {
        //const url = "http://staging.quran.com:3000/api/v3/chapters/1/verses?recitation=1&translations=21&language=en&text_type=words"
        return (
            <div className="container">
            <h2>O you who have believed, when you contract a debt for a specified term, write it down. And let a scribe write </h2>
             <p className="arabic"> بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</p>
            </div>
        )
    }
}
