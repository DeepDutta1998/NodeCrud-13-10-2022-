const router = require("express").Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.create);
router.post("/insert", studentController.insert);
router.get("/student-view", studentController.studentView);
router.get("/edit/:id", studentController.edit);
router.post("/update", studentController.update);
router.get("/delete/:id", studentController.delete);


module.exports = router;
