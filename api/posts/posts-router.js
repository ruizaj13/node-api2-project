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
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            !post.length ? res.status(404).json({ message: "The post with the specified ID does not exist."}) 
            : 
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved." })
        })
})

router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            (!req.body.title || !req.body.contents) ? res.status(400).json({message:'oops'}) : res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })
})

router.put('/:id', (req, res) => {
    Post.update(req.params.id, req.body)
        .then(post => {
            !post ? res.status(404).json({message: "The post with the specified ID does not exist."}) : res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be updated"})
        })
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(post => {
            !post.length ?  res.status(404).json({ message: "The post with the specified ID does not exist."}) 
            : 
            res.status(200).json({message:'post is deleted'})
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"})
        })
})



module.exports = router