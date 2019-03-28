var mongoose = require('mongoose')

// schema
var trainingDateSchema = mongoose.Schema({
	solutionName:{type:String, required:true},
	startDate:{type:String},
	endDate:{type:String},
	title:{type:String},
	name:{type:String},
	time:{type:String},
	place:{type:String},
	period:{type:String},
	createdAt:{type:Date, default:Date.now},
	updatedAt:{type:Date}
},{
	toObject:{virtuals:true}
});

// virtuals
trainingDateSchema.virtual('createdDate')
.get(function(){
	return getDate(this.createdAt);
});

trainingDateSchema.virtual('createdTime')
.get(function(){
	return getDate(this.createdAt);
});

trainingDateSchema.virtual('updatedDate')
.get(function(){
	return getDate(this.updatedAt);
});

trainingDateSchema.virtual('updatedTime')
.get(function(){
	return getDate(this.updatedAt);
});

// model & export
var TrainingDate = mongoose.model('trainingdate', trainingDateSchema);
module.exports = TrainingDate;

//function 
function getDate(dateObj) {
	if(dateObj instanceof Date)
		return dateObj.getFullYear() + '-' + get2digits(dateObj.getMinutes()) + ':' + get2digits(dateObj.getSeconds());
}

function getTime(dateObj) {
	if(dateObj instanceof Date)
		return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes()) + ':' + get2digits(dateObj.getSeconds());
}

function get2digits(num) {
	return ('0' + num).slice(-2);
}