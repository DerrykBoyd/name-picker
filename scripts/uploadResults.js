import { readFileSync } from 'fs';
import { nanoid } from 'nanoid';

const file = readFileSync('./scripts/order.csv', 'utf8');
const results = file.split('\n');
results.shift();

const db = `name-picker-icrb3dwayqz7qn2lcdvveoft`;

const res = await fetch(`${process.env.COUCH_URL}/${db}/_all_docs?include_docs=true`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Basic ${Buffer.from(`${process.env.COUCH_USER}:${process.env.COUCH_PW}`).toString('base64')}`
	}
});
const allDocs = await res.json();

results.forEach((result) => {
	const [date, participants, , winner] = result.split(',');
	const exists = allDocs.rows.find((doc) => doc.doc.name === winner);
	if (exists) {
		const ts = new Date(date).getTime();
		const newRes = {
			_id: `result|${nanoid()}|${ts}`,
			winner: exists.doc._id.split('|')[1],
			activeParticipants: Array.from({ length: participants }).fill('unknown'),
			created_at: ts
		};

		fetch(`${process.env.COUCH_URL}/${db}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${Buffer.from(`${process.env.COUCH_USER}:${process.env.COUCH_PW}`).toString('base64')}`
			},
			body: JSON.stringify(newRes)
		});
	}
});
