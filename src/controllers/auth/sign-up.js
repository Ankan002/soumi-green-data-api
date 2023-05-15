import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
import mongoose from "mongoose";

const RequestBodySchema = z.object({
	name: z.string().min(3, "Name should have at least 3 characters").max(60, "Name should have at most 60 characters"),
	email: z.string().email("Enter a valid email address"),
	password: z
		.string()
		.min(8, "Name should have at least 8 characters")
		.max(30, "Name should have at most 30 characters"),
});

export const signUp = async (req, res) => {
	const requestValidationResult = RequestBodySchema.safeParse(req.body);

	if (!requestValidationResult.success) {
		return res.status(400).json({
			success: false,
			error: requestValidationResult.error.errors[0]?.message,
		});
	}

	const reqBody = requestValidationResult.data;

	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(reqBody.password, salt);

		const newUser = await User.create({
			email: reqBody.email,
			password: hashedPassword,
			name: reqBody.name,
		});

		const user = {
			id: newUser.id,
			email: newUser.email,
		};

		const token = jwt.sign(user, process.env["SECRET"] ?? "");

		return res.status(200).set("auth-token", token).json({
			success: true,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);

            if (error.name === "MongoServerError" && error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    error: "An user with same email already exists",
                });
            }

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
