// models/Form.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    headerImage: { type: String }, // Optional, can store the base64 string or URL
    questions: [{
      type: { type: String, required: true },
      content: { type: String, required: true },
      options: [String],
      correctAnswer: [String],
      image: { type: String }, // Optional image for the question
    }],
    created_at: { type: Date, default: Date.now }
  });
  

module.exports = mongoose.model('Form', formSchema);
