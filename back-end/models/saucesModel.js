const mongoose = require('mongoose');

const SaucesSchema = mongoose.Schema(

    {
        userId:{ type:String, require:true},

        manufacturer:{ type:String, required:true},

        description:{ type:String, require:true},

        mainPepper:{ type:String, require:true},

        imageUrl:{ type:String, require:true},

        heat:{ type:Number, require:true},

        likes:{ type:Number, require:true},

        dislikes:{ type:Number, require:true},

        usersLiked: [],

        usersDisliked: []

    }
);

const Sauce = mongoose.model('Sauce', SaucesSchema)

module.exports = { Sauce };