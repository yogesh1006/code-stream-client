import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { API } from "../api";

const VideosContext = createContext();

export default function VideosProvider({children}){

    const [videos, setVideos] = useState([])
    const [loading, setLoading ] = useState(false)
    useEffect(()=>{
        (async function(){
            setLoading(true)
            const res = await axios.get(`${API}/auth/get_all_videos`);
            setVideos(res.data.data)
            setLoading(false)
        })()
    },[])

    return(
        <VideosContext.Provider value={{ videos, setVideos ,loading}}>
            {children}
        </VideosContext.Provider>
    )
}

export function useVideos(){
    return useContext(VideosContext)
}