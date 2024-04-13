import { View, Text } from 'react-native'
import React from 'react'
import { Category, Transaction } from '../types';

type TransactionListItemProps = {
    transaction: Transaction;
    category: Category | undefined;
};

export default function TransactionListItem( { transaction, category}: TransactionListItemProps) {
  return (
      <Text>
            {transaction.description} - {transaction.amount} - {category?.name}
      </Text>
  )
}
