import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface LocationState {
  username?: string;
  month?: number; // 0-11 (0 = January)
  year?: number;
  // optional fallback values
  income?: number;
  expenses?: number;
  breakdown?: Record<string, number>;
}

// Make this flexible enough to work whether backend sends `expenses` or `total_expenses`
interface SummaryResponse {
  username: string;
  year: number | string;
  month_index?: number; // if backend uses month_index (0-11)
  month?: number;       // if backend sends month directly
  income: number;
  expenses?: number;
  total_expenses?: number;
  savings?: number;
  breakdown: Record<string, number>;
}

const FuturePlan: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState | null };

  const username = state?.username || "Ruskin"; // TODO: replace with actual logged-in user

  const current = new Date();
  // 🔹 Use 0-based month index (0 = January)
  const fallbackMonthIndex = state?.month ?? current.getMonth();
  const fallbackYear = state?.year ?? current.getFullYear();

  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const displayMonthName = MONTH_NAMES[fallbackMonthIndex] || "Unknown";

  // 🔹 Fetch real analytics from backend when component mounts
  useEffect(() => {
    const controller = new AbortController();

    async function fetchSummary() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          username,
          // monthIndex 0–11 → your backend expects `month` as 0-based for MonthlyExpense
          month: String(fallbackMonthIndex),
          year: String(fallbackYear),
        });

        const res = await fetch(
          `https://finai-backend-gw4d.onrender.com/api/monthly-summary?${params.toString()}`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("Failed to fetch summary:", res.status, text);
          throw new Error("Failed to fetch summary");
        }

        const data: SummaryResponse = await res.json();
        setSummary(data);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Error fetching summary:", err);
        setError("Unable to load your analytics. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();

    return () => controller.abort();
  }, [username, fallbackMonthIndex, fallbackYear]);

  // 🔹 Fallback to state data only if API fails and you still have some data
  const income =
    Number(summary?.income ?? state?.income ?? 0);

  const expenses =
    Number(
      summary?.total_expenses ??
      summary?.expenses ??
      state?.expenses ??
      0
    );

  const breakdown: Record<string, number> =
    summary?.breakdown ??
    state?.breakdown ??
    {};

  const savings = income - expenses;

  const investmentOptions =
    savings > 0
      ? [
          { name: "Mutual Funds", value: savings * 0.4 },
          { name: "Fixed Deposit", value: savings * 0.3 },
          { name: "Stock Market", value: savings * 0.2 },
          { name: "Emergency Fund", value: savings * 0.1 },
        ]
      : [
          { name: "Emergency Fund", value: Math.abs(savings) * 0.5 },
          { name: "Debt Repayment", value: Math.abs(savings) * 0.5 },
        ];

  const lineData = [
    { month: "Jan", value: savings * 0.8 },
    { month: "Feb", value: savings * 0.85 },
    { month: "Mar", value: savings * 0.9 },
    { month: "Apr", value: savings * 0.95 },
    { month: "May", value: savings * 1.0 },
    { month: "Jun", value: savings * 1.05 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex flex-col items-center py-10 px-4">
      <motion.div
        className="w-full max-w-5xl p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-indigo-700">
              💡 Future Investment Plan
            </CardTitle>
            <p className="text-center text-sm text-gray-500">
              {username} • {displayMonthName} {fallbackYear}
            </p>
          </CardHeader>

          <CardContent>
            {/* Loading / error states */}
            {loading && (
              <div className="mb-6 text-center text-gray-500">
                Fetching your financial analytics...
              </div>
            )}
            {error && (
              <div className="mb-6 text-center text-red-500">
                {error}
              </div>
            )}

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-indigo-100 p-4 rounded-xl">
                <h4 className="font-medium text-indigo-700">Total Income</h4>
                <p className="text-xl font-semibold">₹{income.toFixed(2)}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <h4 className="font-medium text-red-700">Total Expenses</h4>
                <p className="text-xl font-semibold">₹{expenses.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <h4 className="font-medium text-green-700">Savings</h4>
                <p className="text-xl font-semibold">₹{savings.toFixed(2)}</p>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Expense Breakdown
              </h3>
              {Object.keys(breakdown).length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No expense data available for this period.
                </p>
              ) : (
                <ul className="list-disc list-inside text-gray-600">
                  {Object.entries(breakdown).map(([key, value]) => (
                    <li key={key}>
                      {key}: ₹{Number(value).toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Investment Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={investmentOptions}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {investmentOptions.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Line */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Savings Growth Projection
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4f46e5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Suggestions
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {savings <= 0 && (
                  <li>
                    Your expenses are equal to or higher than your income.
                    Focus on reducing non-essential categories first.
                  </li>
                )}
                <li>Try to keep fixed expenses within 50–60% of income.</li>
                <li>Invest a portion of your monthly savings regularly.</li>
                <li>
                  Maintain at least 3–6 months of expenses as an emergency fund.
                </li>
              </ul>
            </div>

            {/* Back Button */}
            <div className="mt-8 flex justify-center">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FuturePlan;
