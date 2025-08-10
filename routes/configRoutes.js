const router = require('express').Router();
const configController = require('../controllers/configController');

router.get('/', configController.getConfigs);
router.put('/:id', configController.updateConfig);
router.post('/', configController.createConfig);
router.delete('/:id', configController.deleteConfig);

module.exports = router;