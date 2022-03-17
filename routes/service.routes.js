import express from 'express';
import {
  getAllServices,
  getService,
  insertService,
} from '../controllers/services.controller.js';
//import { protectRoute } from '../midleworks/protection.js';
const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getService);
router.post('/', insertService);
//router.patch('/:id', updateService);

export default router;
