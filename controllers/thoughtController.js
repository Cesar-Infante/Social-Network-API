const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => {
                res.json(thought)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                )
                    .then((user) =>
                        !user
                            ? res.status(404).json({ message: "No user found!" })
                            : res.json(user)
                    )
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found that matches taht id to update!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedthought) =>
                !deletedthought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.status(200).json({ message: "thought has been deleted!" })
            )
            .catch((err) => res.status(500).json(err))
    },
    createReaction(req, res) {
        
    },
    deleteReaction(req, res) {

    }
}



