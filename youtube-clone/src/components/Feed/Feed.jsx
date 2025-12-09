import React, { useEffect, useState } from 'react'
import '../Feed/feed.css'

import { Link, useNavigate } from 'react-router-dom'
import { API_KEY ,value_converter } from '../../data'
import moment from 'moment'

const Feed = ({ category }) => {

  const [data, setData] = useState([])
  const navigate = useNavigate()

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=52&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`

    await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items))

  }

  useEffect(() => {
    fetchData()
  }, [category])

  const navigatePlayVideo = (categoryId , id)=>{
    navigate(`video/${categoryId}/${id}`)
    window.scrollTo(0,0)
  }
  


  return (
    <div className='feed'>
      {data.map((item,idx) => {
        return (
          <div onClick={()=>navigatePlayVideo(item.snippet.categoryId ,item.id)} className="card" key={idx}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)}Views  &bull;  {moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
        )

      })}

    </div>

  )
}

export default Feed
