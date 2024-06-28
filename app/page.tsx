import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import Guest from "@/components/Guest";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/transactionLIst";
import { currentUser } from "@clerk/nextjs/server";

export default async function  Home() {
  const isUser = await currentUser();

  if (!isUser) {
    return <Guest />;
  }
  return (
   <main>
      <h2>{`Welcome back`}</h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction /> 
      <TransactionList />  
   </main>
  );
}
