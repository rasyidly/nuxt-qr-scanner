import { JsonDB, Config } from "node-json-db";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = new JsonDB(new Config(`~/../db/satfest`, true, false, "/"));

	const registrant = await db.getData(`/registrants[${await db.getIndex("/registrants", body.email)}]`);

	if (registrant && registrant.id && registrant.p == false && body.p === true) {
		await db.push(`/registrants[${await db.getIndex("/registrants", body.email)}]/p`, true, true);
	}

	return registrant;
});
