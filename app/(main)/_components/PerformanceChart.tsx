"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="dark:bg-gray-900 bg-white shadow-md dark:border-gray-700">
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="dark:stroke-gray-700"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  date.length > 5 ? date.slice(0, 5) + "..." : date
                }
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis
                domain={[0, 100]}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium dark:text-gray-200">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
