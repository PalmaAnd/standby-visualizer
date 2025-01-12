"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, ArrowRight, AlertTriangle } from 'lucide-react'

interface StandbyVisualizationProps {
  standbyType: 'cold' | 'warm' | 'hot'
  primaryOn: boolean
  secondaryOn: boolean
  primaryHealthy: boolean
  secondaryHealthy: boolean
}

export function StandbyVisualization({
  standbyType,
  primaryOn,
  secondaryOn,
  primaryHealthy,
  secondaryHealthy
}: StandbyVisualizationProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkPosition, setCheckPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCheckPosition((prev) => (prev === 0 ? 1 : 0))
    }, getStandbyInterval(standbyType) * 1000)

    return () => clearInterval(interval)
  }, [standbyType])

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex justify-around items-center h-64 relative">
        <ServerComponent label="Primary" isOn={primaryOn} isHealthy={primaryHealthy} />
        <ArrowComponent standbyType={standbyType} primaryOn={primaryOn} secondaryOn={secondaryOn} primaryHealthy={false} secondaryHealthy={false} />
        <ServerComponent label="Secondary" isOn={secondaryOn} isHealthy={secondaryHealthy} />
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-semibold">{standbyType.charAt(0).toUpperCase() + standbyType.slice(1)} Standby</h2>
        <p className="mt-2">{getStandbyDescription(standbyType)}</p>
        <p className="mt-2">Check Interval: {getStandbyInterval(standbyType)} seconds</p>
      </div>
    </div>
  )
}

function ServerComponent({ label, isOn, isHealthy }: { label: string; isOn: boolean; isHealthy: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ scale: isOn ? 1 : 0.8, opacity: isOn ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Server size={64} className={isOn ? (isHealthy ? "text-green-500" : "text-yellow-500") : "text-gray-400"} />
        <AnimatePresence>
          {!isHealthy && isOn && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2"
            >
              <AlertTriangle size={24} className="text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <span className="mt-2 font-semibold">{label}</span>
      <span className={`mt-1 ${isOn ? (isHealthy ? "text-green-500" : "text-yellow-500") : "text-red-500"}`}>
        {isOn ? (isHealthy ? "Healthy" : "Unhealthy") : "Offline"}
      </span>
    </div>
  )
}

function ArrowComponent({ standbyType, primaryOn, secondaryOn }: StandbyVisualizationProps) {
  const getArrowColor = () => {
    if (!primaryOn) return "text-gray-300"
    if (standbyType === 'hot') return "text-green-500"
    if (standbyType === 'warm' && secondaryOn) return "text-yellow-500"
    return "text-gray-300"
  }

  return (
    <motion.div
      animate={{
        x: [0, 20, 0],
        opacity: primaryOn && (standbyType === 'hot' || (standbyType === 'warm' && secondaryOn)) ? 1 : 0.3
      }}
      transition={{
        x: { repeat: Infinity, duration: 1.5 },
        opacity: { duration: 0.3 }
      }}
    >
      <ArrowRight size={48} className={getArrowColor()} />
    </motion.div>
  )
}

function getStandbyDescription(standbyType: 'cold' | 'warm' | 'hot') {
  switch (standbyType) {
    case 'cold':
      return "Secondary server is offline and only starts when the primary fails."
    case 'warm':
      return "Secondary server is running but not processing requests until promoted."
    case 'hot':
      return "Both servers are active and processing requests simultaneously."
  }
}

function getStandbyInterval(standbyType: 'cold' | 'warm' | 'hot') {
  switch (standbyType) {
    case 'cold':
      return 7
    case 'warm':
      return 4
    case 'hot':
      return 2
  }
}

