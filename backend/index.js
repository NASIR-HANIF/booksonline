import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
// import path, { dirname } from "path";


// import {fileURLToPath} from 'url'

//configure env
dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json({extended : true}))
app.use(express.urlencoded({extended : true}))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);



//  app.use(express.static(path.join(__dirname , "/client/build")))


//rest api
// app.get("*", function(req, res){
//   res.sendFile(path.join(__dirname , "/client/build/index.html"),function(error){
//     console.log(__dirname)
//     res.status(500).send(error)
//   })
// });

//PORT
const PORT = process.env.PORT || 3000;




//Connect to the database before listening
connectDB()

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  )
})


/*
//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    )
  })
})

*/

