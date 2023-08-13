//Définition d'un model 
const mongoose = require ('mongoose');
const validator = require('validator');

const User = new mongoose.model( 'User', {
  username: {
    type: String,
    required: true,
    validate(v){
      if (!validator.isUsername(v)) throw new Error('Username non valide!');
    }
  },
  email: {
    type: String,
    required: true,
    validate(v){
      if (!validator.isEmail(v)) throw new Error('E-mail non valide!');
    }
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = User;