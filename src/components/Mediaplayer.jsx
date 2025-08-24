import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { UpdateStatus } from "../reducer/Action"
import { useDispatch } from "react-redux";
import he from "he";

export default function Mediaplayer({id, title, status, channel}){
  
  const dispatch = useDispatch();
  const titles = title !== undefined ? he.decode(title) : "Hello Dunia!";
  const image = id !== undefined ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : "https://tugumalang.id/wp-content/uploads/2025/08/one-piece.jpeg";
  const channels = channel !== undefined ? channel : "Plenongs - OppaiLibs"
  
  const [progress, setProgress] = useState({playedSeconds: 0, played: 0});
  const [durasi, setDurasi] = useState(0);
  
  const handlerStop = () => {
    dispatch(UpdateStatus(false));
  };
  
  const handlePlay = () => {
    dispatch(UpdateStatus(true));
  };
  
  
  const handleDurasi = (durasix) => {
    setDurasi(durasix)
  }
  
  const handleProgress = state => {
    setProgress(state)
  }
  
  const buttonPlayer = () => {
    if(id !== undefined){
      dispatch(UpdateStatus(!status));
    }
  }
  
  useEffect(() => {
    dispatch(UpdateStatus(false));
    if(id !== undefined){
      setTimeout(() => dispatch(UpdateStatus(true)), 1000);
    }
  }, [id]);
  
  return (
    <>
      <ReactPlayer 
        className='react-player' 
        width='0px' 
        height='0px'
        onProgress={handleProgress}
        onDuration={handleDurasi}
        url={ id ? "https://www.youtube.com/watch?v="+id : null } 
        pip={false} 
        playing={status} 
        controls={false} 
        loop={false} 
        onEnded={handlerStop} //for change to next song 
        onPlay={handlePlay} 
        onPause={handlerStop}
      />
      <div className="card bg-base-100 image-full w-screen shadow-sm px-2 pt-2">
        <figure>
          <img src={image} className="w-full" alt="Shoes"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{titles}</h2>
          <p></p>
          <div className="card-actions  justify-end">
            <div className="join join-vertical w-full">
              <div className="text-right">
                <span className="pr-1"> {channels} </span>
                <button onClick={buttonPlayer} className="btn btn-xs rounded-sm"> {status ? 'Pause' : 'Play'}</button>
              </div>
              <div className="">
                {progress.durasi}
                <progress className="progress progress-success max-w-full" value={progress.playedSeconds} max={durasi}></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}