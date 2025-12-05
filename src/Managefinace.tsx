import { useState } from 'react';
import { MonthsView } from './Expenses/MonthsView';
import { DatesView } from './Expenses/DatesView';
import { ExpenseEntry } from './Expenses/ExpenseEntry';
import {MonthExpense} from './MonthExpense';

export interface Expense {
  id: string;
  date: string; // YYYY-MM-DD format
  category: string;
  amount: number;
  username: string;
}
export interface MonthlyExpenseData {
  year: number;
  month: number;           // 0–11 or 1–12, your choice
  income: number;
  rent: number;
  emi: number;
  subscriptions: number;
  otherExpenses: number;
}

type View = 'months' | 'dates' | 'expenses';

export default function Managefinace() {
  const [currentView, setCurrentView] = useState<View>('months');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const currentYear = new Date().getFullYear();
  const username = sessionStorage.getItem("username") || "defaultUser";

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setCurrentView('dates');
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setCurrentView('expenses');
  };

  const handleBackToMonths = () => {
    setCurrentView('months');
    setSelectedMonth(null);
  };

  const handleBackToDates = () => {
    setCurrentView('dates');
    setSelectedDate(null);
  };

  const handleAddExpense = async (category: string, amount: number) => {
    if (! selectedDate) return;
    try{
        const res=await fetch('https://finai-backend-gw4d.onrender.com/api/add-daily-expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate, category, amount, username }),
    }); 
    const savedExpense = await res.json();
    setExpenses([...expenses, savedExpense]);
    }
    catch(err){
        console.error("Failed to add expense:", err);
    }
    
  };
  const onSubmit=async (monthlyData: { income: number; rent: number; emi: number; subscriptions: number; otherExpenses: number; })=>{
    try{
        const res=await fetch('https://finai-backend-gw4d.onrender.com/api/add-monthly-expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...monthlyData, month: selectedMonth, year: currentYear,  username }),
    }); 
    const data = await res.json();
    console.log("Monthly expenses saved:", data);
    }
    catch(err){
        console.error("Failed to add monthly expenses:", err);
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const getExpensesForDate = (date: string) => {
    return expenses.filter(exp => exp.date === date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {currentView === 'months' && (
          <MonthsView 
            year={currentYear} 
            onMonthClick={handleMonthClick}
          />
        )}
        
        {currentView === 'dates' && selectedMonth !== null && (
          <div className="grid md:grid-cols-2 gap-6">
          <DatesView
            year={currentYear}
            month={selectedMonth}
            onDateClick={handleDateClick}
            onBack={handleBackToMonths}
            getExpensesForDate={getExpensesForDate}
          />
          <MonthExpense
              year={currentYear}
              month={selectedMonth}
              onBack={handleBackToMonths}
              onSubmit={onSubmit}
          />
          </div>
        )}
        
        {currentView === 'expenses' && selectedDate && (
          <ExpenseEntry
            date={selectedDate}
            expenses={getExpensesForDate(selectedDate)}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onBack={handleBackToDates}
          />
        )}
      </div>
    </div>
  );
}
