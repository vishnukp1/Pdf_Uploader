const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userschema");
const validate = require("../validation/userValidation");


const createUser = async (req, res) => {
  const { name, password, email, phone } = req.body;

  try {
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      password: hashedPassword,
      phone,
      email,
    });

    await user.save();

    const token = jwt.sign({ username: user.username }, "user");


    res.status(201).json({ message: "User account registered successfully", data: user, token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the user", error: error.message });
  }
};


const loginUser = async (req, res) => {
  const { error, value } = validate.userValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }


const { email, password } = value;

  const user = await User.findOne({ email });
if (!user) {
  console.log("User not found for email:", email);
  return res.status(401).json({ error: "User not found" });
}

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ username: user.username }, "user");

  console.log(user);

  res.json({ message: "Login successful", token, id: user._id });
};

module.exports = {
    createUser,
    loginUser,
}