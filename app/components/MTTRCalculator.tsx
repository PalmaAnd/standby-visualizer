"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoTooltip } from './InfoTooltip'

export function MTTRCalculator() {
    const [detectionTime, setDetectionTime] = useState(5)
    const [diagnosisTime, setDiagnosisTime] = useState(10)
    const [repairTime, setRepairTime] = useState(30)
    const [testingTime, setTestingTime] = useState(15)

    const totalMTTR = detectionTime + diagnosisTime + repairTime + testingTime

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">
                MTTR Calculator
                <InfoTooltip content="Calculate the Mean Time To Recovery for your system" />
            </h3>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="detection-time">Detection Time (minutes)</Label>
                    <Input
                        id="detection-time"
                        type="number"
                        value={detectionTime}
                        onChange={(e) => setDetectionTime(Number(e.target.value))}
                        min={0}
                    />
                </div>
                <div>
                    <Label htmlFor="diagnosis-time">Diagnosis Time (minutes)</Label>
                    <Input
                        id="diagnosis-time"
                        type="number"
                        value={diagnosisTime}
                        onChange={(e) => setDiagnosisTime(Number(e.target.value))}
                        min={0}
                    />
                </div>
                <div>
                    <Label htmlFor="repair-time">Repair Time (minutes)</Label>
                    <Input
                        id="repair-time"
                        type="number"
                        value={repairTime}
                        onChange={(e) => setRepairTime(Number(e.target.value))}
                        min={0}
                    />
                </div>
                <div>
                    <Label htmlFor="testing-time">Testing Time (minutes)</Label>
                    <Input
                        id="testing-time"
                        type="number"
                        value={testingTime}
                        onChange={(e) => setTestingTime(Number(e.target.value))}
                        min={0}
                    />
                </div>
                <div>
                    <p className="text-lg font-semibold">Total MTTR: {totalMTTR} minutes</p>
                </div>
            </div>
        </div>
    )
}

