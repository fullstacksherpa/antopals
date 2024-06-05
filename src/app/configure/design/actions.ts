
'use server'

import {db} from '@/db'


export type SaveConfigArgs = {
	color: "black" | "white" | string;
	configId: string;
}


export async function saveConfig({
	color,

	configId,
}: SaveConfigArgs) {
	await db.configuration.update({
		where: {id: configId},
		data: {color},
	})
}
