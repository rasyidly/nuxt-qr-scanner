import { JsonDB, Config } from "node-json-db";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = new JsonDB(new Config(`~/../db/pulangkampus`, true, false, "/"));

	const index = await db.getIndex("/registrants", body.email);

	if (index >= 0) {
		const registrant = await db.getData(`/registrants[${index}]`);

		if (registrant && registrant.id && registrant.p == false && body.p === true) {
			await db.push(`/registrants[${index}]/p`, true, true);
		}

		return registrant;
	}
	return {};
});
