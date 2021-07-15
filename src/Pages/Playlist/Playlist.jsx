import React from 'react'
import axios from 'axios'
import { Nav, VideoCard } from "../../Components/index";
import { useAuth, usePlaylist } from "../../Contexts";
import './playlist.css';
import { BsTrash } from "react-icons/bs"
import { NavLink } from 'react-router-dom';
// import { useSnackbar } from 'react-simple-snackbar';
// import { error, success, info } from "../../Utils/snackbar";
import toast from "react-hot-toast";
import { API } from '../../api';

export function Playlist() {

    const { playlistState, playlistDispatch } = usePlaylist();
    const { authState } = useAuth();
    // const [openErrorSnackbar] = useSnackbar(error);
    // const [openSuccessSnackbar] = useSnackbar(success);
    // const [openInfoSnackbar] = useSnackbar(info);

    const deletePlaylist = async (playlistName) => {
        try{
            if(authState.isUserLoggedIn){
                await axios.post(`${API}/api/delete_playlist`,{ playlistName: playlistName }, { headers: { "authorization": authState.token } });
                playlistDispatch({ type: "DELETE-PLAYLIST", payload: playlistName });
                toast.success('Playlist deleted successfully.')
            }else{
                toast.success('Login to proceed.')
            }
        }catch(e){
            if(e.response.status === 401){
                return toast.success('Login to proceed.')
            }else{
                return  toast.error('Failed to delete playlist.')
            }
        }
    };
     console.log("playlist",playlistState)
    return (
        <>
            <Nav />
            <div className="playlist-page">
                {
                    playlistState.playlist.map(playlist => {
                        return (
                            <div key={playlist._id} className="playlist">
                                <div className="container">
                                    <h1 className="playlist-name">{playlist.playlistName}</h1>
                                    <BsTrash className="trash-icon" onClick={() => { deletePlaylist(playlist.playlistName) }} />
                                </div>
                                <div className="playlist-videos">
                                    {
                                        playlist.videos.map(video => {
                                            return (
                                                <VideoCard data={video} key={video.videoId} />
                                            )
                                        })
                                    }
                                    {
                                        playlist.videos.length === 0 &&
                                        <div className="add-video" style={{margin: "0 2rem"}}>
                                            <p>You don't have any video in this playlist.</p>
                                            <p><NavLink to='/' className="sign-up">Explore</NavLink> and add some videos.</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                {
                    playlistState.playlist.length === 0 &&
                    <div className="add-video" style={{paddingTop: "2.5rem"}}>
                        <h2>You don't have any playlist.</h2>
                        <h3><NavLink to='/' className="sign-up">Explore</NavLink> and create some.</h3>
                    </div>
                }
            </div>
        </>
    )
}
