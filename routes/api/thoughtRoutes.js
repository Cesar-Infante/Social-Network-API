const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

router
    .route('/')
    .get(getThoughts)
    .post(createThought);

router
    .route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

router
module.exports = router