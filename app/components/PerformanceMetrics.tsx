"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PerformanceMetricsProps {
    standbyType: 'cold' | 'warm' | 'hot'
    primaryOn: boolean
    secondaryOn: boolean
}

export function PerformanceMetrics({ standbyType, primaryOn, secondaryOn }: PerformanceMetricsProps) {
    const [responseTime, setResponseTime] = useState(0)
    const [throughput, setThroughput] = useState(0)

    useEffect(() => {
        // Simulate performance metrics based on the current system state
        const baseResponseTime = 100 // ms
        const baseThroughput = 1000 // requests per second

        let responseTimeFactor = 1
        let throughputFactor = 1

        if (standbyType === 'hot' && primaryOn && secondaryOn) {
            responseTimeFactor = 0.7
            throughputFactor = 1.8
        } else if (standbyType === 'warm' && primaryOn && secondaryOn) {
            responseTimeFactor = 0.9
            throughputFactor = 1.2
        } else if (!primaryOn && secondaryOn) {
            responseTimeFactor = 1.2
            throughputFactor = 0.8
        }

        setResponseTime(Math.round(baseResponseTime * responseTimeFactor))
        setThroughput(Math.round(baseThroughput * throughputFactor))
    }, [standbyType, primaryOn, secondaryOn])

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="text-sm font-medium text-gray-500">Response Time</h4>
                    <motion.div
                        key={responseTime}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold"
                    >
                        {responseTime} ms
                    </motion.div>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-500">Throughput</h4>
                    <motion.div
                        key={throughput}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold"
                    >
                        {throughput} req/s
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

