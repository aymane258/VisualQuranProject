import React, { Component } from 'react'
import './QuranVerse'
//import axios from 'axios'
export default class QuranVerse extends Component {
    
    render() {
        //const url = "http://staging.quran.com:3000/api/v3/chapters/1/verses?recitation=1&translations=21&language=en&text_type=words"
        return (
            <div className="container">
               <h2>If anyone desires a reward in this life, We shall give it to him; and if anyone desires a reward in the Hereafter, We shall give it to him. And swiftly shall We reward those that (serve us with) gratitude</h2> 
               <h2>صراط الذين انعمت عليهم غير المغضوب عليهم ولا الضالين</h2>
            </div>
        )
    }
}
