const Post = require('./posts-model')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    Post.find()
        .then( post => {
            res.status(200).json(post)
        })
        .catch( err => {
            res.status(500),json({error: "The posts information could not be retrieved." })
        })
} )

module.exports = router