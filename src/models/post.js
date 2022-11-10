const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        updateAt: {
            type: Date,
            
        },


    },
    { timestamps: true }
);

postSchema.plugin(mongoosePaginate);

module.exports = postSchema;

