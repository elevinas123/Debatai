const mongoose = require("mongoose")
const PeerIdSchema = new mongoose.Schema({ type: String });
const Rooms = new mongoose.Schema({
    free: {
        type: Boolean,
        default: true
    },
    peerId: [String],
    roomType: {
        type: String
    },
    publicRoom: {
        type: Boolean,
        default: true
    }
})
let Room
try {
    Room = mongoose.model("Room")
} catch {
   Room = mongoose.model("Room", Rooms)
}
export default Room