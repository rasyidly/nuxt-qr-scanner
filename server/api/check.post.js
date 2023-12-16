import { JsonDB, Config } from "node-json-db";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = new JsonDB(new Config(`~/../db/pulangkampus`, true, false, "/"));

	const registrants = await db.getData("/registrants");
	const index = registrants.findIndex((f) => f.id == body.email && f.p == false);

	return registrants[index];
});
