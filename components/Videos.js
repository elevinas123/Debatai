import { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Vid from './Vid';

import { v4 as uuidv4 } from 'uuid';
const socket = io();

const iceServers = {
  iceServers: [
    {
      urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const Videos = (props) => {
  const myRef = useRef(null);
  const otherRef = useRef(null);
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  let [localStream, setLocalStream] = useState(null)
  let [remoteStream, setRemoteStream] = useState(null)
  const pc = new RTCPeerConnection(iceServers);
  const [peerId, setPeerId] = useState(uuidv4())
  const [id, setId] = useState(null)
  const [cameraMuted, setCameraMuted] = useState(false)
  const [micMuted, setMicMuted] = useState(true)
  useEffect(() => {
    const fetchConnection = async () => {
      try {
        const response = await fetch('/Debatai/api/connect', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              peerId: peerId,
              publicRoom: true,
              roomType: "1v1"
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
      const conn = await fetchConnection();
      if (conn) {
        setId(conn._id);
        await socketInitializer();
        if (conn.peerId.length>1) {
          createOffer();
        }
      }
    };

    init();
  }, []);

  const socketInitializer = async () => {
    await fetch('/Debatai/api/socket');
    
    socket.on('connect', () => {
    });

    socket.on(`${id}-offer`, async (obj) => {
      console.log("offer", obj)
    let [offer, offerId] = obj
      createAnswer(offer, offerId);
    });

    socket.on(`${peerId}-answer`, (answer) => {
      console.log("here")
      addAnswer(answer);
    });
  };

  const createOffer = async () => {
    await getMediaStream();
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    pc.onicecandidate = async (event) => {
      if (event.candidate) {
      } else {
        console.log(pc.localDescription)
        socket.emit('offer', [id, peerId, pc.localDescription ]);
      }
    };
  };

  const createAnswer = async (offer, offerId) => {
    await getMediaStream();
    await pc.setRemoteDescription(offer);
    let answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    pc.onicecandidate = async (event) => {
      if (!event.candidate) {
        socket.emit('answer', [id, offerId, pc.localDescription]);
      }
    };
  };

  const addAnswer = async (answer) => {
    await pc.setRemoteDescription(answer);
  };

  const getMediaStream = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(localStream)
    remoteStream = new MediaStream()
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
       remoteStream.addTrack(track)
      });
    };


    otherRef.current.srcObject = remoteStream;
    myRef.current.srcObject = localStream;
  };
  const handleMicMuteToggle = () => {
    localStream.getAudioTracks()[0].enabled = !micMuted;
    setMicMuted(!micMuted);
  };
  
  const handleCameraMuteToggle = () => {
    setCameraMuted(!cameraMuted);
    localStream.getVideoTracks()[0].enabled = !cameraMuted;
  };
  const handleDisconnect = () => {
    setCameraMuted(!cameraMuted);
    localStream.getVideoTracks()[0].enabled = !cameraMuted;
  };


  return (
    <div>
      <div className='bg-slate-200  flex flex-col mt-16 ml-16 h-3/4'>
        <div className='bg-green-400 h-16 text-black font-bold text-center align-middle'>Ar žmonės geri?</div>
        <div className='flex flex-row mt-48 ml-32'>
          <Vid reference={myRef}/>
          <div className="divider divider-horizontal ">VS</div>
          <Vid reference={otherRef}/>
        </div>  
      <div className='flex ml-32'>
        <button className='btn btn-primary m-4' onClick={handleMicMuteToggle}>Mute Your Mic</button>
        <button className='btn btn-primary m-4' onClick={handleCameraMuteToggle}>Disable Video</button>
        <button className='btn btn-primary m-4' onClick={handleCameraMuteToggle}>Disconnect</button>
      </div>
    </div>

    </div>
  );
};

export default Videos;
