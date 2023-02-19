let servers = {
    iceServer: {
        urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"]
    }
}

let createPeerConnection = async (localStream) => {
    const peerConnection = new RTCPeerConnection(servers)

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream)
    });

    peerConnection.ontrack = async (event) => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            document.getElementById().value = JSON.stringify(peerConnection.localDescription)
            
        }
    }
}   
export default createPeerConnection