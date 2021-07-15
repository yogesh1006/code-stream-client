import { React, useState, useEffect, useReducer } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useParams, useHistory } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import "./videoplayer.css";
import { Nav } from "../../Components/index";
import {
  useAuth,
  useLikedVideos,
  useSavedVideos,
  usePlaylist,
  useVideos,
} from "../../Contexts";
import { videoPlayerReducer } from "../../Reducers";
import toast from "react-hot-toast";
import { API } from "../../api";

export function VideoPlayer() {
  const [user, setUser] = useState({});
  const { likeState, likeDispatch } = useLikedVideos();
  const { savedState, savedDispatch } = useSavedVideos();
  const { playlistState, playlistDispatch } = usePlaylist();
  const { authState } = useAuth();
  const { videos } = useVideos();
  const history = useHistory();
  const axiosConfig = { headers: { authorization: authState.token } };
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const initialState = {
    desc: true,
    like: false,
    saved: false,
    newPlaylist: false,
    openModal: "modal",
    playlistName: "",
  };
  const [videoPlayerState, videoPlayerDispatch] = useReducer(
    videoPlayerReducer,
    initialState
  );

  useEffect(() => {
    (async function () {
      const {
        data: { result },
      } = await axios.get(`${API}/api/get_user_data`, {
        headers: { authorization: authState.token },
      });
      console.log(result);
      setUser(result);
    })();
  }, [authState]);

  const likeHandler = async (video) => {
    try {
      if (authState.isUserLoggedIn) {
        if (videoPlayerState.like) {
          await axios.delete(
            `${API}/api/remove_liked_videos`,
            { id: video._id },
            { headers: { authorization: authState.token } }
          );
          likeDispatch({ type: "REMOVE-FROM-LIKEVIDEOS", payload: video });
          videoPlayerDispatch({ type: "LIKE", payload: false });
          toast.success("Removed from Liked Videos");
        } else {
          var postData = { id: video._id };
          let axiosConfig = { headers: { Authorization: authState.token } };
          await axios.post(
            `${API}/api/add_to_liked_videos`,
            postData,
            axiosConfig
          );
          likeDispatch({ type: "ADD-TO-LIKEVIDEOS", payload: video });
          videoPlayerDispatch({ type: "LIKE", payload: true });
          toast.success("Added to Liked Videos");
        }
      } else {
        toast.success("Login to proceed.");
        videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal open" });
      }
    } catch (e) {
      if (e.response.status === 401) {
        return toast.success("Login to proceed.");
      } else {
        return toast.error("Failed to update.");
      }
    }
  };
  const saveHandler = async (video) => {
    try {
      if (authState.isUserLoggedIn) {
        if (videoPlayerState.saved) {
          await axios.delete(
            `${API}/api/remove_saved_video`,
            { id: video._id },
            { headers: { authorization: authState.token } }
          );
          savedDispatch({ type: "REMOVE-FROM-SAVEDVIDEOS", payload: video });
          videoPlayerDispatch({ type: "SAVED", payload: false });
          toast.success("Removed from Saved Videos");
        } else {
          let postData = { id: video._id };
          await axios.post(
            `${API}/api/add_to_save_videos`,
            postData,
            axiosConfig
          );
          savedDispatch({ type: "ADD-TO-SAVEDVIDEOS", payload: video });
          videoPlayerDispatch({ type: "SAVED", payload: true });
          toast.success("Added to Saved Videos");
        }
      } else {
        toast.success("Login to proceed.");
        videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal open" });
      }
    } catch (e) {
      if (e.response.status === 401) {
        return toast.success("Login to proceed.");
      } else {
        return toast.error("Failed to update.");
      }
    }
  };
  const addPlaylistHandler = async (video, playlist, action) => {
    try {
      if (authState.isUserLoggedIn) {
        await axios.post(
          `${API}/api/add_to_playlist/${playlist._id}`,
          { videoId: video._id, username: user.username },
          axiosConfig
        );
        playlistDispatch({
          type: "ADD-TO-PLAYLIST",
          payload: { playlist: playlist._id, video: video },
        });
        videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" });
        toast.success("Added to Playlist.");
      } else {
        toast.success("Login to proceed.");
      }
    } catch (e) {
      if (e.response.status === 401) {
        return toast.success("Login to proceed.");
      } else {
        return toast.error("Failed to update.");
      }
    }
  };
  const removePlaylistHandler = async (video, playlist) => {
    try {
      if (authState.isUserLoggedIn) {
        await axios.delete(
          `${API}/api/remove_from_playlist/${playlist._id}`,
          { videoId: video._id, username: user.username },
          axiosConfig
        );
        playlistDispatch({
          type: "REMOVE-FROM-PLAYLIST",
          payload: { playlist: playlist._id, video: video },
        });
        videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" });
        toast.success("Removed from Playlist.");
      } else {
        toast.success("Login to proceed.");
      }
    } catch (e) {
      if (e.response.status === 401) {
        return toast.success("Login to proceed.");
      } else {
        return toast.error("Failed to update.");
      }
    }
  };
  const createPlaylistHandler = async (video) => {
    try {
      if (authState.isUserLoggedIn) {
        const {
          data: { result },
        } = await axios.post(
          `${API}/api/create_playlist`,
          {
            playlistName: videoPlayerState.playlistName,
            videoId: video._id,
            username: user.username,
          },
          axiosConfig
        );
        playlistDispatch({ type: "CREATE-PLAYLIST", payload: result });
        videoPlayerDispatch({ type: "NEW-PLAYLIST", payload: false });
        videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" });
        toast.success("Playlist created.");
      } else {
        toast.success("Login to proceed.");
      }
    } catch (e) {
      if (e.response.status === 401) {
        return toast.success("Login to proceed.");
      } else {
        return toast.error("Failed to update.");
      }
    }
  };

  useEffect(() => {
    const data = videos.find((video) => video.id === id);
    setVideo(data);
    const isLiked = likeState.likedVideos.some(
      (video) => video.videoId === data.videoId
    );
    const isSaved = savedState.savedVideos.some(
      (video) => video.videoId === data.videoId
    );
    isLiked && videoPlayerDispatch({ type: "LIKE", payload: true });
    isSaved && videoPlayerDispatch({ type: "SAVED", payload: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav />
      <div className="player-page">
        <div className="player-card">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.id}`}
            controls={true}
            playing={true}
            className="media-player"
          />
          <div className="card-text">
            <p className="card-primary-text">{video.title}</p>
            <p className="card-secondary-text">{video.published_date}</p>
            <div className="actions">
              {videoPlayerState.like && (
                <AiFillLike
                  className="action-icon liked"
                  onClick={() => {
                    likeHandler(video);
                  }}
                />
              )}
              {!videoPlayerState.like && (
                <BiLike
                  className="action-icon not-liked"
                  onClick={() => {
                    likeHandler(video);
                  }}
                />
              )}
              <RiPlayListAddFill
                className="action-icon"
                onClick={() => {
                  videoPlayerDispatch({
                    type: "OPEN-MODAL",
                    payload: "modal open",
                  });
                }}
              />
              {videoPlayerState.saved && (
                <BsFillBookmarkFill
                  className="action-icon liked"
                  onClick={() => {
                    saveHandler(video);
                  }}
                />
              )}
              {!videoPlayerState.saved && (
                <BsBookmark
                  className="action-icon not-liked"
                  onClick={() => {
                    saveHandler(video);
                  }}
                />
              )}
            </div>
            <div className="desc">
              <p>Description</p>
              {!videoPlayerState.desc && (
                <IoIosArrowDown
                  className="action-icon"
                  onClick={() =>
                    videoPlayerDispatch({ type: "DESC", payload: true })
                  }
                />
              )}
              {videoPlayerState.desc && (
                <IoIosArrowUp
                  className="action-icon"
                  onClick={() =>
                    videoPlayerDispatch({ type: "DESC", payload: false })
                  }
                />
              )}
            </div>
            {videoPlayerState.desc && (
              <div className="desc-content">
                <p>{video.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Playlist Modal */}
      <div className={videoPlayerState.openModal}>
        {authState.isUserLoggedIn ? (
          <div className="modal-content">
            <div className="modal-header">
              <h2>Playlist</h2>
            </div>
            <div className="modal-body">
              {playlistState.playlist.map((item) => {
                if (item.videos.some((obj) => obj._id === video._id)) {
                  return (
                    <div key={item._id} className="playlist-name">
                      <label for={item._id} className="label">
                        {item.playlistName}
                      </label>
                      <button
                        className="action-btn"
                        onClick={() => {
                          removePlaylistHandler(video, item);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div key={item._id} className="playlist-name">
                      <label for={item._id} className="label">
                        {item.playlistName}
                      </label>
                      <button
                        className="action-btn"
                        onClick={() => {
                          addPlaylistHandler(video, item);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  );
                }
              })}
              {videoPlayerState.newPlaylist && (
                <div className="input-div">
                  <input
                    type="text"
                    placeholder="New Playlist Name"
                    className="playlist-name-input"
                    onChange={(e) => {
                      videoPlayerDispatch({
                        type: "PLAYLIST-NAME",
                        payload: e.target.value,
                      });
                    }}
                  />
                  <button
                    className="logout-btn"
                    onClick={() => {
                      createPlaylistHandler(video);
                    }}
                  >
                    Create
                  </button>
                </div>
              )}
            </div>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" });
                  videoPlayerDispatch({ type: "NEW-PLAYLIST", payload: false });
                }}
                className="close-btn"
              >
                Close
              </button>
              <button
                className="logout-btn"
                onClick={() => {
                  videoPlayerDispatch({ type: "NEW-PLAYLIST", payload: true });
                }}
              >
                Create new playlist
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-content">
            <div className="modal-header">
              <p>Login to continue.</p>
            </div>
            <div className="modal-body">
              <div className="modal-buttons">
                <button
                  onClick={() => {
                    videoPlayerDispatch({
                      type: "OPEN-MODAL",
                      payload: "modal",
                    });
                  }}
                  className="close-btn"
                >
                  Close
                </button>
                <button
                  className="logout-btn"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
