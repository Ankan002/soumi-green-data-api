import { connect } from "mongoose";

export const connectToDb = () => {
	connect(process.env["DB_URL"])
		.then(() => console.log("Successfully Connected!!"))
		.catch((err) => console.log(err));
};
