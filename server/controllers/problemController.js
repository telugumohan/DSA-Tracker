import Problem from '../models/ProblemModel.js';

// @desc    Get all problems
// @route   GET /api/problems
// @access  Public
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: 1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get a single problem by ID
// @route   GET /api/problems/:id
// @access  Public
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create a new problem
// @route   POST /api/problems
// @access  Public or Protected (adjust as needed)
export const createProblem = async (req, res) => {
  try {
    const { topic, difficulty, resource, problem, practice } = req.body;

    const newProblem = new Problem({
      topic,
      difficulty,
      resource,
      problem,
      practice,
    });

    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid problem data', error });
  }
};

// @desc    Update an existing problem
// @route   PUT /api/problems/:id
// @access  Public or Protected (adjust as needed)
export const updateProblem = async (req, res) => {
  try {
    const { topic, difficulty, resource, problem, practice } = req.body;

    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      { topic, difficulty, resource, problem, practice },
      { new: true, runValidators: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error });
  }
};

// Optional: Delete controller
export const deleteProblem = async (req, res) => {
  try {
    const deleted = await Problem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//insert many
export const insertManyProblems = async (req, res) => {
  try {
    const result = await Problem.insertMany(req.body);
    res.status(200).json({ message: 'Inserted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Insertion failed', error });
  }
}