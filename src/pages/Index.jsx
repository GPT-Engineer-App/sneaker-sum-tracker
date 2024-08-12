import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialTransactions = [
  { id: 1, date: '2024-03-01', amount: 150, type: 'expense', category: 'Nike' },
  { id: 2, date: '2024-03-05', amount: 200, type: 'income', category: 'Adidas' },
  { id: 3, date: '2024-03-10', amount: 180, type: 'expense', category: 'Jordan' },
];

const Index = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = (data) => {
    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? { ...data, id: editingId } : t));
      setEditingId(null);
    } else {
      setTransactions([...transactions, { ...data, id: Date.now() }]);
    }
    reset();
  };

  const editTransaction = (transaction) => {
    setEditingId(transaction.id);
    Object.keys(transaction).forEach(key => setValue(key, transaction[key]));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sneaker Side-Hustle Accounting</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input type="date" {...register('date')} required />
            <Input type="number" placeholder="Amount" {...register('amount')} required />
            <Select {...register('type')} required>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select {...register('category')} required>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Jordan">Jordan</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">{editingId ? 'Update' : 'Add'} Transaction</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => editTransaction(transaction)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
