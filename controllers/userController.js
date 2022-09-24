const { User, Thought } = require('../models')

module.exports = {
    // Get all users
    getAllUsers(req, res) {
        User.find()
            .then((usersData) => res.json(usersData))
            .catch((err) => res.status(500).json(err))
    },
    // Get a single ID
    getSingleId(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '=__'
            })
            /* Excluding the version key from the response. */
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },
    updateUserById(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
    },
    deleteUserById(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((deletedUser) =>
                !deletedUser
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.status(200).json({ message: "User has been deleted!" })
            )
            .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(500).json(err))
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err))
    }
}