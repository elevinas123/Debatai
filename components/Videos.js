import { useRef, useEffect, useState } from 'react';
import Vid from './Vid';
import { Peer } from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import MyVid from './MyVid';

const Videos = (props) => {
  const myRef = useRef(null);
  const otherRef = useRef(null);
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  let [localStream, setLocalStream] = useState(null)
  useEffect(() => {
    const fetchConnection = async (id) => {
      try {
        await fetch("/api/socket")
        const response = await fetch('/api/connect', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id)
        });
        console.log("ok")
        const conn = await response.json();
        return conn;
      } catch (error) {
        console.error('Failed to fetch connection:', error);
        return null;
      }
    };

    const init = async () => {
      const id = uuidv4()
      const peer = new Peer(id)
      peer.on("call", call => {
        call.answer(localStream)
        console.log("bandom")
        handle(call)
      })
      const conn = await fetchConnection(id);
      await getMedia()
      if (!conn.free) {
        console.log(conn)
        try {
          let call =   peer.call(conn.id1, localStream)
          console.log("STREAM", localStream)
          handle(call)
          console.log(call)
        } catch (error) {
          console.log(error)
        }
      }
    }
    init();
  }, []);

  const getMedia = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    myRef.current.srcObject = localStream
    setLocalStream(localStream)
  }
  const handle = (call) => {
    call.on("stream", stream => {
      otherRef.current.srcObject = stream
      console.log(call)
    })
    call.on("error", error => console.log(error))
  }
  const muteMic = async () => {
    localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    setAudioMuted(i => !i)
  }
  const muteVideo = () => {
    localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    setVideoMuted(i => !i)

  }
  return (
    <div className='bg-slate-200 w-fit flex flex-col mt-48 ml-32 '>

      <div className='flex'>
        <div className=' w-96 mr-16' >
          <MyVid reference={myRef} />
          <button onClick={() => muteMic()} className='btn'>mute Audio</button>
          <button onClick={() => muteVideo()} className='btn'>mute Video</button>
        </div>
        <div className="divider-horizontal bg-black w-4"></div>
        <div className='w-96 ml-16' >
          <Vid reference={otherRef} />
        </div>
      </div>
    </div>
  );
};

export default Videos;
