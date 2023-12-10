const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThoughtById,
  updateThoughtById
} = require('../../controllers/thoughts.controller');

// gets all Thoughts //
router.get("/", async (req, res) => {
  try {
    const payload = await getAllThoughts()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// gets Thought by id //
router.get("/:thoughtid", async (req, res) => {
  try {
    const payload = await getThoughtById(req.params.thoughtid)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// create Thought //
router.post("/", async (req, res) => {
  try {
    const payload = await createThought(req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// update Thought Id //
router.put("/:thoughtid", async (req, res) => {
  try {
    const payload = await updateThoughtById(req.params.thoughtid, req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// delete Thought Id //
router.delete("/:thoughtid", async (req, res) => {
  try {
    const payload = await deleteThoughtById(req.params.thoughtid)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
