import morgan from "morgan";

const stream = {
	write: (message) => console.log(message),
};

export const morganConfig = morgan(":method :url :status - :response-time ms - :res[error]", { stream });
