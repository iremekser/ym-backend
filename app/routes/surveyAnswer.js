const router = require('express').Router();
// controllers
const surveyAnswerController = require('../controllers/surveyAnswerController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.get('/:id', checkAuth, surveyAnswerController.find);
router.put('/:id', checkAuth, surveyAnswerController.update);
router.delete('/:id', checkAuth, surveyAnswerController.delete);
router.post('/', checkAuth, surveyAnswerController.create);
router.get('/', checkAuth, surveyAnswerController.list);

module.exports = router;
