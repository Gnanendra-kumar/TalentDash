"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const CURRENCIES = ["INR", "USD", "GBP", "EUR"] as const;

type Currency = (typeof CURRENCIES)[number];

export default function ToolsPage() {
  const [salary, setSalary] = useState(1200000);
  const [taxRate, setTaxRate] = useState(25);
  const [hikeRate, setHikeRate] = useState(15);
  const [currency, setCurrency] = useState<Currency>("INR");

  const salaryInBase = Math.round(salary * 100);
  const taxAmount = useMemo(
    () => Math.round((salaryInBase * taxRate) / 100),
    [salaryInBase, taxRate]
  );
  const netSalary = salaryInBase - taxAmount;
  const hikeAmount = useMemo(
    () => Math.round((salaryInBase * hikeRate) / 100),
    [salaryInBase, hikeRate]
  );
  const newSalary = salaryInBase + hikeAmount;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-[32px] border border-[#EBEBEB] bg-white p-8 shadow-[0_20px_50px_rgba(13,42,76,0.08)]">
        <h1 className="text-3xl font-bold text-[#111827]">Tools</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#525252]">
          Use TalentDash tools to estimate net salary after tax and calculate the impact of a pay hike.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-[32px] border border-[#EBEBEB] bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[#111827]">Salary & Tax Calculator</h2>
            <p className="mt-2 text-sm text-[#525252]">
              Estimate tax and net take-home pay from your gross salary.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#374151]">
              Currency
            </label>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as Currency)}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#FF5A5F]"
            >
              {CURRENCIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-[#374151]">
              Gross salary
            </label>
            <input
              type="number"
              value={salary}
              onChange={(event) => setSalary(Number(event.target.value))}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#FF5A5F]"
            />

            <label className="block text-sm font-medium text-[#374151]">
              Tax rate (%)
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={taxRate}
              onChange={(event) => setTaxRate(Number(event.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-[#525252]">
              <span>Applied tax rate</span>
              <span>{taxRate}%</span>
            </div>

            <div className="rounded-[24px] bg-[#F7F7F7] p-4">
              <div className="grid gap-3 text-sm text-[#374151]">
                <div className="flex items-center justify-between">
                  <span>Gross salary</span>
                  <span>{formatCurrency(salaryInBase, currency)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated tax</span>
                  <span>{formatCurrency(taxAmount, currency)}</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-[#111827]">
                  <span>Net salary</span>
                  <span>{formatCurrency(netSalary, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#EBEBEB] bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[#111827]">Hike Calculator</h2>
            <p className="mt-2 text-sm text-[#525252]">
              Calculate your new salary after a percentage pay hike.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#374151]">
              Currency
            </label>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as Currency)}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#FF5A5F]"
            >
              {CURRENCIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-[#374151]">
              Current salary
            </label>
            <input
              type="number"
              value={salary}
              onChange={(event) => setSalary(Number(event.target.value))}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#FF5A5F]"
            />

            <label className="block text-sm font-medium text-[#374151]">
              Hike percentage (%)
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={hikeRate}
              onChange={(event) => setHikeRate(Number(event.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-[#525252]">
              <span>Hike percentage</span>
              <span>{hikeRate}%</span>
            </div>

            <div className="rounded-[24px] bg-[#F7F7F7] p-4">
              <div className="grid gap-3 text-sm text-[#374151]">
                <div className="flex items-center justify-between">
                  <span>Current salary</span>
                  <span>{formatCurrency(salaryInBase, currency)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hike amount</span>
                  <span>{formatCurrency(hikeAmount, currency)}</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-[#111827]">
                  <span>New salary</span>
                  <span>{formatCurrency(newSalary, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
