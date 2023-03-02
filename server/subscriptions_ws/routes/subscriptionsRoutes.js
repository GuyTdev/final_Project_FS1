import express from "express";
import * as subscriptionsBL from '../controllers/subscriptionsBL.js'
const router = express.Router();

router.post('/', subscriptionsBL.addMovieToSubscription);
router.get('/', subscriptionsBL.getSubscriptions);
router.get('/:id', subscriptionsBL.getSubscription);
router.get('/bymember/:member_id', subscriptionsBL.getSubscriptionByMemberId);
// router.get('/:member_id', subscriptionsBL.getMoviesArrayByMemberId);
router.delete('/:id', subscriptionsBL.deleteSubscription);

export default router;