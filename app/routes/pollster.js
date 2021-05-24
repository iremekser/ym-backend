const router = require('express').Router();
// controllers
const pollsterController = require('../controllers/pollsterController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.post('/login', pollsterController.login);
router.get('/:id/surveys', checkAuth, pollsterController.surveys);

router.get('/:id', checkAuth, pollsterController.find);
router.put('/:id', checkAuth, pollsterController.update);
router.delete('/:id', checkAuth, pollsterController.delete);
router.post('/', checkAuth, pollsterController.create);
router.get('/', checkAuth, pollsterController.list);

module.exports = router;
