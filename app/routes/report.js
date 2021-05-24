const router = require('express').Router();
// controllers
const reportController = require('../controllers/reportController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.get('/:id', checkAuth, reportController.find);
router.put('/:id', checkAuth, reportController.update);
router.delete('/:id', checkAuth, reportController.delete);
router.post('/', checkAuth, reportController.create);
router.get('/', checkAuth, reportController.list);

module.exports = router;
