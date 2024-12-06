// models/Response.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: 'Form' },
  answers: [{
    questionId: { type: Schema.Types.ObjectId, ref: 'Form.questions' },
    answer: { type: String },
  }],
  submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
