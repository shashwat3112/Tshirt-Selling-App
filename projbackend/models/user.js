var mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema } = mongoose;  
const { v4: uuidv4 } = require('uuid');
const { uuid } = require('uuidv4');

  var userSchema = new Schema({
    name: {
        type: String,
        requied: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,   
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
  },{timestamps: true}
  );

  userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuid();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
      });

  userSchema.methods = {
      authenticate: function(plainpassword){
          return this.securePassword(plainpassword) === this.encry_password;
      },
      securePassword: function(plainpassword){
          if(!plainpassword) return "";
          try {
              return crypto.createHmac('sha256', this.salt)
              .update(plainpassword)
              .digest('hex');
          } catch (error) {
              
          }
      }
  }

  module.exports = mongoose.model("User",userSchema)