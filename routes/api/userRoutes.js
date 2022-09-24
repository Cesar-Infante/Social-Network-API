const router = require('express').Router();

const { getAllUsers, getSingleId, postNewUser, updateById, deleteById } = require('../../controllers/userController.js');



module.exports = router;