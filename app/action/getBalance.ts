"use server"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export async function getBalance() : Promise<{
	balance?: number;
	error?: string;
}>{
	const {userId} = auth();
	if(!userId){
        return { error: "User not logged in..." };
    }
	try {
		const transcations = await db.transcation.findMany({
			where:{
				userId
			}
		});
		const balance = transcations.reduce((sum,transcation)=> sum + transcation.amount,0);
	return {balance};
	} catch (error) {
		return {error:"DATABASE ERROR"}
	}
}