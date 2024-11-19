const {Router} = require('express')
const { getAllFaculty, singleFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../controllers/faculty.controllers')
const router = Router()

router.get('/', getAllFaculty)
router.get('/:id', singleFaculty)
router.post('/', createFaculty)
router.put('/:id', updateFaculty)
router.delete('/:id', deleteFaculty)


module.exports = router