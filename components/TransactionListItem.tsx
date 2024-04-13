import { View, Text } from 'react-native'
import React from 'react'
import { Category, Transaction } from '../types';
import Card from './ui/Card';

type TransactionListItemProps = {
    transaction: Transaction;
    category: Category | undefined;
};

export default function TransactionListItem( { transaction, category}: TransactionListItemProps) {
  return (
    <Card>
        <Text>
            {transaction.description} - {transaction.amount} - {category?.name}
        </Text>
    </Card>

  )
}
