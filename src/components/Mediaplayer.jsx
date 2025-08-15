import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { UpdateStatus } from "../reducer/Action"

// medium image https://i.ytimg.com/vi/QD2UDaYaTbI/mqdefault.jpg
// default image https://i.ytimg.com/vi/qPjqP29p4ys/default.jpg
export default function Mediaplayer(props){
  
  const title = props.title !== undefined ? props.title : "Hello Dunia!";
  const image = props.id !== undefined ? `https://i.ytimg.com/vi/${props.id}/mqdefault.jpg` : "https://tugumalang.id/wp-content/uploads/2025/08/one-piece.jpeg";
  const channels = props.channel !== undefined ? props.channel : "Plenongs - OppaiLibs"
  
  const [progress, setProgress] = useState({playedSeconds: 0, played: 0});
  const [durasi, setDurasi] = useState(0);
  
  const handlerStop = () => {
    props.dis(UpdateStatus(false));
  };
  
  const handlePlay = () => {
    props.dis(UpdateStatus(true));
  };
  
  
  const handleDurasi = (durasix) => {
    setDurasi(durasix)
  }
  
  const handleProgress = state => {
    setProgress(state)
  }
  
  const buttonPlayer = () => {
    if(props.id !== undefined){
      props.dis(UpdateStatus(!props.status));
    }
  }
  
  useEffect(() => {
    props.dis(UpdateStatus(false));
    if(props.id !== undefined){
      setTimeout(() => props.dis(UpdateStatus(true)), 1000);
    }
  }, [props.id]);
  
  return (
    <>
      <ReactPlayer 
        className='react-player' 
        width='0px' 
        height='0px'
        onProgress={handleProgress}
        onDuration={handleDurasi}
        url={ props.id ? "https://www.youtube.com/watch?v="+props.id : null } 
        pip={false} 
        playing={props.status} 
        controls={false} 
        loop={false} 
        onEnded={handlerStop} //for change to next song 
        onPlay={handlePlay} 
        onPause={handlerStop}
      />
      <div className="card bg-base-100 image-full w-screen shadow-sm px-2 pt-2">
        <figure>
          <img src={image} className="w-full" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p></p>
          <div className="card-actions  justify-end">
            <div className="join join-vertical">
              <div className="text-right">
                <span className="pr-1"> {channels} </span>
                <button onClick={buttonPlayer} className="btn btn-xs rounded-sm"> {props.status ? 'Pause' : 'Play'}</button>
              </div>
              <div className="">
                {progress.durasi}
                <progress className="progress progress-success w-56" value={progress.playedSeconds} max={durasi}></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}