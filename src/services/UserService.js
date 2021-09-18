const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = class UserService {
  static async login(data) {
    try {
      const { email, password } = data;

       // Validate user input
      if (!(email && password)) {
        return { status: 400, res: "All input is required" };        
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          {
            user_id: user._id,
            email: email,
            scope: {
              canViewPersonalData: true,
              canEditPersonalData: false,
              canViewSensitiveData: true,
              canEditSensitiveData: true
            }
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
          // save user token
        user.token = token;  
        
        return { status: 200, res: user }    
      }
      return { status: 400, res: "Invalid Credentials" }
    } catch (error) {
      console.log(error);
    }
  }

  static async register(data) {
    try {
      // Get user input
      const { email, password } = data;
  
      // Validate user input
      if (!(email && password)) {
        return { status: 400, res: "All input is required" };    
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return { status: 409, res: "User Already Exist. Please Login" };    
      }
  
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      return { status: 201, res: user };   
    } catch (err) {
      console.log(err);
    }
  }
}