const router = require('express').Router();

const {
    getAllUsers,
    getSingleId,
    createNewUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend
} = require('../../controllers/userController.js');

router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);


router
    .route('/:userId')
    .get(getSingleId)
    .put(updateUserById)
    .delete(deleteUserById);


router
   .route('/:userId/friends/:friendId')
   .post(addFriend)
   .delete(removeFriend);


module.exports = router;