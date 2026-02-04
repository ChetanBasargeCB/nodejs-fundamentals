import express from "express";
import dotenv from "dotenv/config";
import { ConnectDB } from "./Config/db.js";
import router from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import User from "./Model/UserModel.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

//DB Connection
ConnectDB();

app.get("/", (req, res) => {
  res.send("Refresh Token");
});

app.use("/user", router);

//! Verify and geting access token 
app.post("/token",  (req, res) => {
  const refereshtoken = req.cookies.refreshToken;
  console.log("This is key",refereshtoken);
  if (!refereshtoken)
    return res.status(401).json({ message: "No Refresh token found" });
 
  // verify refresh token
  jwt.verify(refereshtoken, process.env.REFRESH_KEY,  (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    let newAccesstoken =  jwt.sign({ id: User._id }, process.env.ACCESS_KEY, {
      expiresIn: "15min",
    });
  res.status(200).json({message:"New access token genrated",newAccesstoken})

  });

});

app.listen(PORT, () => console.log(`Server Running at ${PORT}`));
