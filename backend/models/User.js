const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fathermail: { type: String, required: true, unique: true },
  fatherpassword: { type: String, required: true },
}, {
  timestamps: true
});

// Hash both password and fatherpassword before saving
UserSchema.pre('save', async function (next) {
  try {
    // Hash main password if modified
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    
    // Hash father password if modified
    if (this.isModified('fatherpassword')) {
      this.fatherpassword = await bcrypt.hash(this.fatherpassword, 10);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare main user password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to compare father password
UserSchema.methods.compareFatherPassword = async function (candidateFatherPassword) {
  return await bcrypt.compare(candidateFatherPassword, this.fatherpassword);
};

module.exports = mongoose.model("User", UserSchema);
