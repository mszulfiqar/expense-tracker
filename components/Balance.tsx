import { getBalance } from '@/app/action/getBalance'
import { addCommas } from '@/lib/utils';
import React from 'react'

const Balance = async () => {
	const {balance} = await getBalance();
  return (
	<>
	<h4>Balance</h4>
	<h1>${addCommas(Number(balance?.toFixed(2) ?? 0))}</h1>
	</>
  )
}

export default Balance