"use client"

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const performanceData = {
    cold: {
        responseTime: 180,
        throughput: 500,
        availability: 99.5,
        costPerHour: 10,
        recoveryTime: 120
    },
    warm: {
        responseTime: 80,
        throughput: 1000,
        availability: 99.9,
        costPerHour: 25,
        recoveryTime: 15
    },
    hot: {
        responseTime: 30,
        throughput: 2000,
        availability: 99.999,
        costPerHour: 50,
        recoveryTime: 1
    },
}

const metricLabels = {
    responseTime: "Response Time (ms)",
    throughput: "Throughput (req/s)",
    availability: "Availability (%)",
    costPerHour: "Cost per Hour ($)",
    recoveryTime: "Recovery Time (min)"
}

const metricLabelsColors = {
    responseTime: "#277da1",
    throughput: "#43aa8b",
    availability: "#90be6d",
    costPerHour: "#f9c74f",
    recoveryTime: "#f3722c"
}

export function PerformanceComparisonDashboard() {
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["responseTime", "throughput"])

    const data = Object.entries(performanceData).map(([type, metrics]) => ({
        type,
        ...metrics,
    }))

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Performance Comparison Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Select
                        onValueChange={(value) => setSelectedMetrics(value.split(','))}
                        defaultValue={selectedMetrics.join(',')}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select metrics to compare" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="responseTime,throughput">Response Time & Throughput</SelectItem>
                            <SelectItem value="availability,costPerHour">Availability & Cost</SelectItem>
                            <SelectItem value="throughput,recoveryTime">Throughput & Recovery Time</SelectItem>
                            <SelectItem value="responseTime,throughput,availability,costPerHour,recoveryTime">All Metrics</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        {selectedMetrics.map((metric, index) => (
                            <Bar
                                key={metric}
                                yAxisId={index % 2 === 0 ? "left" : "right"}
                                dataKey={metric}
                                fill={metricLabelsColors[metric as keyof typeof metricLabels]}
                                name={metricLabels[metric as keyof typeof metricLabels]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

