const mongoose = require("mongoose")

const Rooms = new mongoose.Schema({
    free: {
        type: Boolean,
        default: true
    },
    id1: {
        type: String
    },
    id2: {
        type: String
    }
})
let Room
try {
    Room = mongoose.model("Room")
} catch {
   Room = mongoose.model("Room", Rooms)
}
export default Room