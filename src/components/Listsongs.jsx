import { useState, useEffect } from 'react'
import DefaultList from '../utils/DefaultList'
import { UpdatePlayer, UpdateStatus} from "../reducer/Action"

export default function Listsongs(props){
  
  const [arr, sarr] = useState([]); 
  useEffect(() => {
    const ll = props.data === undefined || props.data.length === 0 ? DefaultList : props.data;
    sarr(ll)
  }, [props.data])
  
  const handlerClick = (id, title, chans) => {
    if(id === props.id && props.status === false){
      props.dis(UpdateStatus(true));
    }else if(id !== props.id){
      props.dis(UpdatePlayer(id, title, chans));
    }else{
      //pass
    }
  }
  
  return (
    <div className="h-[485px] overflow-y-auto">
    <ul className="list bg-base-100 rounded-box shadow-md">
      { arr.map((lol, i) => (
        <li key={i} className="list-row">
          <div>
            <img className="size-10 rounded-box" src={`https://i.ytimg.com/vi/${lol.id.videoId}/default.jpg`}/></div>
            <div>
              <div>{lol.snippet.title}</div>
              <div className="text-xs uppercase font-semibold opacity-60">{lol.snippet.channelTitle}</div>
            </div>
            <button onClick={() => handlerClick(lol.id.videoId, lol.snippet.title, lol.snippet.channelTitle)} className="btn btn-square btn-ghost">
              {props.id === lol.id.videoId && props.status ? <span className="loading loading-spinner"></span> : <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg> }
            </button>
            <button className="btn btn-square btn-ghost">
              <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
          </li>
        ))
      }
    </ul>
    </div>
  )
}