import React from "react";
import { VideoCard } from "../../Components/index";
import { useLikedVideos } from "../../Contexts/like-context";
import { NavLink } from "react-router-dom";
import "./likedvideos.css";
import Loader from "react-loader-spinner";

export function LikedVideos() {
  const { likeState, loading } = useLikedVideos();

  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader type="TailSpin" color="#000000" height={70} width={70} />
        </div>
      ) : (
        <div className="like-page">
          <h2 style={{ marginTop: "5rem", marginLeft: "5rem", color: "white" }}>
            {" "}
            Liked Videos : {likeState.likedVideos.length}
          </h2>
          <div className="like-card">
            {likeState.likedVideos.map((video) => (
              <VideoCard data={video} key={video.videoId} />
            ))}
          </div>
          {likeState.likedVideos.length === 0 && (
            <div className="add-video">
              <h2>You didn't like any video yet.</h2>
              <h3>
                <NavLink to="/" className="sign-up">
                  Explore
                </NavLink>{" "}
                and like some videos to add them.
              </h3>
            </div>
          )}
        </div>
      )}
    </>
  );
}
