"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PredefinedScenariosProps {
    onScenarioSelect: (scenario: string) => void
}

export function PredefinedScenarios({ onScenarioSelect }: PredefinedScenariosProps) {
    const scenarios = [
        { value: 'primary-failure', label: 'Primary Server Failure' },
        { value: 'load-balancing', label: 'Load Balancing' },
        { value: 'disaster-recovery', label: 'Disaster Recovery' },
        { value: 'maintenance', label: 'Scheduled Maintenance' },
    ]

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Predefined Scenarios</h3>
            <div className="flex items-center space-x-2">
                <Select onValueChange={onScenarioSelect}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select scenario" />
                    </SelectTrigger>
                    <SelectContent>
                        {scenarios.map((scenario) => (
                            <SelectItem key={scenario.value} value={scenario.value}>
                                {scenario.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={() => onScenarioSelect('random')}>Random Scenario</Button>
            </div>
        </div>
    )
}

