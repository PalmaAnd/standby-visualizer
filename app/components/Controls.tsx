"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { InfoTooltip } from './InfoTooltip'

interface ControlsProps {
  standbyType: 'cold' | 'warm' | 'hot'
  setStandbyType: (type: 'cold' | 'warm' | 'hot') => void
  primaryOn: boolean
  setPrimaryOn: (on: boolean) => void
  secondaryOn: boolean
  setSecondaryOn: (on: boolean) => void
  primaryHealthy: boolean
  setPrimaryHealthy: (healthy: boolean) => void
  secondaryHealthy: boolean
  setSecondaryHealthy: (healthy: boolean) => void
}

export function Controls({
  standbyType,
  setStandbyType,
  primaryOn,
  setPrimaryOn,
  secondaryOn,
  setSecondaryOn,
  primaryHealthy,
  setPrimaryHealthy,
  secondaryHealthy,
  setSecondaryHealthy
}: ControlsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Controls</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Standby Type</h3>
          <RadioGroup value={standbyType} onValueChange={(value) => setStandbyType(value as 'cold' | 'warm' | 'hot')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cold" id="cold" />
              <Label htmlFor="cold">Cold (7s)</Label>
              <InfoTooltip content="Secondary server is offline and only starts when the primary fails." />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="warm" id="warm" />
              <Label htmlFor="warm">Warm (4s)</Label>
              <InfoTooltip content="Secondary server is running but not processing requests until promoted." />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hot" id="hot" />
              <Label htmlFor="hot">Hot (instant)</Label>
              <InfoTooltip content="Both servers are active and processing requests simultaneously." />
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Server Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="primary-switch">Primary Server</Label>
                <InfoTooltip content="Toggle the primary server on/off" />
              </div>
              <Switch
                id="primary-switch"
                checked={primaryOn}
                onCheckedChange={setPrimaryOn}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="secondary-switch">Secondary Server</Label>
                <InfoTooltip content="Toggle the secondary server on/off (disabled for Cold standby)" />
              </div>
              <Switch
                id="secondary-switch"
                checked={secondaryOn}
                onCheckedChange={setSecondaryOn}
                disabled={standbyType === 'cold'}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Server Health</h3>
          <div className="space-y-2">
            <div className="flex items-center mb-1">
              <span className="text-sm text-gray-600">Simulate server health issues</span>
              <InfoTooltip content="Toggle server health to simulate failures and recovery" />
            </div>
            <Button
              onClick={() => setPrimaryHealthy(!primaryHealthy)}
              variant={primaryHealthy ? "outline" : "destructive"}
              className="w-full"
            >
              {primaryHealthy ? "Set Primary Unhealthy" : "Set Primary Healthy"}
            </Button>
            <Button
              onClick={() => setSecondaryHealthy(!secondaryHealthy)}
              variant={secondaryHealthy ? "outline" : "destructive"}
              className="w-full"
              disabled={!secondaryOn}
            >
              {secondaryHealthy ? "Set Secondary Unhealthy" : "Set Secondary Healthy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

