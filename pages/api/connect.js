import Room from '@/database/schema';
import connectToDB from './connectToDB';

const connect = async (req, res) => {
  console.log("id", req.body)
  try {
    let room = await Room.findOne({ free: true });
    let result
    if (!room) {
      result = await Room.create({ free: true, id1: req.body});
    } else {
      result = await Room.findOneAndUpdate({ _id: room["_id"] }, {id2: req.body,  free: false}, {
        new: true,
        runValidators: true,
      })
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default connect;