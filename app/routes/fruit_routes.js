// Require necessary NPM Packages
const express = require('express');

// Pull in Mongoose model for Fruit
const Fruit = require('../models/fruit');
// Instantiate a router (mini app that only handle routes)
const router = express.Router();

/** 
 * Action:         INDEX
 * Method:         GET
 * URI:            /fruits
 * Description: Get all Fruits
*/
router.get('/fruits', (req, res) => {
    Fruit.find({}, (error, fruits) => {
        // Return all fruits 
        if (!error) {
            res.status(200).json({ fruits: fruits });
        } else {
            // if there area any errors
            res.status(500).json({ error: error })
        }
    });
});

/** 
 * Action:         CREATE
 * Method:         POST
 * URI:            /fruits
 * Description: Create new Fruit
*/
router.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, fruit) => {
        if (!error) {
            res.status(201).json({ fruit })
        } else {
            res.status(500).json({ error: error })
        }
    })
});

/** 
 * Action:         SHOW
 * Method:         GET
 * URI:            /fruits/12
 * Description: Get one fruit by ID
*/
router.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (error, fruit) => {
        if (!error) {
            // return fruit if exist
            if (fruit) {
                res.status(200).json({ fruit: fruit });
            } else {
                // if there is no fruit with a matching id
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided id doesn\'t match any document'
                    }
                })
            }
        } else {
            res.status(500).json({ error: error });
        }
    })
});

/** 
 * Action:         UPDATE
 * Method:         PATCH
 * URI:            /fruits/:id
 * Description: Update fruit by id
*/
router.patch('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (error, fruit) => {
        if (!error) {
            if (fruit) {
                fruit.update(req.body, (error, fruit) => {
                    if (!error) {
                        res.status(204).end();
                    } else {
                        res.status(500).json({ error: error })
                    }
                })
            } else {
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided id doesn\'t match any document'
                    }
                })
            }
        } else {
            res.status(500).json({ error: error })
        }
    })
});
/** 
 * Action:         DESTROY
 * Method:         DELETE
 * URI:            /fruits/:id
 * Description: Delete a fruit by id
*/
router.delete('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (error, fruit) => {
        if (!error) {
            if (fruit) {
                fruit.remove((error, fruit) => {
                    if (!error) {
                        res.status(204).end();
                    } else {
                        res.status(500).json({ error: error })
                    }
                })
            } else {
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided id doesn\'t match any document'
                    }
                })
            }
        } else {
            res.status(500).json({ error: error })
        }
    })
})

/////////////////////////
/** 
* Action:         
 * Method:         GET
 * URI:            /fruits/seed
 * Description: Seed data to database
*/
router.get('/fruits/seed', (req, res) => {
    Fruit.insertMany([
        {
            name: 'grapefruit',
            color: 'pink',
            readyToEat: true
        },
        {
            name: 'grape',
            color: 'purple',
            readyToEat: false
        },
        {
            name: 'avocado',
            color: 'green',
            readyToEat: true
        }
    ], (error, fruits) => {
        if (!error) {
            res.status(200).json({ fruits: fruits });
        } else {
            res.status(500).json({ error: error })
        }
    });
})

module.exports = router;