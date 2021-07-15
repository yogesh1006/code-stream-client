import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { saveReducer } from "../Reducers";
import { useAuth } from "./authContext";
import { API } from '../api';

const SavedVideosContext = createContext();

export default function SavedVideosProvider({ children }){

    const [savedState, savedDispatch] = useReducer(saveReducer, { savedVideos: [] });
    const { authState } = useAuth();

    useEffect(()=>{
        (async function(){
            const res = await axios.get(`${API}/api/get_all_saved_videos`, { headers: { "authorization": authState.token } });
            console.log("res",res)
            savedDispatch({ type: "LOAD", payload: res.data.data.savedVideos })
        })()
    },[authState])  

    return(
        <SavedVideosContext.Provider value={{ savedState, savedDispatch }}>
            {children}
        </SavedVideosContext.Provider>
    )
}

export function useSavedVideos(){
    return useContext(SavedVideosContext)
}