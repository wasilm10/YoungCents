import React from 'react'
import  './Video.css'
import v from '../../assets/video.mp4'

const Video = ({playState,setPlayState}) => {
  return (
    <div className={`video-player ${playState?'':'hide'}`}>
        <video src={v} autoPlay muted controls></video>
    </div>
  )
}

export default Video