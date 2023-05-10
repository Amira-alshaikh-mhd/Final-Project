const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  },
  phone: {
    type: String,
    required: true
  }
}, { timestamps: true });

UserSchema.statics.isEmailTaken = async function(email) {
    const user = await this.findOne({ email });
    return !!user;
  };


const User = mongoose.model('User', UserSchema);

module.exports = User;
