import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from 'dotenv'
dotenv.config();

// @description Update new password (only for defined usernames)
// @route POST /movies
// @access Private
/**Create POST */
/* REGISTER USER */
export const updatePassword = async (req, res) => {
  try {
    const {username, password} = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const {modifiedCount} = await User.updateOne({username},{password: passwordHash});
    console.log("modifiedCount:",modifiedCount );
    if(modifiedCount===1)
      res.status(200).json({message: "password updated!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
export const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

