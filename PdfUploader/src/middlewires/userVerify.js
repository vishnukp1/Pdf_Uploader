// multi-tenant or role-based system.

const userShema=require("../models/userschema")
const verifyUser = async (req, res, next) => {
  
    const userId = req.headers['x-user-id']; 
    const user = await userShema.findById(userId);
  
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
  
    req.user = user;
    next();
  };

  module.exports = verifyUser; 