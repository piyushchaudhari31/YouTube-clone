import React, { useEffect, useState } from 'react'
import '../recommended/recomended.css'
import { API_KEY , value_converter } from '../../data'
import { useNavigate } from 'react-router-dom'

const Recommended = ({ categoryId }) => {

    const [apiData, setApiData] = useState([])
    const navigate = useNavigate()

    const fetchData = async () => {
        const relatedVideourl =
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&videoCategoryId=${categoryId}&maxResults=20&key=${API_KEY}`;

        const res = await fetch(relatedVideourl);
        const data = await res.json();
        setApiData(data.items);
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    const PalyRecommendedVideo = (categoryId , id)=>{
        navigate(`/video/${categoryId}/${id}`)
        window.scrollTo(0, 0);  
    }

    return (
        <div className='recommended'>
            {apiData.map((item, idx) => {
                
                return (
                    <div onClick={()=>{PalyRecommendedVideo(item.snippet.categoryId , item.id)}} className="side-video-list" key={idx}>
                        <img src={item.snippet.thumbnails.high.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.localized.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </div>

                )
            })}



        </div>
    )
}

export default Recommended
