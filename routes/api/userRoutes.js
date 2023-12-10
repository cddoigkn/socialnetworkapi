const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById
} = require('../../controllers/user.controller');

// gets all users //
router.get("/", async (req, res) => {
  try {
    const payload = await getAllUsers()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// gets user by id //
router.get("/:userid", async (req, res) => {
  try {
    const payload = await getUserById(req.params.userid)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// create user //
router.post("/", async (req, res) => {
  try {
    const payload = await createUser(req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// update User Id //
router.put("/:userid", async (req, res) => {
  try {
    const payload = await updateUserById(req.params.userid, req.body)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

// delete user Id //
router.delete("/:userid", async (req, res) => {
  try {
    const payload = await deleteUserById(req.params.userid)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
