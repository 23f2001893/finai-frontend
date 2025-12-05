import { ChevronLeft, IndianRupeeIcon, IndianRupee } from 'lucide-react';
import type { Expense } from '../Managefinace.tsx';

interface DatesViewProps {
  year: number;
  month: number;
  onDateClick: (date: string) => void;
  onBack: () => void;
  getExpensesForDate: (date: string) => Expense[];
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function DatesView({ year, month, onDateClick, onBack, getExpensesForDate }: DatesViewProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: firstDay }, (_, i) => i);
  
  const formatDate = (day: number) => {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

  const getTotalForDate = (day: number) => {
    const dateStr = formatDate(day);
    const expenses = getExpensesForDate(dateStr);
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-indigo-900">{MONTHS[month]} {year}</h1>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAYS.map(day => (
          <div key={day} className="text-center p-2 text-gray-600">
            {day}
          </div>
        ))}
        
        {emptySlots.map(slot => (
          <div key={`empty-${slot}`} className="p-2" />
        ))}
        
        {dates.map(day => {
          const total = getTotalForDate(day);
          const hasExpenses = total > 0;
          
          return (
            <button
              key={day}
              onClick={() => onDateClick(formatDate(day))}
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                hasExpenses
                  ? 'border-green-500 bg-green-50 hover:bg-green-100'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-center">
                <div className={hasExpenses ? 'text-green-900' : 'text-gray-700'}>
                  {day}
                </div>
                {hasExpenses && (
                  <div className="flex items-center justify-center gap-1 mt-1 text-green-700">
                    <IndianRupee className="w-3 h-3" />
                    <span className="text-xs">{total.toFixed(0)}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
