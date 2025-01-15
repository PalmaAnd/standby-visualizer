"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { InfoTooltip } from './InfoTooltip'

interface CostEstimationCalculatorProps {
  standbyType: 'cold' | 'warm' | 'hot'
  primaryOn: boolean
  secondaryOn: boolean
}

interface CloudProvider {
  name: string
  computeRates: Record<string, number>
  storageRates: Record<string, number>
  networkRates: Record<string, number>
}

const cloudProviders: CloudProvider[] = [
  {
    name: 'Generic',
    computeRates: { small: 0.1, medium: 0.2, large: 0.4 },
    storageRates: { ssd: 0.1, hdd: 0.05 },
    networkRates: { low: 0.05, medium: 0.1, high: 0.2 },
  },
  {
    name: 'AWS',
    computeRates: { small: 0.0116, medium: 0.0464, large: 0.0928 },
    storageRates: { ssd: 0.1, hdd: 0.045 },
    networkRates: { low: 0.05, medium: 0.09, high: 0.15 },
  },
  {
    name: 'Azure',
    computeRates: { small: 0.0208, medium: 0.0832, large: 0.1664 },
    storageRates: { ssd: 0.115, hdd: 0.05 },
    networkRates: { low: 0.05, medium: 0.08, high: 0.12 },
  },
  {
    name: 'Google Cloud',
    computeRates: { small: 0.0178, medium: 0.0712, large: 0.1424 },
    storageRates: { ssd: 0.17, hdd: 0.04 },
    networkRates: { low: 0.05, medium: 0.08, high: 0.12 },
  },
]

export function CostEstimationCalculator({ standbyType, primaryOn, secondaryOn }: CostEstimationCalculatorProps) {
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>(cloudProviders[0])
  const [instanceSize, setInstanceSize] = useState<'small' | 'medium' | 'large'>('small')
  const [storageType, setStorageType] = useState<'ssd' | 'hdd'>('ssd')
  const [networkUsage, setNetworkUsage] = useState<'low' | 'medium' | 'high'>('low')
  const [hours, setHours] = useState(720) // Default to 30 days
  const [storageSize, setStorageSize] = useState(100) // GB
  const [totalCost, setTotalCost] = useState(0)
  const [costBreakdown, setCostBreakdown] = useState<{ name: string; value: number }[]>([])
  const [costOverTime, setCostOverTime] = useState<{ name: string; cost: number }[]>([])

  useEffect(() => {
    const hourlyRate = cloudProvider.computeRates[instanceSize]
    const storageRate = cloudProvider.storageRates[storageType]
    const networkRate = cloudProvider.networkRates[networkUsage]

    let computeCost = 0
    let storageCost = 0
    let networkCost = 0

    if (primaryOn) {
      computeCost += hourlyRate * hours
      storageCost += storageRate * storageSize
      networkCost += networkRate * hours
    }

    if (secondaryOn) {
      computeCost += hourlyRate * hours
      storageCost += storageRate * storageSize
      networkCost += networkRate * hours
    } else if (standbyType === 'cold') {
      // Assume cold standby costs 10% of active instance
      computeCost += hourlyRate * hours * 0.1
      storageCost += storageRate * storageSize
    }

    const total = computeCost + storageCost + networkCost
    setTotalCost(Number(total.toFixed(2)))

    setCostBreakdown([
      { name: 'Compute', value: Number(computeCost.toFixed(2)) },
      { name: 'Storage', value: Number(storageCost.toFixed(2)) },
      { name: 'Network', value: Number(networkCost.toFixed(2)) },
    ])

    const timePoints = [1, 7, 30, 90, 180, 365].map(days => ({
      name: `${days} day${days > 1 ? 's' : ''}`,
      cost: Number(((computeCost / hours * 24 * days) + (storageCost / 30 * days) + (networkCost / hours * 24 * days)).toFixed(2))
    }))
    setCostOverTime(timePoints)

  }, [cloudProvider, standbyType, primaryOn, secondaryOn, instanceSize, storageType, networkUsage, hours, storageSize])

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
      <h3 className="text-lg font-medium mb-2">
        Cost Estimation
        <InfoTooltip content="Estimate costs based on your configuration and cloud provider" />
      </h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cloud-provider">Cloud Provider</Label>
          <Select value={cloudProvider.name} onValueChange={(value) => setCloudProvider(cloudProviders.find(cp => cp.name === value) || cloudProviders[0])}>
            <SelectTrigger id="cloud-provider">
              <SelectValue placeholder="Select cloud provider" />
            </SelectTrigger>
            <SelectContent>
              {cloudProviders.map((provider) => (
                <SelectItem key={provider.name} value={provider.name}>{provider.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="instance-size">Instance Size</Label>
          <Select value={instanceSize} onValueChange={(value) => setInstanceSize(value as 'small' | 'medium' | 'large')}>
            <SelectTrigger id="instance-size">
              <SelectValue placeholder="Select instance size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (${cloudProvider.computeRates.small}/hour)</SelectItem>
              <SelectItem value="medium">Medium (${cloudProvider.computeRates.medium}/hour)</SelectItem>
              <SelectItem value="large">Large (${cloudProvider.computeRates.large}/hour)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="storage-type">Storage Type</Label>
          <Select value={storageType} onValueChange={(value) => setStorageType(value as 'ssd' | 'hdd')}>
            <SelectTrigger id="storage-type">
              <SelectValue placeholder="Select storage type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ssd">SSD (${cloudProvider.storageRates.ssd}/GB/month)</SelectItem>
              <SelectItem value="hdd">HDD (${cloudProvider.storageRates.hdd}/GB/month)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="network-usage">Network Usage</Label>
          <Select value={networkUsage} onValueChange={(value) => setNetworkUsage(value as 'low' | 'medium' | 'high')}>
            <SelectTrigger id="network-usage">
              <SelectValue placeholder="Select network usage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (${cloudProvider.networkRates.low}/hour)</SelectItem>
              <SelectItem value="medium">Medium (${cloudProvider.networkRates.medium}/hour)</SelectItem>
              <SelectItem value="high">High (${cloudProvider.networkRates.high}/hour)</SelectItem>
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
          <Label htmlFor="storage-size">Storage Size (GB)</Label>
          <Input
            id="storage-size"
            type="number"
            value={storageSize}
            onChange={(e) => setStorageSize(Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <p className="text-lg font-semibold">Estimated Total Cost: {totalCost}€</p>
        </div>
        <div>
          <h4 className="text-md font-medium mb-2">Cost Breakdown</h4>
          <ul>
            {costBreakdown.map((item, index) => (
              <li key={index}>{item.name}: {item.value}€</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-md font-medium mb-2">Cost Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

