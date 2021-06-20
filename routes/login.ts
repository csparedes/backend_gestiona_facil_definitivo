import { Router } from "express";
import { logIn } from "../controllers/login";
const router = Router();
router.post("/", logIn);
export default router;
