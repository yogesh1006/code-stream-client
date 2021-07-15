import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "./authContext";
import { playlistReducer } from "../Reducers";
import { API } from '../api';

const PlaylistContext = createContext();

export default function PlaylistProvider({ children }){

    const [playlistState, playlistDispatch] = useReducer(playlistReducer, { playlist: [] })
    const { authState } = useAuth();

    useEffect(()=>{
        (async function(){
            const res = await axios.get(`${API}/api/get_user_playlist`, { headers: { authorization: authState.token } });
            console.log("response",res)
            playlistDispatch({ type: "LOAD", payload: res.data.data})
        })()
    },[authState])

    return(
        <PlaylistContext.Provider value={{ playlistState, playlistDispatch }}>
            {children}
        </PlaylistContext.Provider>
    )
}

export function usePlaylist(){
    return useContext(PlaylistContext)
}