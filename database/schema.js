const mongoose = require("mongoose")

const Rooms = new mongoose.Schema({
    free: {
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