var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-as-promised");
var uniqueValidator = require("mongoose-unique-validator");

var watchlistSchema = new Schema({
    //title
    //private: bool - default to true
    //allowComment: default to false
    //comments: []
});

var userSchema = new Schema({
    //name
    name: {
        type: String,
        required: [true, "Please enter a name!"],
        minlength: [2, "Please enter an actual name."]
    },
    //email - also user name
    email: {
        type: String,
        required: [true, "Email address is required."],
        unique: [true, "This user already exists!"],
        validate: {
            validator: function (value) {
                return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(value);
            },
            message: "Please enter a valid email address."
        }
    },
    //password
    password: {
        type: String,
        required: [true, "Enter a password!"],
        minlength: [8, "Password must be at least 8 characters."],
        maxlength: 32,
    },
    // description
    desc: {
        type: String
    },
    // //reviews
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
    watchlist: [{ type: Schema.Types.ObjectId, ref: 'Watch' }]
    // //ratings - []
    // //picture?
    // ratings: {
    //     //movie id
    //     //rating: number
    // },
}, { timestamps: true });

userSchema.pre("save", function (next) {
    console.log("============= user trying to save===============");

    //bcrypt password
    bcrypt.hash(this.password, 10)
        .then(hashedPassword => {
            console.log("=============hashing=================");
            this.password = hashedPassword;
            next();
        }).catch(error => {
            next();
        });
});

userSchema.plugin(uniqueValidator, { message: "This email is already registered. Try logging in." });
mongoose.model("User", userSchema);