const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const env = require("../configs/dotenv");

const authController = {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const newUser = await User.create({ name, email, password });

      const SECRET_KEY = env.SECRET_KEY;

      const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.status(201).json({
        msg: "User successfully created.",
        user: { name: newUser.name, email: newUser.email },
        token, // token sent for testing purpose
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ msg: "User not found." });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }

      const SECRET_KEY = env.SECRET_KEY;

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("accessToken", token, {
        httpOnly: true,
      });

      return res
        .status(200)
        .json({ msg: "User logged is successfully." }, token);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
