import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.URI || "mongodb://localhost:27017/Autentication"

console.log(URI);
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const authSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique:true

  },
  name: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,

  }
});

//! Hashing Password using mongoose pre(middelware) and bcrypt  library 
authSchema.pre('save',async function(){ 
  const preson = this
  // hash password when password is modifed or is it new
  if(!preson.isModified('password')) return  //? isModified is inbiulit function that checks password is modifed or not
    try {
      // genrating salt
      const salt = await bcrypt.genSalt(10)

      // hash password
      const hashPassword = await bcrypt.hash(preson.password,salt)

      // override the hash pass with plain pass
      preson.password = hashPassword
  } catch (error) {
      return next(error)
    }
})


//! Password Compare
authSchema.methods.comparePassword = async function(candidatePass){
  try {
    //using bcrypt to compare provided password
    const isMatch = await bcrypt.compare(candidatePass,this.password) 
    return isMatch
  } catch (error) {
    throw error
  }
}

// Create model
const Auth = mongoose.model("Auth", authSchema);

export default Auth;


