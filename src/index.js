require("dotenv").config();
const app=require("./server");
const connectDB=require("./db/database");
const bodyParser = require("body-parser");
const impuestoRoutes = require("./routes/impuestos.routes");
connectDB();


app.use(bodyParser.json());
app.use("/api/v1", impuestoRoutes);

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});