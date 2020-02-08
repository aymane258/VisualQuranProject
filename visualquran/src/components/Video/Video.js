import React, {Component} from 'react';
import './Video.css';

class Video extends Component {

        render () {
            return (
                <video key={this.props.videoURL}  className="videoInsert"  loop autoPlay>
                    <source src={this.props.videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                   
                </video>
        
            )
        }
    };
export default Video;