const router = require('express').Router();
// controllers
const mediaOrganController = require('../controllers/mediaOrganController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.get('/:id', mediaOrganController.find);
router.put('/:id', checkAuth, mediaOrganController.update);
router.delete('/:id', checkAuth, mediaOrganController.delete);
router.post('/', checkAuth, mediaOrganController.create);
router.get('/', checkAuth, mediaOrganController.list);

module.exports = router;
