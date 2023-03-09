import connectDB from "@/database/connectDB";
import Cors from 'cors';

const cors = Cors({
  origin: 'https://elevinas123.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
    const connectToDB = async (req, res) => {
    await cors(req, res);
    await connectDB(process.env.MONGO_URI).catch(error => console.log(error))
    res.status(200).send("connected")
}

export default connectToDB