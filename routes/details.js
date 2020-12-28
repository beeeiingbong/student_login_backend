const express=require('express')
const router=express.Router()

const detailsController = require('../controllers/details')

router.route('/')
.post(detailsController.postDetails)

router.route('/:detailsId')
.get(detailsController.getDetails)
.put(detailsController.updateDetails)
.delete(detailsController.deleteDetails)


module.exports = router;

