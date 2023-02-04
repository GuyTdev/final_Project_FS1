import express from "express";
import * as subscriptionsBL from '../controllers/subscriptionsBL.js'
const router = express.Router();

router.post('/', subscriptionsBL.createSubscription);
router.get('/:id', subscriptionsBL.getSubscription);
router.patch('/:id', subscriptionsBL.updateSubscription);
router.delete('/:id', subscriptionsBL.deleteSubscription);