"use client"

import { useState } from 'react'
import { DataFlowVisualization } from './DataFlowVisualization'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface StandbyConfig {
    standbyType: 'cold' | 'warm' | 'hot' | 'custom'
    primaryOn: boolean
    secondaryOn: boolean
    primaryHealthy: boolean
    secondaryHealthy: boolean
}

const defaultConfigs: Record<string, StandbyConfig> = {
    cold: { standbyType: 'cold', primaryOn: true, secondaryOn: false, primaryHealthy: true, secondaryHealthy: true },
    warm: { standbyType: 'warm', primaryOn: true, secondaryOn: true, primaryHealthy: true, secondaryHealthy: true },
    hot: { standbyType: 'hot', primaryOn: true, secondaryOn: true, primaryHealthy: true, secondaryHealthy: true },
    custom: { standbyType: 'cold', primaryOn: true, secondaryOn: false, primaryHealthy: true, secondaryHealthy: true },
}

export function ComparisonMode() {
    const [configs, setConfigs] = useState<StandbyConfig[]>([
        defaultConfigs.cold,
        defaultConfigs.hot,
    ])
    const [newConfig, setNewConfig] = useState<StandbyConfig>(defaultConfigs.cold)

    const addConfig = () => {
        setConfigs([...configs, newConfig])
    }

    const updateConfig = (index: number, key: keyof StandbyConfig, value: unknown) => {
        const newConfigs = [...configs]
        newConfigs[index] = { ...newConfigs[index], [key]: value }
        setConfigs(newConfigs)
    }

    const updateNewConfig = (key: keyof StandbyConfig, value: unknown) => {
        setNewConfig({ ...newConfig, [key]: value })
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Comparison Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {configs.map((config, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Configuration {index + 1}</h3>
                        <Select
                            value={config.standbyType}
                            onValueChange={(value) => updateConfig(index, 'standbyType', value as StandbyConfig['standbyType'])}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select standby type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cold">Cold Standby</SelectItem>
                                <SelectItem value="warm">Warm Standby</SelectItem>
                                <SelectItem value="hot">Hot Standby</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="mt-2">
                            <DataFlowVisualization {...config} />
                        </div>
                    </div>
                ))}
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add Configuration</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Configuration</DialogTitle>
                    </DialogHeader>
                    <Select
                        value={newConfig.standbyType}
                        onValueChange={(value) => updateNewConfig('standbyType', value as StandbyConfig['standbyType'])}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select configuration type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cold">Cold Standby</SelectItem>
                            <SelectItem value="warm">Warm Standby</SelectItem>
                            <SelectItem value="hot">Hot Standby</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>
                    {newConfig.standbyType === 'custom' && (
                        <div className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="primary-on">Primary Server On</Label>
                                <Switch
                                    id="primary-on"
                                    checked={newConfig.primaryOn}
                                    onCheckedChange={(checked) => updateNewConfig('primaryOn', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="secondary-on">Secondary Server On</Label>
                                <Switch
                                    id="secondary-on"
                                    checked={newConfig.secondaryOn}
                                    onCheckedChange={(checked) => updateNewConfig('secondaryOn', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="primary-healthy">Primary Server Healthy</Label>
                                <Switch
                                    id="primary-healthy"
                                    checked={newConfig.primaryHealthy}
                                    onCheckedChange={(checked) => updateNewConfig('primaryHealthy', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="secondary-healthy">Secondary Server Healthy</Label>
                                <Switch
                                    id="secondary-healthy"
                                    checked={newConfig.secondaryHealthy}
                                    onCheckedChange={(checked) => updateNewConfig('secondaryHealthy', checked)}
                                />
                            </div>
                        </div>
                    )}
                    <Button onClick={() => { addConfig(); }}>Add</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

