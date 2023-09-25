export default {
	apps: [
		{
			name: "NuxtAppName",
			port: "5002",
			exec_mode: "cluster",
			instances: "max",
			script: "./.output/server/index.mjs",

		},
	],
};
