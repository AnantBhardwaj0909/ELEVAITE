'use client';
import { BadgeIcon, Brain, Briefcase, LineChart, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import {format,formatDistanceToNow} from "date-fns";
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



const DashboardView = ({ insights }) => {
  const salaryData=insights.salaryRanges.map((range)=>({
    name:range.role,
    min:range.min/1000,
    max:range.max/1000,
    median:range.median/1000,
  }));

  const getDemandLevelColor=(level)=>{
    switch(level.toLowerCase()){
      case 'low':
        return "bg-red-500";
      case 'medium':
        return "bg-yellow-500";
      case 'high':
        return "bg-green-500";
      default:
        return "bg-gray-500";
  }
  };
  const getMarketOutlookInfo=(outlook)=>{
    switch(outlook.toLowerCase()){
      case 'positive':
        return {icon:TrendingUp, color:"text-green-500"};
      case 'negative':
        return {icon:TrendingDown, color:"text-red-500"};
      case 'neutral':
        return {icon:LineChart,color:"text-yellow-500"};
      default:
        return {icon:LineChart,color:"text-gray-500"};
      }
  };
  const OutlookIcon=getMarketOutlookInfo(insights.marketOutlook).icon;
  const OutlookColor=getMarketOutlookInfo(insights.marketOutlook).color;
  
  const lastUpdatedDate=format(new Date(insights.lastUpdated),"dd/MM/yyyy");
  const nextUpdateDistance=formatDistanceToNow(
    new Date(insights.nextUpdate),
    {addSuffix: true}
  );

  return(
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <Badge variant="outline">Last Updated:{lastUpdatedDate}</Badge>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Market Outlook</CardTitle>
        <OutlookIcon className={`h-4 w-4 ${OutlookColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{insights.marketOutlook}</div>
        <p className="text-xs text-muted-foreground mt-1">
          Next Update: {nextUpdateDistance}
        </p>
      </CardContent>
    </Card>

    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Demand Level</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{insights.demandLevel}</div>
        <div
          className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`}
        ></div>
        {/* <Progress value={insights.demandLevel} className="mt-2" /> */}
        <p className="text-xs text-muted-foreground pt-2">
          Next Update: {nextUpdateDistance}
        </p>
      </CardContent>
    </Card>

    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Industry Growth</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{insights.growthRate.toFixed(1)}%</div>
        <Progress value={insights.growthRate} className="mt-2" />
      </CardContent>
    </Card>

    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Top Skills</CardTitle>
        <Brain className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {insights.topSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="hover:scale-105 transition-transform duration-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
    </div>
    <Card>
      <CardHeader className="flex flex-center items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Salary Range By Role</CardTitle>
        <CardDescription>
          Displaying minimum,median, and maximum salaries (in thousands)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[400px]'>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salaryData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm">
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
        <Bar dataKey="min" fill="#cce3de" name="Min Salary (K)" />     // soft mint green
        <Bar dataKey="median" fill="#a4c3b2" name="Median Salary (K)" /> // muted sage
        <Bar dataKey="max" fill="#6b9080" name="Max Salary (K)" />     // deep eucalyptus

        </BarChart>
      </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Top Skills</CardTitle>
        <Brain className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {insights.topSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="hover:scale-105 transition-transform duration-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
    <Card>
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default DashboardView;
