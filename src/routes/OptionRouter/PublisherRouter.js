const express =require ("express")
const router= express.Router()
const PublisherController=require('../../controllers/OptionController/PublisherController')

router.post('/create', PublisherController.createPublisher)
router.put('/update/:id', PublisherController.updatePublisher)
router.get('/get-detail/:id',PublisherController.getDetailPublisher)
router.delete('/delete/:id',PublisherController.deletePublisher)
router.get('/get-all',PublisherController.getAllPublisher)

module.exports=router