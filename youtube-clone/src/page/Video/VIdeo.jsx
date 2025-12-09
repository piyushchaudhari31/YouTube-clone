import React from 'react'
import '../Video/video.css'
import Playvideo from '../../components/PlayVideo/Playvideo'
import Recommended from '../../components/recommended/Recommended'
import { useParams } from 'react-router-dom'

const VIdeo = () => {

  const {videoId , categoryId} = useParams()

  return (
    <div className='play-container'>
      <Playvideo videoId={videoId} catergoryId={categoryId}/>
      <Recommended categoryId ={categoryId}/>
    </div>
  )
}

export default VIdeo
