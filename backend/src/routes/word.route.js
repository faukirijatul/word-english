import express from "express";

const router = express.Router();

import {
    createNewWordController,
    getAllWordsController,
    getWordByIdController,
    updateWordByIdController,
    deleteWordByIdController,
} from "../controllers/word.controller.js";

router.post("/", createNewWordController);
router.get("/", getAllWordsController);
router.get("/:id", getWordByIdController);
router.put("/:id", updateWordByIdController);
router.delete("/:id", deleteWordByIdController);

export default router;