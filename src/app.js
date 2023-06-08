import express from "express";
import cors from "cors";
import { morganConfig } from "./middlewares/morgan/morgan.js";
import { connectToDb } from "./config/connect-to-db.js";
import { authRouter } from "./routes/auth-router.js";
import { userRouter } from "./routes/user-router.js";

export const startServer = () => {
	const app = express();
	const PORT = process.env["PORT"];

	connectToDb();

	app.use(express.json());
	app.use(cors());
	app.use(morganConfig);

	app.get("/", (req, res) => {
		return res.status(200).json({
			success: true,
			message: "Welcome to Green Data API",
		});
	});

	app.use("/api/auth", authRouter);
	app.use("/api/user", userRouter);

	app.listen(PORT, () => console.log(`App is running at ${PORT}`));
};
