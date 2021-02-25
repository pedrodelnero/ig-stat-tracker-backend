import express from "express";

// import { cache } from "../middleware/cache.js";
import { getIgStats } from "../controllers/getIgStats.js";

const router = new express.Router();

router.post("/ig-proposal", getIgStats);

router.post("/download-csv", async (req, res) => {
  const file = await writeToCSVFile([data]);
  console.log("file", file);
});

export default router;
