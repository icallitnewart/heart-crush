const ENV_MODE = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
};

export const IS_ENV_MODE = {
	DEVELOPMENT: process.env.NODE_ENV === ENV_MODE.DEVELOPMENT,
	PRODUCTION: process.env.NODE_ENV === ENV_MODE.PRODUCTION,
};
