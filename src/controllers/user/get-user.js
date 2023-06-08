import { User } from "../../models/user.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export const getUser = async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			error: "Access Denied!!",
		});
	}

	const { id: userId } = req.user;

	try {
		const user = await User.findById(userId).select("id email name");

		if (!user) {
			return res.status(400).json({
				success: false,
				error: "No User Found!!",
			});
		}

		return res.status(200).json({
			success: true,
			data: {
				user,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);

			return res.status(400).json({
				success: false,
				error: error.message,
			});
		}

		console.log(error);

		return res.status(500).json({
			success: false,
			error: "Internal Server Error!!",
		});
	}
};
