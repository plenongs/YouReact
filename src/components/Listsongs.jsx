import { useState, useEffect } from 'react'
import DefaultList from '../utils/DefaultList'
import { UpdatePlayer, UpdateStatus, Updates} from "../reducer/Action"
import { useDispatch } from "react-redux";
import {LocalString, LocalData, LocalSet} from "./LocalStor";

import he from 'he';

export default function Listsongs({data, id, status, upd}){
  
  const [ytvid, setytvid] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(LocalData() === null){
      LocalSet(DefaultList);
    }
    const ll = data === undefined || data.length === 0 ? LocalData() : data;
    setytvid(ll)
  }, [data, upd])
  
  const handlerClick = (ids, title, chans) => {
    if(ids === id && status === false){
      dispatch(UpdateStatus(true));
    }else if(ids !== id){
      dispatch(UpdatePlayer(ids, title, chans));
    }else{
      //pass
    }
  }
  
  const handlerFavo = (ids, title, chans) => {
    let newLocal = []
    if(LocalString().includes(ids)){
      LocalData().map((x,y) => {
        if(x.id.videoId !== ids){ newLocal.push(x); } 
      });
    }else{
      newLocal = [...LocalData(), { id: { videoId: ids }, snippet: { title: title, channelTitle: chans } }]
    }
    LocalSet(newLocal);
    dispatch(Updates(!upd));
  }
   
  return (
    <div className="h-[485px] overflow-y-auto">
    <ul className="list bg-base-100 rounded-box shadow-md">
      { ytvid.map((lol, i) => (
        <li key={i} className="list-row">
          <div>
            <img className="size-10 rounded-box" src={`https://i.ytimg.com/vi/${lol.id.videoId}/default.jpg`}/></div>
            <div>
              <div>{he.decode(lol.snippet.title)}</div>
              <div className="text-xs uppercase font-semibold opacity-60">{lol.snippet.channelTitle}</div>
            </div>
            <button onClick={() => handlerClick(lol.id.videoId, lol.snippet.title, lol.snippet.channelTitle)} className="btn btn-square btn-ghost">
              {id === lol.id.videoId && status ? <span className="loading loading-spinner text-primary"></span> : <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg> }
            </button>
            <button onClick={() => handlerFavo(lol.id.videoId, lol.snippet.title, lol.snippet.channelTitle)} className="btn btn-square btn-ghost">
              <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" 
              stroke={ LocalString().includes(lol.id.videoId) ? "#E53935" : "currentColor"}>
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
          </li>
        ))
      }
    </ul>
    </div>
  )
}