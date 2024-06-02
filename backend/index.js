import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";


//configure env
dotenv.config();


//databse config
connectDB();

//rest object
const app = express();

// Enable CORS for a specific origin
const corsOptions = {
  origin: ["*",'https://booksonline-server.vercel.app/',"booksonline-server-ftjoig899-nasir-hanifs-projects.vercel.app"],
  credentials: true,
 
};



//middelwares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json({extended : true}))
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);



//PORT
const port = process.env.PORT || 3001;


/*
app.listen(port, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan
      .white
  )
})

*/


//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan
        .white
    )
  })
})



