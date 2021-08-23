import { React } from "react";
import "./home.css";
import { VideoCard } from "../../Components/index";
import { useVideos } from "../../Contexts";
import Loader from "react-loader-spinner";

export function Home() {
  const { videos, loading } = useVideos();
  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader type="TailSpin" color="#000000" height={70} width={70} />
        </div>
      ) : (
        <div className="video-page">
          {videos.map((video) => (
            <VideoCard data={video} key={video._id} />
          ))}
        </div>
      )}
    </>
  );
}
