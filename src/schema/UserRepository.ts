const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
    trim: true,
    maxlenght: [20, "First name cannot be more than 20 characters"],
  },

  lastName: {
    type: String,
    required: [true, "Please add a last name"],
    trim: true,
    maxlenght: [20, "Last name cannot be more than 20 characters"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please add a email"],
  },

  fileName: {
    type: String,
  },
});

const UserRepository =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default UserRepository;
