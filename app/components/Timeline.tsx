"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimelineEvent {
    timestamp: Date
    event: string
    type: 'primary' | 'secondary' | 'system'
}

interface TimelineProps {
    events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
    const [sortedEvents, setSortedEvents] = useState<TimelineEvent[]>([])

    useEffect(() => {
        setSortedEvents([...events].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()))
    }, [events])

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Timeline</h3>
            <div className="h-40 overflow-y-auto">
                {sortedEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center mb-2"
                    >
                        <div className={`w-3 h-3 rounded-full mr-2 ${getEventColor(event.type)}`} />
                        <span className="text-sm text-gray-500 mr-2">
                            {event.timestamp.toLocaleTimeString()}:
                        </span>
                        <span className="text-sm">{event.event}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function getEventColor(type: 'primary' | 'secondary' | 'system') {
    switch (type) {
        case 'primary':
            return 'bg-blue-500'
        case 'secondary':
            return 'bg-green-500'
        case 'system':
            return 'bg-yellow-500'
    }
}

