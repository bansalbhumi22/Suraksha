import { Router } from "express";
import { registerBooking} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/booking").post(upload.none(),registerBooking)
export default router