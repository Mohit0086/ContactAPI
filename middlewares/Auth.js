import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const isAuthenticate = async (req, res, next) => {
  const token = req.header('Auth'); // ✅ fixed header name
  
  if (!token) {
    return res.json({ message: "Not authorized, Please login first", status: false });
  }

  try {
    const decoded = jwt.verify(token, "$/@ABCD");
    let userId = decoded.userId;
    let finduser = await User.findById(userId); 
    
    if (!finduser) {
      return res.json({ message: "User not found", status: false });
    }
    
    req.userdata = finduser;
    next();
  } catch (err) {
    return res.json({ message: "Invalid token", status: false });
  }
};
