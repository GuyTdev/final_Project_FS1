import express from "express";
import * as subscriptionsWSController from '../controllers/subscriptionsWSController.js'
const router = express.Router();

router.post('/subscriptions', subscriptionsWSController.addMovieToSubscription);
router.get('/subscriptions', subscriptionsWSController.getSubscriptions);
router.get('/subscriptions/:id', subscriptionsWSController.getSubscription);
router.get('/subscriptions/bymember/:member_id', subscriptionsWSController.getSubscriptionByMemberId);
router.delete('/subscriptions/:id', subscriptionsWSController.deleteSubscription);
router.delete('/subscriptions/member/:id', subscriptionsWSController.deleteSubscriptionByMemberId);
router.delete('/subscriptions/movie/:id', subscriptionsWSController.deleteMovieFromAllSubscriptions);

router.post('/members', subscriptionsWSController.createMember);
router.get('/members', subscriptionsWSController.getMembers);
router.get('/members/:id', subscriptionsWSController.getMember);
router.patch('/members/:id', subscriptionsWSController.updateMember);
router.delete('/members/:id', subscriptionsWSController.deleteMember);

router.post('/movies', subscriptionsWSController.createMovie);
router.get('/movies', subscriptionsWSController.getMovies);
router.get('/movies/:id', subscriptionsWSController.getMovie);
router.patch('/movies/:id', subscriptionsWSController.updateMovie);
router.delete('/movies/:id', subscriptionsWSController.deleteMovie);

export default router;