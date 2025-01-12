"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CostEstimationCalculatorProps {
    standbyType: 'cold' | 'warm' | 'hot'
    primaryOn: boolean
    secondaryOn: boolean
}

const hourlyRates = {
    small: 0.1,
    medium: 0.2,
    large: 0.4,
}

export function CostEstimationCalculator({ standbyType, primaryOn, secondaryOn }: CostEstimationCalculatorProps) {
    const [instanceSize, setInstanceSize] = useState<'small' | 'medium' | 'large'>('small')
    const [hours, setHours] = useState(720) // Default to 30 days
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        const hourlyRate = hourlyRates[instanceSize]
        let cost = 0

        if (primaryOn) {
            cost += hourlyRate * hours
        }

        if (secondaryOn) {
            cost += hourlyRate * hours
        } else if (standbyType === 'cold') {
            // Assume cold standby costs 10% of active instance
            cost += hourlyRate * hours * 0.1
        }

        setTotalCost(Number(cost.toFixed(2)))
    }, [standbyType, primaryOn, secondaryOn, instanceSize, hours])

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Cost Estimation</h3>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="instance-size">Instance Size</Label>
                    <Select value={instanceSize} onValueChange={(value) => setInstanceSize(value as 'small' | 'medium' | 'large')}>
                        <SelectTrigger id="instance-size">
                            <SelectValue placeholder="Select instance size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="small">Small ($0.10/hour)</SelectItem>
                            <SelectItem value="medium">Medium ($0.20/hour)</SelectItem>
                            <SelectItem value="large">Large ($0.40/hour)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="hours">Number of Hours</Label>
                    <Input
                        id="hours"
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        min={1}
                    />
                </div>
                <div>
                    <p className="text-lg font-semibold">Estimated Cost: ${totalCost}</p>
                </div>
            </div>
        </div>
    )
}

