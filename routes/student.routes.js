const {Router} = require('express')
const { getAllStudent, singleStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/student.controllers')
const router = Router()

router.get('/', getAllStudent)
router.get('/:id', singleStudent)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)


module.exports = router