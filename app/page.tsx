"use client"

import { useState, useEffect } from 'react'
import { StandbyVisualization } from '@/components/StandbyVisualization'
import { Controls } from '@/components/Controls'
import { Legend } from '@/components/Legend'
import { SystemLogs } from '@/components/SystemLogs'

export default function Home() {
  const [standbyType, setStandbyType] = useState<'cold' | 'warm' | 'hot'>('cold')
  const [primaryOn, setPrimaryOn] = useState(true)
  const [secondaryOn, setSecondaryOn] = useState(false)
  const [primaryHealthy, setPrimaryHealthy] = useState(true)
  const [secondaryHealthy, setSecondaryHealthy] = useState(true)

  useEffect(() => {
    if (standbyType === 'cold') {
      setSecondaryOn(false)
    }
  }, [standbyType])

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Standby System Visualization</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <StandbyVisualization
            standbyType={standbyType}
            primaryOn={primaryOn}
            secondaryOn={secondaryOn}
            primaryHealthy={primaryHealthy}
            secondaryHealthy={secondaryHealthy}
          />
          <Legend />
          <SystemLogs
            standbyType={standbyType}
            primaryOn={primaryOn}
            secondaryOn={secondaryOn}
            primaryHealthy={primaryHealthy}
            secondaryHealthy={secondaryHealthy}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <Controls
            standbyType={standbyType}
            setStandbyType={setStandbyType}
            primaryOn={primaryOn}
            setPrimaryOn={setPrimaryOn}
            secondaryOn={secondaryOn}
            setSecondaryOn={setSecondaryOn}
            primaryHealthy={primaryHealthy}
            setPrimaryHealthy={setPrimaryHealthy}
            secondaryHealthy={secondaryHealthy}
            setSecondaryHealthy={setSecondaryHealthy}
          />
        </div>
      </div>
    </main>
  )
}

