import express from "express";
import dotenv from "dotenv/config";
import { ConnectDB } from "./Config/db.js";
import router from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import jwt, { decode } from "jsonwebtoken";
import User from "./Model/UserModel.js";
import { authMiddelware } from "./MIddleware/authmiddlleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

//DB Connection
ConnectDB();

app.get("/", (req, res) => {
  res.send("Refresh Token");
});

app.use("/user", authMiddelware, router);

//! Protected Middelware
const VerifyController = async (req, res, next) => {
  const authHeader =  req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "token not founded" });
  }

  const token = authHeader.split(" ")[1];
  console.log("this token",token);

  jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invaild token" });
    }
    next(); 
  });
};

// Protected Routes
app.get("/profile", VerifyController, (req, res) => {
  res.json({ message: "Safe data" });
});


//! Verify and geting access token

app.post("/token", (req, res) => {
  const refereshtoken = req.cookies.refreshToken;
  console.log("This is key", refereshtoken);
  if (!refereshtoken)
    return res.status(401).json({ message: "No Refresh token found" });

  // verify refresh token
  jwt.verify(refereshtoken, process.env.REFRESH_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    let newAccesstoken = jwt.sign({ id: User._id }, process.env.ACCESS_KEY, {
      expiresIn: "15m",
    });
    res
      .status(200)
      .json({ message: "New access token genrated", newAccesstoken });
  });
});


//! Clear Refresh toekn when User log outs

app.post('/logout',(req,res)=>{
  res.clearCookie('refreshToken')
  res.send("log outedd")
})

app.listen(PORT, () => console.log(`Server Running at ${PORT}`));
