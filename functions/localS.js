export default  async function localS() {
    const a = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
    return a


}