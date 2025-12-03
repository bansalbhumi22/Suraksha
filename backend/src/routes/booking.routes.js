import { Router } from "express";
import { registerBooking,getBookingHistory} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/booking").post(verifyJWT,upload.none(),registerBooking)
router.route("/booking-history").get(verifyJWT, getBookingHistory); 
export default router