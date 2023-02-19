import connectDB from "@/database/connectDB";

const connectToDB = async (req, res) => {
    await connectDB(process.env.MONGO_URI).catch(error => console.log(error))
    res.status(200).send("connected")
}

export default connectToDB