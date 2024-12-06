// routes/form.js
const express = require('express');
const Form = require('../models/Form');
const Response = require('../models/Response');
const router = express.Router();

// Route to create a form
// router.post('/create', async (req, res) => {
//   const { title, description, headerImage, questions } = req.body;
//   console.log("line 10",req.body)
//   try {
//     const form = new Form({ title, description, headerImage, questions });
//     await form.save();
//     res.status(201).json({ message: 'Form created successfully', formId: form._id });
//   } catch (err) {
//     res.status(400).json({ error: 'Error creating form' });
//   }
// });


router.post('/create', async (req, res) => {
    const { title, description, headerImage, questions } = req.body;
    // console.log("line 10", req.body);

    // Validate questions array
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Questions array is required' });
    }

    for (const question of questions) {
      if (!question.type || !question.content || question.content.trim() === '') {
        return res.status(400).json({ error: 'Each question must have a type and content' });
      }
    }

    // console.log('lineadsfasf 35')
    try {
      const form = new Form({ title, description, headerImage, questions });
      await form.save();
      res.status(201).json({ message: 'Form created successfully', formId: form._id });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(400).json({ error: 'Error creating form' });
    }
});


// Route to save responses
router.post('/submit', async (req, res) => {
  const { formId, answers } = req.body;
  try {
    const formResponse = new Response({ formId, answers });
    await formResponse.save();
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error submitting response' });
  }
});

// Route to get form by ID (for preview/fill)
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching form' });
  }
});

module.exports = router;
