import { useState, useEffect } from 'react'
import {SearchQuery, Updatefrom, RequestsData} from "../reducer/Action"
import { useDispatch } from "react-redux";


export default function Navbar({ld}){
  
  const dispatch = useDispatch()
  const [searchx, setSearch] = useState(false);
  useEffect(() => {
    if(ld.youquery !== undefined) {
      const Apiurl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&type=video&key=${process.env.TOKEN_YOUTUBE}&q=${ld.youquery}`;
      dispatch(RequestsData(Apiurl))
      setTimeout(() => setSearch(false), 2000);
    }
  }, [ld.youquery])
  
  
  const handleKeyDown = async(event) => {
    if(event.key == "Enter"){
      setSearch(true);
      dispatch(SearchQuery(event.target.value))
    }
  }
  
  
  return (
    <div className="w-screen p-2">
      <div className="navbar min-h-0 h-10 bg-base border border-primary rounded-xl shadow-sm">
        <div className="flex-1">
          <a onClick={() => dispatch(Updatefrom([]))} className="btn btn-ghost text-xl">#Youtube - React</a>
        </div>
        <div className="flex gap-2">
          <label className="input input-xs w-40 md:w-auto">
            { searchx ? <span className="loading loading-spinner"></span> : <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"> <circle cx="11" cy="11" r="8"></circle> <path d="m21 21-4.3-4.3"></path> </g> </svg> }
            <input type="search" onKeyDown={e => handleKeyDown(e)} required placeholder="Search" />
          </label>
          <button className="btn btn-xs" onClick={()=>document.getElementById('my_modal_4').showModal()}>+</button>
        </div>
      </div>
    </div>
  )
}
