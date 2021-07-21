import React from 'react'
import { VideoCard } from "../../Components/index";
import { useLikedVideos } from "../../Contexts/like-context";
import { NavLink } from 'react-router-dom';
import './likedvideos.css';

export function LikedVideos() {

    const { likeState } = useLikedVideos();

    return (
        <>
        <div className="like-page">
            <div className="like-card">
                { likeState.likedVideos.map(video => <VideoCard data={video} key={video.videoId} />) }
            </div>
            {
                likeState.likedVideos.length === 0 &&
                <div className="add-video">
                    <h2>You didn't like any video yet.</h2>
                    <h3><NavLink to='/' className="sign-up">Explore</NavLink> and like some videos to add them.</h3>
                </div>
            }
        </div>
        </>
    )
}