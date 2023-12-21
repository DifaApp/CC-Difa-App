const express = require('express');
const router = express.Router();
const Validator = require('fastest-validator');
const { Recommendation } = require('../models');

const v = new Validator();

// Get all recommendations
router.get('/', async (req, res) => {
  try {
    const recommendations = await Recommendation.findAll();
    return res.json({
      error: false,
      message: 'Recommendations fetched successfully',
      recommendations,
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Get a specific recommendation by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const recommendation = await Recommendation.findByPk(id);

    if (!recommendation) {
      return res.status(404).json({ error: true, message: 'Recommendation not found' });
    }

    return res.json({
      error: false,
      message: 'Recommendation fetched successfully',
      recommendation,
    });
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Create a new recommendation
router.post('/', async (req, res) => {
  const schema = {
    title: 'string',
    description: 'string|optional',
    url_video: 'string',
    url_image: 'string',
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({ error: true, message: 'Validation failed', details: validate });
  }

  try {
    const recommendation = await Recommendation.create(req.body);
    return res.json({ error: false, message: 'Recommendation created successfully', recommendation });
  } catch (error) {
    console.error('Error creating recommendation:', error);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Update a recommendation by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    let recommendation = await Recommendation.findByPk(id);

    if (!recommendation) {
      return res.status(404).json({ error: true, message: 'Recommendation not found' });
    }

    const schema = {
      title: 'string|optional',
      description: 'string|optional',
      url_video: 'string|optional',
      url_image: 'string|optional',
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({ error: true, message: 'Validation failed', details: validate });
    }

    console.log('Before update:', recommendation.toJSON());

    let updatedRecommendation = await recommendation.update(req.body);

    console.log('After update:', updatedRecommendation.toJSON());

    return res.json({ error: false, message: 'Recommendation updated successfully', recommendation: updatedRecommendation });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Delete a recommendation by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const recommendation = await Recommendation.findByPk(id);

    if (!recommendation) {
      return res.status(404).json({ error: true, message: 'Recommendation not found' });
    }

    await recommendation.destroy();

    return res.json({ error: false, message: 'Recommendation deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
