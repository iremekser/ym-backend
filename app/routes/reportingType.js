const router = require('express').Router();
// controllers
const reportingTypeController = require('../controllers/reportingTypeController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.get('/:id', checkAuth, reportingTypeController.find);
router.put('/:id', checkAuth, reportingTypeController.update);
router.delete('/:id', checkAuth, reportingTypeController.delete);
router.post('/', checkAuth, reportingTypeController.create);
router.get('/', checkAuth, reportingTypeController.list);

module.exports = router;
