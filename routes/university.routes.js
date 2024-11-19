const {Router} = require('express')
const { getAllUniversity, createUniversity, updateUniversity, deleteUniversity, singleUniversity } = require('../controllers/university.controllers')
const router = Router()

router.get('/', getAllUniversity)
router.get('/:id', singleUniversity)
router.post('/', createUniversity)
router.put('/:id', updateUniversity)
router.delete('/:id', deleteUniversity)


module.exports = router