import Room from '@/database/schema';
import connectToDB from './connectToDB';

const connect = async (req, res) => {
  const roomSizes ={"1v1": 2, "3v3": 6,}
  console.log("body", req.body)
  const {peerId, publicRoom, roomType} = req.body
  try {
    let room = await Room.findOne({ free: true, roomType: roomType });
    let result
    if (!room) {
      result = await Room.create({ free: true, peerId: [peerId], publicRoom: publicRoom, roomType: roomType});
    } else {
      result = await Room.findOneAndUpdate({ _id: room["_id"] }, {peerId: [...room.peerId, peerId], free: room.peerId.length+1>=roomSizes[roomType]?false: true}, {
        new: true,
        runValidators: true,
      })
    }
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default connect;