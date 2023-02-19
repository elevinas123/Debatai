import createPeerConnection from './createPeerCon';
let createOffer = async (vid1) => {

  createPeerConnection(vid1)
  let offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)
  return offer
}
let createAnswer = (offer) => {
  /*
  createPeerConnection("answer")
  const {sdpOffer} = offer
  await peerConnection.setRemoteDescription(sdpOffer)
  
  let answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)
  return answer
  */
  return {sdpAnswer: {msg: "not answer"}, free: false}


}



const connectRTC = async (vid1) => {
  const offer = createOffer(vid1)
  console.log("offer", offer)
  return response
  
}




export default connectRTC
