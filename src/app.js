import express from "express";
import cors from "cors";
import { morganConfig } from "./middlewares/morgan/morgan.js";

export const startServer = () => {
	const app = express();
	const PORT = process.env["PORT"];

	app.use(express.json());
	app.use(cors());
	app.use(morganConfig);

	app.get("/", (req, res) => {
		return res.status(200).json({
			success: true,
			message: "Welcome to Green Data API",
		});
	});

	app.listen(PORT, () => console.log(`App is running at ${PORT}`));
};
