require("dotenv").config();
const app=require("./server");
const connectDB=require("./db/database");
const bodyParser = require("body-parser");
const impuestoRoutes = require("./routes/impuestos.routes");
const cors=require("cors");
connectDB();
app.use(cors());
app.get("/",(req,res)=>{res.send("Hello World")})
app.use(bodyParser.json());
app.use("/api/v1", impuestoRoutes);

const PORT=process.env.PORT||3000
const ip= process.env.IP_AWS ||localhost
app.listen(PORT,()=>{
    console.log(`server is running on http://${ip}:${PORT}`)
});