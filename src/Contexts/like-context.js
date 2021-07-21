import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from "./authContext";
import { likeReducer } from "../Reducers";
import { API } from '../api';

const LikedVideosContext = createContext();

export default function LikeProvider({ children }){

    const [likeState, likeDispatch] = useReducer(likeReducer, { likedVideos: [] })
    const { authState } = useAuth();

    useEffect(()=>{
        (async function(){
            const likedVideo = await axios.get(`${API}/api/get_all_liked_videos`, { headers: { authorization: authState.token } });
            likeDispatch({ type: "LOAD", payload: likedVideo.data.data.likedVideos })
        })()
    },[authState])

    return(
        <LikedVideosContext.Provider value={{ likeState, likeDispatch }}>
            {children}
        </LikedVideosContext.Provider>
    )
}

export function useLikedVideos(){
    return useContext(LikedVideosContext)
}