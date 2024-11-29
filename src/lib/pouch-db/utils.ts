type Doc = { _id: `${string}|${string}|${string}` };
// returns a list of unique docs based on the second part of the id
export function getUniqueDocs<T extends Doc>(docs: T[]) {
	return docs.reduce<T[]>((prev, cur, _, arr) => {
		const cur_id = cur._id.split('|')[1];
		const allEntries = arr.filter((p) => {
			const id = p._id.split('|')[1];
			return cur_id === id;
		});
		const latest = allEntries
			.sort((a, b) => {
				return Number(a._id.split('|')[2]) - Number(b._id.split('|')[2]);
			})
			.pop();
		if (latest?._id === cur._id) prev.push(cur);
		return prev;
	}, []);
}
