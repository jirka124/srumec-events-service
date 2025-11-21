import { Router } from "express";
import { eventController } from "#controllers/eventController.js";

const router = Router();

router.post("/get-nearby", eventController.getNearby);
router.post("/get-one", eventController.getOne);
router.post("/update-one", eventController.updateOne);
router.post("/delete-one", eventController.deleteOne);

export default router;
