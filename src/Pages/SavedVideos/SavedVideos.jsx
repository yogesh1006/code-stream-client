import { VideoCard } from "../../Components/index";
import "./savedVideos.css";
import { useSavedVideos } from "../../Contexts";
import { NavLink } from "react-router-dom";
import Loader from "react-loader-spinner";


export function SavedVideos() {
  const { savedState, loading } = useSavedVideos();

  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader type="TailSpin" color="#000000" height={70} width={70} />
        </div>
      ) : (
        <div className="watch-page">
          <h2 style={{ color: "white", marginTop: "5rem", marginLeft: "5rem" }}>
            Saved Videos : {savedState.savedVideos.length}
          </h2>
          <div className="watch-card">
            {savedState.savedVideos.map((video) => (
              <VideoCard data={video} key={video.videoId} />
            ))}
          </div>
          {savedState.savedVideos.length === 0 && (
            <div className="add-video">
              <h2>You didn't save any video yet.</h2>
              <h3>
                <NavLink to="/" className="sign-up">
                  Explore
                </NavLink>{" "}
                and save some videos.
              </h3>
            </div>
          )}
        </div>
      )}
    </>
  );
}
