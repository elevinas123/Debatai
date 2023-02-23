import { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Vid from './Vid';
import Line from './Line';
import async from './../functions/localS';

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


    otherRef.current.srcObject = remoteStream;
    myRef.current.srcObject = localStream;
    console.log(remoteStream)
  };


  return (
    <div className='bg-slate-200 w-fit flex flex-col mt-48 ml-32 '>
      
      <div className='flex'>
        <div className=' w-96 mr-16' >
          <Vid reference={myRef}/>
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
