const router = require('express').Router()
const controller = require('../controllers')
const connection = require('../database')

router.get('/employees', controller.getEmployees)
router.get('/employees/:id', controller.getEmployeeByID)
router.post('/employees', controller.addEmployee)
router.put('/employees/:id', controller.editEmployee)
router.delete('/employees/:id', controller.deleteEmployee)

router.post('/reverse', controller.reverse)
router.post('/fibonacci', controller.fibonacci)
router.post('/combination', controller.combination)

module.exports = router