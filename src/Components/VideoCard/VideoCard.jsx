import React from "react";
import "./videocard.css";
import { Link } from "react-router-dom";

export function VideoCard(props) {
  const { data } = props;
  return (
    <>
      <div className="videolist">
        <Link
          to={"/watch/" + data.id}
          className="card"
          key={"suggestion" + data.id}
        >
          <img
            className="card-video-thumbnail"
            alt={data.title}
            src={data.thumbnailImgUrl}
          />
          <div className="card-details">
            <img
              className="card-channel-logo"
              src={data.channelImageUrl}
              alt={data.title}
            />
            <div className="card-channel-details">
              <p className="card-title">{data.title}</p>
              <p className="card-channel-name">{data.channelName}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}


