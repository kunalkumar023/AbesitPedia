import express from 'express'
import { addReview, createArticle, getArticleById, getArticles, toggleUpvoteArticle } from '../controller/post.js';
import { authentication } from '../middleware/authentication.js';
import multer from 'multer'
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.route("/article/upload").post(authentication,upload.single('file'),createArticle);
router.route("/article/:id").get(authentication,getArticleById)
router.route("/articles/:year").get(authentication,getArticles)

router.route('/articles/upvote/:id').put(authentication,toggleUpvoteArticle);

router.route("/article/review/:id").put(authentication,addReview)


export default router;