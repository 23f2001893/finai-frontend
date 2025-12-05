import { Calendar,Notebook } from 'lucide-react';

interface MonthsViewProps {
  year: number;
  onMonthClick: (monthIndex: number) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function MonthsView({ year, onMonthClick }: MonthsViewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-8 h-8 text-indigo-600" />
        <h1 className="text-indigo-900">{year}</h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MONTHS.map((month, index) => (
          <button
            key={month}
            onClick={() => onMonthClick(index)}
            className="h-52 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <div className="text-center">
              
              <div>{month}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
export default MonthsView;