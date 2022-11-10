const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");

const usersSchema = mongoose.Schema(
  {
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
    //the database default is active because there is no verification email
    // status: {
    //   type: String,
    //   enum: ["Active", "Pending", "Suspended"],
    //   default: "Pending",
    //   required: true,
    // },
  },
  { timestamps: true }
);

usersSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(
    this.password,
    Number(process.env.BCRYPT_SALT)
  );

  next();
});

//hide password hash from response
usersSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});

usersSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

usersSchema.plugin(mongoosePaginate);

module.exports = usersSchema;
