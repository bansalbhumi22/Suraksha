import { Router } from "express";
import { registerBooking} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getBookingHistory } from "../controllers/user.controller.js";

const router=Router()

router.route("/booking").post(upload.none(),registerBooking)
router.route("/booking-history").get(verifyJWT, getBookingHistory);
export default router