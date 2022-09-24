const router = require('express').Router();

const { getAllUsers, getSingleId, createNewUser, updateUserById, deleteUserById } = require('../../controllers/userController.js');



module.exports = router;