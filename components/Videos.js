import { useRef, useEffect, useState, createRef } from 'react';
import Vid from './Vid';
import { Peer } from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import MyVid from './MyVid';

const Videos = (props) => {
  const myRef = useRef(null);
  const otherRef = useRef([createRef(), createRef(), createRef(), createRef(), createRef(), createRef(), createRef(), createRef(), createRef()]);
  let index = 0
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
          body: JSON.stringify(
            {
              peerId: id,
              publicRoom: true,
              roomType: "3v3"
            }
          )
        });
        const conn = await response.json();
        return conn;
      } catch (error) {
        console.error('Failed to fetch connection:', error);
        return null;
      }
    };

    const init = async () => {
      const id = uuidv4()
      const peer = new Peer(id, {
        config: {'iceServers': [
        {
          urls: 'stun:stun1.l.google.com:19302'
        },
        {
          urls: 'stun:stun3.l.google.com:19302'
        },
        {
          urls: 'stun:stun4.l.google.com:19302'
        }
      ]}}/* Sample servers, please use appropriate ones */)
      await getMedia()
      peer.on("call", call => {
        call.answer(localStream)
        console.log("bandom")
        handle(call)
      })
      const conn = await fetchConnection(id);
      peer.on("open", () => {
        console.log("peeer open")
      })
      if (conn.peerId.length>1) {
        console.log(conn)
        try {
          for (let i=0; i<conn.peerId.length-1; i++) {
            let call =   peer.call(conn.peerId[i], localStream)
            handle(call)
          }
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
  }
  const handle = (call) => {
    console.log(call)
    call.on("stream", stream => {
      otherRef.current[index].current.srcObject = stream
      console.log("STREAM, ", index)
      index++
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
  const disconnect = () => {

  }
  return (
    <div className='bg-slate-200 w-fit flex flex-col mt-48 ml-32 '>

      <div className='flex flex-wrap'>
        <div className=' w-96 mr-16' >
          <MyVid reference={myRef} />
          <button onClick={() => muteMic()} className='btn'>mute Audio</button>
          <button onClick={() => muteVideo()} className='btn'>mute Video</button>
          <button onClick={() => disconnect()} className='btn'>Dicconnect</button>
        </div>
        <div className="divider-horizontal bg-black w-4"></div>
        {otherRef.current.map(reference => (
          <div className='w-96 ml-16' >
            <Vid reference={reference} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
