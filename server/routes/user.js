import express from "express"
import {getUserAtricles, myArticles, getUser, loginUser, logout, myProfile, registerUser} from "../controller/user.js"
import { authentication } from "../middleware/authentication.js"

const router= express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)
router.route("/logout").get(logout)

router.route("/articles/user/:userId").get(authentication,getUserAtricles)
router.route("/articles/me").get(authentication,getUserAtricles)

router.route("/me").get(authentication,myProfile)
router.route("/user/:id").get(getUser)


export default router