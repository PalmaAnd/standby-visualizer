"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Server, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RegionConfig {
    name: string
    primaryOn: boolean
    secondaryOn: boolean
    primaryHealthy: boolean
    secondaryHealthy: boolean
}

const regions = [
    'US East',
    'US West',
    'Europe',
    'Asia Pacific',
    'South America'
]

export function MultiRegionScenario() {
    const [activeRegions, setActiveRegions] = useState<RegionConfig[]>([
        { name: 'US East', primaryOn: true, secondaryOn: true, primaryHealthy: true, secondaryHealthy: true },
        { name: 'Europe', primaryOn: true, secondaryOn: true, primaryHealthy: true, secondaryHealthy: true },
    ])

    const toggleServer = (regionIndex: number, serverType: 'primary' | 'secondary', stateType: 'On' | 'Healthy') => {
        const newRegions = [...activeRegions]
        const key = `${serverType}${stateType}` as keyof RegionConfig
        newRegions[regionIndex] = { ...newRegions[regionIndex], [key]: !newRegions[regionIndex][key] }
        setActiveRegions(newRegions)
    }

    const simulateDisaster = () => {
        const newRegions = activeRegions.map(region => ({
            ...region,
            primaryOn: false,
            primaryHealthy: false,
        }))
        setActiveRegions(newRegions)
    }

    const addRegion = (regionName: string) => {
        if (activeRegions.length < 5 && !activeRegions.find(r => r.name === regionName)) {
            setActiveRegions([...activeRegions, {
                name: regionName,
                primaryOn: true,
                secondaryOn: true,
                primaryHealthy: true,
                secondaryHealthy: true
            }])
        }
    }

    const removeRegion = (regionIndex: number) => {
        setActiveRegions(activeRegions.filter((_, index) => index !== regionIndex))
    }

    const simulateFailover = () => {
        const newRegions = activeRegions.map(region => {
            if (!region.primaryOn || !region.primaryHealthy) {
                return {
                    ...region,
                    primaryOn: false,
                    primaryHealthy: false,
                    secondaryOn: true,
                    secondaryHealthy: true
                }
            }
            return region
        })
        setActiveRegions(newRegions)
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Multi-Region Disaster Recovery Scenario</h3>
            <div className="space-y-4">
                {activeRegions.map((region, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-semibold">{region.name}</h4>
                            <Button variant="outline" size="sm" onClick={() => removeRegion(index)}>Remove</Button>
                        </div>
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
            <div className="mt-4 space-y-2">
                <Select onValueChange={addRegion}>
                    <SelectTrigger>
                        <SelectValue placeholder="Add a region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regions.map(region => (
                            <SelectItem key={region} value={region} disabled={activeRegions.some(r => r.name === region)}>
                                {region}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex space-x-2">
                    <Button onClick={simulateDisaster} className="flex-1">Simulate Disaster</Button>
                    <Button onClick={simulateFailover} className="flex-1">Simulate Failover</Button>
                </div>
            </div>
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

