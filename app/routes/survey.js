const router = require('express').Router();
// controllers
const surveyController = require('../controllers/surveyController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.get('/:id/results', checkAuth, surveyController.results);
router.get('/:id/answers', checkAuth, surveyController.answers);

router.get('/:id', checkAuth, surveyController.find);
router.put('/:id', checkAuth, surveyController.update);
router.delete('/:id', checkAuth, surveyController.delete);
router.post('/', checkAuth, surveyController.create);
router.get('/', checkAuth, surveyController.list);



module.exports = router;
