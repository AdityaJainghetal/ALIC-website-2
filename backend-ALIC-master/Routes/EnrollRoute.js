const express = require('express');
const enquiryController = require('../Controller/EnrollController');

const router = express.Router();

router.post('/:id', enquiryController.EnquiryProduct);
router.get('/alldisplay', enquiryController.EnquiryDisplayAll);
router.get("/editdisplay", enquiryController.editDisplay);
router.post("/editsave/:id", enquiryController.editDataSave);
router.get('/getproducts/:id', enquiryController.EnquiryGetProduct);
router.delete('/alldelete/:id', enquiryController.EnquiryDelete);


module.exports = router;