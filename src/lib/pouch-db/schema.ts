/** Participant doc */
export type Participant = {
	_id: `participant|${string}|${string}`;
	_rev?: string;
	name: string;
	created_at: number;
	excluded?: boolean;
	deleted?: boolean;
};

/** Result doc */
export type Result = {
	_id: `result|${string}|${string}`;
	_rev?: string;
	created_at: number;
	winner: string; // participant id parts[1] of the full id
	activeParticipants: string[]; // participant id parts[1] of the full id
	deleted?: boolean;
};
