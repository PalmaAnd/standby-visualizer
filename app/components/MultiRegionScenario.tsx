"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Server, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface RegionConfig {
    name: string
    primaryOn: boolean
    secondaryOn: boolean
    primaryHealthy: boolean
    secondaryHealthy: boolean
}

export function MultiRegionScenario() {
    const [regions, setRegions] = useState<RegionConfig[]>([
        { name: 'US East', primaryOn: true, secondaryOn: true, primaryHealthy: true, secondaryHealthy: true },
        { name: 'Europe', primaryOn: true, secondaryOn: true, primaryHealthy: true, secondaryHealthy: true },
    ])

    const toggleServer = (regionIndex: number, serverType: 'primary' | 'secondary', stateType: 'On' | 'Healthy') => {
        const newRegions = [...regions]
        const key = `${serverType}${stateType}` as keyof RegionConfig
        newRegions[regionIndex] = { ...newRegions[regionIndex], [key]: !newRegions[regionIndex][key] }
        setRegions(newRegions)
    }

    const simulateDisaster = () => {
        const newRegions = regions.map(region => ({
            ...region,
            primaryOn: false,
            primaryHealthy: false,
        }))
        setRegions(newRegions)
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Multi-Region Disaster Recovery Scenario</h3>
            <div className="space-y-4">
                {regions.map((region, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                        <h4 className="text-md font-semibold mb-2">{region.name}</h4>
                        <div className="flex justify-around items-center">
                            <ServerIcon
                                label="Primary"
                                isOn={region.primaryOn}
                                isHealthy={region.primaryHealthy}
                                onToggleOn={() => toggleServer(index, 'primary', 'On')}
                                onToggleHealth={() => toggleServer(index, 'primary', 'Healthy')}
                            />
                            <ArrowRight className="text-gray-400" />
                            <ServerIcon
                                label="Secondary"
                                isOn={region.secondaryOn}
                                isHealthy={region.secondaryHealthy}
                                onToggleOn={() => toggleServer(index, 'secondary', 'On')}
                                onToggleHealth={() => toggleServer(index, 'secondary', 'Healthy')}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={simulateDisaster} className="mt-4">Simulate Disaster</Button>
        </div>
    )
}

function ServerIcon({ label, isOn, isHealthy, onToggleOn, onToggleHealth }: {
    label: string
    isOn: boolean
    isHealthy: boolean
    onToggleOn: () => void
    onToggleHealth: () => void
}) {
    return (
        <div className="flex flex-col items-center">
            <motion.div
                animate={{ scale: isOn ? 1 : 0.8, opacity: isOn ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer"
                onClick={onToggleOn}
            >
                <Server size={48} className={isOn ? (isHealthy ? "text-green-500" : "text-yellow-500") : "text-gray-400"} />
                {isOn && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 cursor-pointer"
                        animate={{ backgroundColor: isHealthy ? "#22c55e" : "#ef4444" }}
                        onClick={(e) => { e.stopPropagation(); onToggleHealth(); }}
                    />
                )}
            </motion.div>
            <span className="mt-2 text-sm">{label}</span>
        </div>
    )
}

