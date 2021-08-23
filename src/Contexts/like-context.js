import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer,useState } from 'react';
import { useAuth } from "./authContext";
import { likeReducer } from "../Reducers";
import { API } from '../api';

const LikedVideosContext = createContext();

export default function LikeProvider({ children }){

    const [likeState, likeDispatch] = useReducer(likeReducer, { likedVideos: [] })
    const { authState } = useAuth();
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        (async function(){
            setLoading(true)
            const likedVideo = await axios.get(`${API}/api/get_all_liked_videos`, { headers: { authorization: authState.token } });
            likeDispatch({ type: "LOAD", payload: likedVideo.data.data.likedVideos })
            setLoading(false)
        })()
    },[authState])

    return(
        <LikedVideosContext.Provider value={{ likeState, likeDispatch ,loading}}>
            {children}
        </LikedVideosContext.Provider>
    )
}

export function useLikedVideos(){
    return useContext(LikedVideosContext)
}