import jwt from "jsonwebtoken";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export const isAuthenticated = (req, res, next) => {
	const authToken = req.headers["auth-token"];

	if (!authToken) {
		return res.status(401).json({
			success: false,
			error: "Access Denied!!",
		});
	}

	try {
		const { user } = jwt.verify(authToken, process.env["SECRET"]);

		if (!user) {
			return res.status(401).json({
				success: false,
				error: "Access Denied!!",
			});
		}

		req.user = user;

		return next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			console.log(error.message);
			return res.status(401).json({
				success: false,
				error: "Access Denied!!",
			});
		}

		if (error instanceof Error) {
			return res.status(400).json({
				success: false,
				error: error.message,
			});
		}

		return res.status(500).json({
			success: false,
			error: "Internal Server Error",
		});
	}
};
