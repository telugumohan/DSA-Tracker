import express from 'express';
import {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  insertManyProblems
} from '../controllers/problemController.js';

const router = express.Router();

// GET /api/problems - Get all problems
// POST /api/problems - Create a new problem
router.route('/')
  .get(getAllProblems)
  .post(createProblem);

router.route('/many')
  .post(insertManyProblems);

// GET /api/problems/:id - Get problem by ID
// PUT /api/problems/:id - Update problem by ID
// DELETE /api/problems/:id - Delete problem by ID
router.route('/:id')
  .get(getProblemById)
  .put(updateProblem)
  .delete(deleteProblem);

export default router;
