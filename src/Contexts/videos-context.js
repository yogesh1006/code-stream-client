import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { API } from "../api";

const VideosContext = createContext();

export default function VideosProvider({children}){

    const [videos, setVideos] = useState([])

    useEffect(()=>{
        (async function(){
            const res = await axios.get(`${API}/auth/get_all_videos`);
            setVideos(res.data.data)
        })()
    },[])

    return(
        <VideosContext.Provider value={{ videos, setVideos }}>
            {children}
        </VideosContext.Provider>
    )
}

export function useVideos(){
    return useContext(VideosContext)
}