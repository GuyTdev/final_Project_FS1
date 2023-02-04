import express from "express";
import * as membersBL from '../controllers/membersBL.js'
const router = express.Router();

router.post('/', membersBL.createMember);
router.get('/', membersBL.getMembers);
router.get('/:id', membersBL.getMember);
router.patch('/:id', membersBL.updateMember);
router.delete('/:id', membersBL.deleteMember);

export default router;
