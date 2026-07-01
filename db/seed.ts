import { db, GuestBook } from 'astro:db';

export default async function seed() {
	await db.insert(GuestBook).values([
		{
			author: "coolcream",
			content: "hello wazup",
		},
		{
			author: "coolcream v2",
			content: "hello again",
		},
	]);
};
