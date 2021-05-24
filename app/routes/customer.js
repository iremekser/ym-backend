const router = require('express').Router();
// controllers
const customerController = require('../controllers/customerController');

// middleware
const checkAuth = require('../controllers/middleware/checkAuth');

router.put('/follow-media-organ', checkAuth, customerController.followMediaOrgan);
router.put('/unfollow-media-organ', checkAuth, customerController.unfollowMediaOrgan);

router.get('/me', checkAuth, customerController.getMe);
router.get('/me/feed', checkAuth, customerController.getMeFeed);
router.get('/me/surveys', checkAuth, customerController.getMeSurveys);

router.get('/:id', checkAuth, customerController.find);
router.put('/:id', checkAuth, customerController.update);
router.delete('/:id', checkAuth, customerController.delete);
router.post('/', checkAuth, customerController.create);
router.get('/', checkAuth, customerController.list);

router.get('/:id/medias', checkAuth, customerController.listMedias);
router.get('/:customerId/reports', checkAuth, customerController.listReports);

router.put('/:id/change-period', checkAuth, customerController.changePeriod);

module.exports = router;
