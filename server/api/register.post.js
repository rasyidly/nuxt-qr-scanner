import { JsonDB, Config } from "node-json-db";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = new JsonDB(new Config(`~/../db/pulangkampus`, true, false, "/"));
	let qr = "";

	const registrant = {
		id: body.email,
		name: body.name,
		p: false,
	};

	if ((await db.getIndex("/registrants", registrant.id)) < 0) {
		await db.push("/registrants[]", registrant, true);
	}

	return registrant;
});
