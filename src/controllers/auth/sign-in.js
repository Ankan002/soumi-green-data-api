import { z } from "zod";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";

const RequestBodySchema = z.object({
	email: z.string().email("Enter a valid email address"),
	password: z
		.string()
		.min(8, "Name should have at least 8 characters")
		.max(30, "Name should have at most 30 characters"),
});

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export const signIn = async (req, res) => {
	const requestBodyValidationResult = RequestBodySchema.safeParse(req.body);

	if (!requestBodyValidationResult.success) {
		return res.status(400).json({
			success: false,
			error: requestBodyValidationResult.error.errors[0]?.message,
		});
	}

	const reqBody = requestBodyValidationResult.data;

	try {
		const foundUser = await User.findOne({
			email: reqBody.email,
		});

		if (!foundUser) {
			return res.status(400).json({
				success: false,
				error: "No user found with this email id!!",
			});
		}

		const isCorrectPassword = await bcrypt.compare(reqBody.password, foundUser.password);

		if (!isCorrectPassword) {
			return res.status(401).json({
				success: false,
				error: "Incorrect Credentials",
			});
		}

		const user = {
			user: {
				id: foundUser.id,
				email: foundUser.email,
			},
		};

		const jwtToken = jwt.sign(user, process.env["SECRET"] ?? "");

		return res.status(200).set("auth-token", jwtToken).json({
			success: true,
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
