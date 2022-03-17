import express from 'express';
import {
  deleteGarage,
  getAllGarages,
  getGarage,
  insertGarage,
  updateGarage,
} from '../controllers/garages.controller.js';
//import { protectRoute } from '../midleworks/protection.js';
const router = express.Router();

router.get('/', getAllGarages);
router.post('/', insertGarage);
router.get('/:id', getGarage);
router.patch('/:id', updateGarage);
router.delete('/:id', deleteGarage);

export default router;
