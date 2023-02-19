import { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

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
  const [id, setId] = useState(null);
  const myRef = useRef(null);
  const otherRef = useRef(null);
  let localStream = null;
  let remoteStream = null;
  const pc = new RTCPeerConnection(iceServers);
  useEffect(() => {
    const fetchConnection = async () => {
      try {
        const response = await fetch('/api/connect');
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
        if (!conn.free) {
          createOffer();
        }
      }
    };

    init();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    
    socket.on('connect', () => {
    });

    socket.on(`${id}-offer`, async (offer) => {
      createAnswer(offer);
    });

    socket.on(`${id}-answer`, (answer) => {
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
        socket.emit('offer', [id, pc.localDescription]);
      }
    };
  };

  const createAnswer = async (offer) => {
    await getMediaStream();
    await pc.setRemoteDescription(offer);
    let answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    pc.onicecandidate = async (event) => {
      if (!event.candidate) {
        socket.emit('answer', [id, pc.localDescription]);
      }
    };
  };

  const addAnswer = async (answer) => {
    await pc.setRemoteDescription(answer);
  };

  const getMediaStream = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    
    myRef.current.srcObject = localStream;
    otherRef.current.srcObject = remoteStream;
  };


  return (
    <div className='bg-slate-200 w-full flex flex-col mt-32 ml-32'>
      <div>
        {`Theme: World is Goood`}
      </div>
      <div className='flex'>
        <div className=' w-96 m-16' >
          <video ref={otherRef} autoPlay playsInline  className=" "/>
        </div>
        <div className=' m-16 w-96 ' >
          <video ref={myRef} autoPlay playsInline className="" />
        </div>
      </div>
    </div>
  );
};

export default Videos;
