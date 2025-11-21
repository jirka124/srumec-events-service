import { Router } from "express";
import { commentController } from "#controllers/commentController.js";

const router = Router();

router.post("/get-all", commentController.getAll);
router.post("/update-one", commentController.updateOne);
router.post("/delete-one", commentController.deleteOne);

export default router;
