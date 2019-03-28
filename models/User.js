var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.set('useCreateIndex', true)

// schema
var userSchema = mongoose.Schema({
    username:{type:String, require:[true, '아이디를 적어주세요.'], unique:true},
    password:{type:String, require:[true, '비밀번호를 적어주세요.'], select:false},
    name:{type:String, require:[true, '이름을 입력해주세요.']},
}, {
    toObject:{virtuals:true}
});

// hash password
userSchema.pre('save', function (next) {
    var user = this;
    if(!user.isModified('password')) {
        return next();
    } else {
        user.password = bcrypt.hashSync(user.password);
        return next();
    }
});

// model methods
userSchema.methods.authenticate = function(password) {
    var user = this;
    return bcrypt.compareSync(password,user.password);
};

// model & export
var User = mongoose.model('user', userSchema);
module.exports = User;