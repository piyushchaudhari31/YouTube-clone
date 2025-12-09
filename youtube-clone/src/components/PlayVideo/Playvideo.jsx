import React, { useEffect, useState } from 'react'
import '../PlayVideo/playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import userProfile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'


const Playvideo = ({ videoId, categoryId }) => {
    const [apiData, setApiData] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState(null)

    const fatchvideoData = async () => {
        const videoDetailUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

        await fetch(videoDetailUrl).then(response => response.json()).then((data) => setApiData(data.items[0]))
    }

    const fatchChannelData = async () => {

        const channelDataUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`

        await fetch(channelDataUrl).then((res) => res.json()).then((data) => setChannelData(data.items[0]))

        const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`;

        await fetch(comment_url).then((res) => res.json()).then((data) => setCommentData(data.items))

    }





    useEffect(() => {
        fatchvideoData()
    }, [videoId])

    useEffect(() => {
        if (apiData) {
            fatchChannelData()
        }
    }, [apiData])


    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>
                    {apiData ? value_converter(apiData.statistics.viewCount) : "16k"} views &bull;{" "}
                    {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
                </p>

                <div>
                    <span><img src={like} alt="" />{value_converter(apiData?.statistics?.likeCount)}</span>
                    <span><img src={dislike} alt="" />25</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />save</span>
                </div>
            </div>
            <hr />
            <div className='publisher'>
                <img src={channelData ? channelData.snippet.thumbnails.default.url : "https://avatar.iran.liara.run/public/boy"} alt="" />
                <div>
                    <p>{apiData?.snippet?.channelTitle}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "15k"} subscriber</span>
                </div>
                <button>Subscribe</button>
            </div>


            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : ""} comment</h4>
                <div className='Playvideo-page'>
                {commentData?.map((item, idx) => {


                    return (

                        <div className="comment" key={idx}>
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                

                                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span> {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span> </h3>
                                    <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                                    <div className="comment-action">
                                        <img src={like} alt="" />
                                        <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                        <img src={dislike} alt="" />
                                    </div>

                               

                            </div>
                        </div>

                    )
                })}
                </div>



            </div>




        </div>


    )
}

export default Playvideo
