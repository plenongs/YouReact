import { useState, useEffect } from 'react'
import {SearchQuery, Updatefrom, RequestsData} from "../reducer/Action"

export default function Navbar(props){
  const token = "AIzaSyAUGB_N7HwZQ_1cZyHOMqqirOiY7x6KjPU"; //PU
  
  const [searchx, setSearch] = useState(false);
  useEffect(() => {
    if(props.ld.youquery !== undefined) {
      const Apiurl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=${token}&q=${props.ld.youquery}`;
      props.dis(RequestsData(Apiurl))
      setTimeout(() => setSearch(false), 2000);
    }
  }, [props.ld.youquery])
  
  
  const handleKeyDown = async(event) => {
    if(event.key == "Enter"){
      setSearch(true);
      props.dis(SearchQuery(event.target.value))
    }
  }
  
  
  return (
    <div className="w-screen p-2">
      <div className="navbar min-h-0 h-10 bg-base border border-primary rounded-xl shadow-sm">
        <div  className="flex-1">
          <a onClick={() => props.dis(Updatefrom([]))} className="btn btn-ghost text-xl">#Youtube - React</a>
        </div>
        <div className="flex gap-2">
          <label className="input input-xs w-40 md:w-auto">
            { searchx ? <span class="loading loading-spinner"></span> : <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"> <circle cx="11" cy="11" r="8"></circle> <path d="m21 21-4.3-4.3"></path> </g> </svg> }
            <input type="search" onKeyDown={e => handleKeyDown(e)} required placeholder="Search" />
          </label>
        </div>
      </div>
    </div>
  )
}

//          <input type="text" onKeyDown={e => handleKeyDown(e)} placeholder="Search" className="input input-xs rounded-xl input-bordered w-40 md:w-auto" />