"use client"

import { useEffect, useState } from 'react'

interface Log {
    timestamp: Date
    message: string
}

interface SystemLogsProps {
    standbyType: 'cold' | 'warm' | 'hot'
    primaryOn: boolean
    secondaryOn: boolean
    primaryHealthy: boolean
    secondaryHealthy: boolean
}

export function SystemLogs({ standbyType, primaryOn, secondaryOn, primaryHealthy, secondaryHealthy }: SystemLogsProps) {
    const [logs, setLogs] = useState<Log[]>([])

    useEffect(() => {
        const newLog: Log = {
            timestamp: new Date(),
            message: `Standby type changed to ${standbyType}`
        }
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 9)])
    }, [standbyType])

    useEffect(() => {
        const newLog: Log = {
            timestamp: new Date(),
            message: `Primary server ${primaryOn ? 'started' : 'stopped'}`
        }
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 9)])
    }, [primaryOn])

    useEffect(() => {
        const newLog: Log = {
            timestamp: new Date(),
            message: `Secondary server ${secondaryOn ? 'started' : 'stopped'}`
        }
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 9)])
    }, [secondaryOn])

    useEffect(() => {
        const newLog: Log = {
            timestamp: new Date(),
            message: `Primary server health: ${primaryHealthy ? 'Healthy' : 'Unhealthy'}`
        }
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 9)])
    }, [primaryHealthy])

    useEffect(() => {
        const newLog: Log = {
            timestamp: new Date(),
            message: `Secondary server health: ${secondaryHealthy ? 'Healthy' : 'Unhealthy'}`
        }
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 9)])
    }, [secondaryHealthy])

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">System Logs</h3>
            <div className="h-40 overflow-y-auto">
                {logs.map((log, index) => (
                    <div key={index} className="text-sm mb-1">
                        <span className="text-gray-500">{log.timestamp.toLocaleTimeString()}: </span>
                        {log.message}
                    </div>
                ))}
            </div>
        </div>
    )
}

