import React, { createContext, useContext, useReducer, useEffect,useState} from 'react';
import axios from 'axios';
import { useAuth } from "./authContext";
import { playlistReducer } from "../Reducers";
import { API } from '../api';

const PlaylistContext = createContext();

export default function PlaylistProvider({ children }){

    const [playlistState, playlistDispatch] = useReducer(playlistReducer, { playlist: [] })
    const { authState } = useAuth();
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        (async function(){
            setLoading(true)
            const res = await axios.get(`${API}/api/get_user_playlist`, { headers: { authorization: authState.token } });
            playlistDispatch({ type: "LOAD", payload: res.data.data})
            setLoading(false)
        })()
    },[authState])

    return(
        <PlaylistContext.Provider value={{ playlistState, playlistDispatch,loading }}>
            {children}
        </PlaylistContext.Provider>
    )
}

export function usePlaylist(){
    return useContext(PlaylistContext)
}