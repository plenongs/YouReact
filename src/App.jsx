import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import Listsongs from './components/Listsongs'
import Mediaplayer from "./components/Mediaplayer"
import { UpdatePlayer } from "./reducer/Action"

function App() {
  const load = useSelector((state) => state);
  const dispatch = useDispatch();
  
  return (
    <>
      <Mediaplayer dis={dispatch} id={load.playerid} title={load.playertitle} status={load.playerstatus} channel={load.playerchannel}/>
      <Navbar dis={dispatch} ld={load}/>
      <Listsongs dis={dispatch} data={load.youtubeData} id={load.playerid} status={load.playerstatus}/>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Sukamelang</p>
        </aside>
      </footer>
    </>
  )
}

export default App
