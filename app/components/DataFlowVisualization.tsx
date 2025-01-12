"use client"

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, AlertTriangle } from 'lucide-react'

interface DataFlowVisualizationProps {
    standbyType: 'cold' | 'warm' | 'hot'
    primaryOn: boolean
    secondaryOn: boolean
    primaryHealthy: boolean
    secondaryHealthy: boolean
}

export function DataFlowVisualization({
    standbyType,
    primaryOn,
    secondaryOn,
    primaryHealthy,
    secondaryHealthy
}: DataFlowVisualizationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number

        const drawDataPacket = (x: number, y: number, color: string) => {
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(x, y, 5, 0, 2 * Math.PI)
            ctx.fill()
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (primaryOn && secondaryOn) {
                const time = Date.now() / 1000
                const x = canvas.width / 2 + Math.cos(time * 2) * (canvas.width / 4)
                const y = canvas.height / 2

                if (standbyType === 'hot') {
                    drawDataPacket(x, y, 'rgba(0, 0, 255, 0.7)')
                } else if (standbyType === 'warm') {
                    drawDataPacket(canvas.width / 2, y, 'rgba(255, 165, 0, 0.7)')
                }
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [standbyType, primaryOn, secondaryOn])

    return (
        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 flex justify-around items-center">
                <ServerIcon label="Primary" isOn={primaryOn} isHealthy={primaryHealthy} />
                <ServerIcon label="Secondary" isOn={secondaryOn} isHealthy={secondaryHealthy} />
            </div>
        </div>
    )
}

function ServerIcon({ label, isOn, isHealthy }: { label: string; isOn: boolean; isHealthy: boolean }) {
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

