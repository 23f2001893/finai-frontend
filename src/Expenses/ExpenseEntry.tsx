import { useState,} from 'react';
import { ChevronLeft, Plus, Trash2, DollarSign } from 'lucide-react';
import type { Expense } from '../Managefinace.tsx';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface ExpenseEntryProps {
  date: string;
  expenses: Expense[];
  onAddExpense: (category: string, amount: number) => void;
  onDeleteExpense: (id: string) => void;
  onBack: () => void;
}

export function ExpenseEntry({ date, expenses, onAddExpense, onDeleteExpense, onBack }: ExpenseEntryProps) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category.trim() && amount) {
      onAddExpense(category.trim(), parseFloat(amount));
      setCategory('');
      setAmount('');
    }
    
    
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };


  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-indigo-900">Daily Expenses</h1>
          <p className="text-gray-600">{formatDate(date)}</p>
        </div>
      </div>

      <Card className="p-6 mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Category
            </label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Food, Transport, Entertainment"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-gray-700 mb-2">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </form>
      </Card>

      {expenses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Expenses</h2>
            <div className="flex items-center gap-2 text-indigo-600">
              <DollarSign className="w-5 h-5" />
              <span className="text-indigo-900">Total: ${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            {expenses.map((expense) => (
              <Card key={expense.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-gray-900">{expense.category}</div>
                    <div className="text-gray-600">${expense.amount.toFixed(2)}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {expenses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No expenses recorded for this day</p>
          <p className="mt-2">Add your first expense above</p>
        </div>
      )}
    </div>
  );
}
