// MonthExpense.tsx
import * as React from "react";
import type { MonthlyExpenseData } from "./Managefinace"; // adjust path if needed

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { ArrowLeft, Save } from "lucide-react";

export interface MonthlyExpenseProps {
  year: number;
  month: number; // 0–11
  onBack: () => void;
  onSubmit: (data: MonthlyExpenseData) => void;
}

export function MonthExpense({ year, month, onBack, onSubmit }: MonthlyExpenseProps) {
  const [formData, setFormData] = React.useState({
    income: "",
    rent: "",
    emi: "",
    subscriptions: "",
    otherExpenses: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: MonthlyExpenseData = {
      year,
      month,
      income: parseFloat(formData.income) || 0,
      rent: parseFloat(formData.rent) || 0,
      emi: parseFloat(formData.emi) || 0,
      subscriptions: parseFloat(formData.subscriptions) || 0,
      otherExpenses: parseFloat(formData.otherExpenses) || 0,
    };

    onSubmit(payload);

    // optional: clear form
    setFormData({
      income: "",
      rent: "",
      emi: "",
      subscriptions: "",
      otherExpenses: "",
    });
  };

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="w-full bg-white/90 border border-slate-200 rounded-2xl shadow-md">
      <CardHeader className="flex items-start justify-between gap-3 pb-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full border border-slate-200 hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div className="text-right">
          <CardTitle className="text-base md:text-lg text-slate-900">
            Monthly plan
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-slate-500">
            {monthLabel}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Income */}
            <div className="space-y-1.5">
              <Label htmlFor="income" className="text-xs font-medium text-slate-700">
                Monthly income
              </Label>
              <Input
                id="income"
                name="income"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 50000"
                value={formData.income}
                onChange={handleChange}
              />
            </div>

            {/* Rent */}
            <div className="space-y-1.5">
              <Label htmlFor="rent" className="text-xs font-medium text-slate-700">
                Rent / Home EMI
              </Label>
              <Input
                id="rent"
                name="rent"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 12000"
                value={formData.rent}
                onChange={handleChange}
              />
            </div>

            {/* EMI */}
            <div className="space-y-1.5">
              <Label htmlFor="emi" className="text-xs font-medium text-slate-700">
                Other EMIs
              </Label>
              <Input
                id="emi"
                name="emi"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 3000"
                value={formData.emi}
                onChange={handleChange}
              />
            </div>

            {/* Subscriptions */}
            <div className="space-y-1.5">
              <Label htmlFor="subscriptions" className="text-xs font-medium text-slate-700">
                Subscriptions
              </Label>
              <Input
                id="subscriptions"
                name="subscriptions"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 799"
                value={formData.subscriptions}
                onChange={handleChange}
              />
            </div>

            {/* Other expenses */}
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="otherExpenses" className="text-xs font-medium text-slate-700">
                Other fixed expenses
              </Label>
              <Input
                id="otherExpenses"
                name="otherExpenses"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 2000"
                value={formData.otherExpenses}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Hint / summary area */}
          <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs md:text-sm text-slate-600">
            Plan your fixed monthly commitments here. You can later compare this
            with your daily expenses to see savings potential.
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="rounded-full"
            >
              Back
            </Button>
            <Button type="submit" className="rounded-full gap-2">
              <Save className="w-4 h-4" />
              Save monthly plan
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
