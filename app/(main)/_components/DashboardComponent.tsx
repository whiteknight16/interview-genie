"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  Briefcase,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function DashboardComponent({ insights }) {
  const salaryData = insights.salaryRanges.map((range) => ({
    role: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (demandLevel) => {
    switch (demandLevel.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const marketOutlook = getMarketOutlookInfo(insights.marketOutlook);
  const demandLevelColor = getDemandLevelColor(insights.demandLevel);
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-8 px-6 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Badge className="text-sm dark:text-white text-black dark:bg-gray-800 bg-gray-200 dark:border-gray-600 border-gray-300 px-3 py-1">
          Last Updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Market Outlook */}
        <Card className="dark:bg-gray-900 bg-white shadow-lg dark:border-gray-700 border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg dark:text-white text-gray-900">
              Market Outlook
            </CardTitle>
            <marketOutlook.icon className={`h-5 w-5 ${marketOutlook.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold dark:text-white text-gray-900">
              {insights.marketOutlook}
            </div>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Next Update: {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth */}
        <Card className="dark:bg-gray-900 bg-white shadow-lg dark:border-gray-700 border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg dark:text-white text-gray-900">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold dark:text-white text-gray-900">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress
              value={insights.growthRate}
              className="mt-3 dark:bg-gray-700 bg-gray-300"
            />
          </CardContent>
        </Card>

        {/* Demand Level */}
        <Card className="dark:bg-gray-900 bg-white shadow-lg dark:border-gray-700 border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg dark:text-white text-gray-900">
              Demand Level
            </CardTitle>
            <Briefcase className={`h-5 w-5 ${marketOutlook.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold dark:text-white text-gray-900">
              {insights.demandLevel}
            </div>
            <div
              className={`h-2 w-full rounded-full mt-3 ${demandLevelColor}`}
            ></div>
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card className="dark:bg-gray-900 bg-white shadow-lg dark:border-gray-700 border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg dark:text-white text-gray-900">
              Top Skills
            </CardTitle>
            <Brain className={`h-5 w-5 ${marketOutlook.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 text-sm dark:bg-gray-800 bg-gray-100 dark:text-gray-300 text-gray-800"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Trends Section */}
      <div className="dark:bg-gray-800 bg-gray-100 p-6 rounded-lg dark:border-gray-700 border-gray-200 shadow-lg">
        <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-3">
          Key Trends
        </h3>
        <ul className="list-disc list-inside dark:text-gray-300 text-gray-700">
          {insights.keyTrends.map((trend, index) => (
            <li key={index} className="text-sm">
              {trend}
            </li>
          ))}
        </ul>
      </div>
      {/* Recomended Skills Section */}
      <div className="dark:bg-gray-800 bg-gray-100 p-6 rounded-lg dark:border-gray-700 border-gray-200 shadow-lg">
        <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-3">
          Recommend Skills
        </h3>
        <ul className="list-disc list-inside dark:text-gray-300 text-gray-700">
          {insights.recommendedSkills.map((skills, index) => (
            <li key={index} className="text-sm">
              {skills}
            </li>
          ))}
        </ul>
      </div>

      {/* Graph Section */}
      <div className="pb-14">
        <Card className="dark:bg-gray-900 bg-white shadow-lg dark:border-gray-700 border-gray-200">
          <CardHeader>
            <CardTitle className="dark:text-white text-gray-900">
              Salary Ranges By Roles
            </CardTitle>
            <CardDescription className="dark:text-gray-400 text-gray-600">
              Displaying minimum, maximum, and median salary ranges for various
              roles (in LPA).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                  margin={{ top: 10, right: 20, left: 20, bottom: 50 }}
                >
                  {/* Grid */}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="dark:stroke-gray-700 stroke-gray-300"
                  />
                  {/* X Axis */}
                  <XAxis
                    dataKey="role"
                    className="dark:text-gray-300 text-gray-800"
                    tick={{ fill: "currentColor" }}
                    tickFormatter={(role) =>
                      role.length > 15 ? role.substring(0, 10) + "..." : role
                    } // Truncate if length > 10
                  />
                  {/* Y Axis */}
                  <YAxis
                    className="dark:text-gray-300 text-gray-800"
                    tick={{ fill: "currentColor" }}
                    label={{
                      value: "Salary (in ₹ LPA)",
                      angle: -90,
                      position: "insideLeft",
                      dy: 60,
                      fill: "currentColor",
                      className: "dark:text-gray-300 text-gray-800",
                    }}
                  />
                  {/* Tooltip */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                      color: "#E5E7EB",
                    }}
                    itemStyle={{ color: "#E5E7EB" }}
                    cursor={{ fill: "rgba(255,255,255,0.1)" }}
                  />
                  {/* Legend */}
                  <Legend className="dark:text-gray-300 text-gray-800" />
                  {/* Bars */}
                  <Bar dataKey="min" fill="#EF4444" name="Min Salary" />
                  <Bar dataKey="median" fill="#3B82F6" name="Median Salary" />
                  <Bar dataKey="max" fill="#10B981" name="Max Salary" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardComponent;
