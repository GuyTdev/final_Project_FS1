import express from "express";
import * as subscriptionsBL from '../controllers/subscriptionsBL.js'
const router = express.Router();

router.post('/', subscriptionsBL.addMovieToSubscription);
router.get('/', subscriptionsBL.getSubscriptions);
router.get('/:id', subscriptionsBL.getSubscription);
router.delete('/:id', subscriptionsBL.deleteSubscription);

export default router;