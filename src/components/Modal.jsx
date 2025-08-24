import { useState } from 'react'

import { useDispatch } from "react-redux";
import {LocalData, LocalSet, LocalString} from "./LocalStor";
import { Updates} from "../reducer/Action"

export default function Modal({upd}){
  const dispatch = useDispatch()
  
  const [infos, setinfos] = useState(undefined);
  const handleradd = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fixurl = formData.get("url").replace("https://youtu.be/", "").replace("https://m.youtube.com/watch?v=", "")
    const addLs = [...LocalData(), { id: { videoId: fixurl }, snippet: { title: formData.get("title"), channelTitle: formData.get("channel") } }]
    if(!LocalString().includes(fixurl)){
      LocalSet(addLs);
      setinfos(formData.get('title') + " ditambahkan ke playlist!")
      dispatch(Updates(!upd));
    }else{
      setinfos("ID Sudah ada di playlist!")
    }
    
    event.currentTarget.reset()
  }
  
  //https://youtu.be/SLa87zR7tmw
  return (
    <>
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box w-lg">
        <h3 className="text-xs font-bold">{infos !== undefined ? infos : ""}</h3>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <form onSubmit={handleradd}>
          <legend className="fieldset-legend">Add List Y-URL</legend>
          <label className="label">Youtube-Url</label>
          <input name="url" type="text" className="input w-full input-xs" placeholder="https://m.youtube.com/hsgTgg" />
          <label className="label">Video Title</label>
          <input name="title" type="text" className="input w-full input-xs" placeholder="Until The End!" />
          <label className="label">Channel Name</label>
          <input name="channel" type="text" className="input w-full input-xs" placeholder="Avenged SevenFold" />
          <button className="btn btn-neutral btn-xs mt-4">Add to List</button>
          </form>
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => setinfos(" ")} className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    </>
  )
}