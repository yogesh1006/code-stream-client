import React, { createContext, useContext, useReducer, useEffect ,useState} from 'react';
import axios from 'axios';
import { saveReducer } from "../Reducers";
import { useAuth } from "./authContext";
import { API } from '../api';

const SavedVideosContext = createContext();

export default function SavedVideosProvider({ children }){

    const [savedState, savedDispatch] = useReducer(saveReducer, { savedVideos: [] });
    const { authState } = useAuth();
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        (async function(){
            setLoading(true)
            const res = await axios.get(`${API}/api/get_all_saved_videos`, { headers: { "authorization": authState.token } });
            savedDispatch({ type: "LOAD", payload: res.data.data.savedVideos })
            setLoading(false)
        })()
    },[authState])  

    return(
        <SavedVideosContext.Provider value={{ savedState, savedDispatch ,loading}}>
            {children}
        </SavedVideosContext.Provider>
    )
}

export function useSavedVideos(){
    return useContext(SavedVideosContext)
}