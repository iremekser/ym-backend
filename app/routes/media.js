const router = require('express').Router();
// controllers
const mediaController = require('../controllers/mediaController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.get('/:id', checkAuth, mediaController.find);
router.put('/:id', checkAuth, mediaController.update);
router.delete('/:id', checkAuth, mediaController.delete);
router.post('/', checkAuth, mediaController.create);
router.get('/', mediaController.list);

module.exports = router;
