var mongoose =require ('mongoose');
//Todo Model
var Todo = mongoose.model('Todo', {
  text:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed:{
    type: String,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});
module.exports = {Todo};
