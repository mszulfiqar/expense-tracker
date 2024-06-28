"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface TransactionData {
	text:string;
	amount:number;
}

interface TransactionResult {
	data?: TransactionData;
	error?: string;
}

export const addTransaction = async (formData:FormData): Promise<TransactionResult> => {
	const textValue = formData.get("text");
	const amountValue = formData.get("amount");

	if(!textValue ||  textValue=="" || !amountValue){
		return { error: "Text or amount is missing......Please check the from" };
	}

	const text:string = textValue.toString();
	const amount:number = parseFloat(amountValue.toString());
	
	const {userId} = auth();

	if(!userId){
		return { error: "User not authenticated" };
	}



	try{
		const transactionData:TransactionData = await db.transcation.create({
			data: {
				text,
				amount,
				userId
			},
		})
		revalidatePath("/");  // revalidate the transactions page when a new transaction is added
		return { data: transactionData };
	}
	catch(error){
        return { error: "An error occurred while creating the transaction" };
    }

}

export default addTransaction