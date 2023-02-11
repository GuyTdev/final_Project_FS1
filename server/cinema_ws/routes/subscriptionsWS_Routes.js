import express from "express";
import * as subscriptionsWS_BL from '../controllers/subscriptionsWS_BL.js'
const router = express.Router();

router.post('subscriptions', subscriptionsWS_BL.addMovieToSubscription);
router.get('subscriptions', subscriptionsWS_BL.getSubscriptions);
router.get('subscriptions/:id', subscriptionsWS_BL.getSubscription);
router.get('subscriptions/:member_id', subscriptionsWS_BL.getSubscription);
router.delete('subscriptions/:id', subscriptionsWS_BL.deleteSubscription);

router.post('members', subscriptionsWS_BL.createMember);
router.get('members', subscriptionsWS_BL.getMembers);
router.get('members/:id', subscriptionsWS_BL.getMember);
router.patch('members/:id', subscriptionsWS_BL.updateMember);
router.delete('members/:id', subscriptionsWS_BL.deleteMember);

router.post('movies', subscriptionsWS_BL.createMovie);
router.get('movies', subscriptionsWS_BL.getMovies);
router.get('movies/:id', subscriptionsWS_BL.getMovie);
router.patch('movies/:id', subscriptionsWS_BL.updateMovie);
router.delete('movies/:id', subscriptionsWS_BL.deleteMovie);

export default router;