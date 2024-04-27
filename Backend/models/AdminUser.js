const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
},{

  collection: 'admin_user'
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
