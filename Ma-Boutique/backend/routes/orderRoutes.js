const router = require("express").Router();
const ctrl = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, ctrl.create);
router.get("/mine", protect, ctrl.getMine);
router.get("/", protect, admin, ctrl.getAll);
router.put("/:id", protect, admin, ctrl.updateStatut);

module.exports = router;