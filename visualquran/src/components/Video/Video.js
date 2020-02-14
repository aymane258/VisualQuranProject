import React, {Component} from 'react';
import './Video.css';

class Video extends Component {

        render () {
            return (
                <div class="fullscreen-bg ">
                <video key={this.props.videoURL}  className="fullscreen-bg__video"  loop autoPlay>
                    <source src={this.props.videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                   
                </video>
                </div>
        
            )
        }
    };
export default Video;