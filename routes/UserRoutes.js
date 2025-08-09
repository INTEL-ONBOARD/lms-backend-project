const router = require('express').Router();
const UserController = require('../controllers/UserController');

route.get('/', UserController.getUsers);
router.post('/users', UserController.createuser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


module.exports = router;

