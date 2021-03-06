const router = require('express').Router();
// controllers
const mediaOrganTypeController = require('../controllers/mediaOrganTypeController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.get('/:id', checkAuth, mediaOrganTypeController.find);
router.put('/:id', checkAuth, mediaOrganTypeController.update);
router.delete('/:id', checkAuth, mediaOrganTypeController.delete);
router.post('/', mediaOrganTypeController.create);
router.get('/', mediaOrganTypeController.list);

module.exports = router;
