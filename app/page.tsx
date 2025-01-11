"use client"

import { useState, useEffect } from 'react'
import { StandbyVisualization } from './components/StandbyVisualization'
import { Controls } from './components/Controls'
import { Legend } from './components/Legend'
import { SystemLogs } from './components/SystemLogs'
import { Timeline } from './components/Timeline'
import { PredefinedScenarios } from './components/PredefinedScenarios'
import { PerformanceMetrics } from './components/PerformanceMetrics'

export default function Home() {
  const [standbyType, setStandbyType] = useState<'cold' | 'warm' | 'hot'>('cold')
  const [primaryOn, setPrimaryOn] = useState(true)
  const [secondaryOn, setSecondaryOn] = useState(false)
  const [primaryHealthy, setPrimaryHealthy] = useState(true)
  const [secondaryHealthy, setSecondaryHealthy] = useState(true)
  const [timelineEvents, setTimelineEvents] = useState<Array<{ timestamp: Date; event: string; type: 'primary' | 'secondary' | 'system' }>>([])

  useEffect(() => {
    if (standbyType === 'cold') {
      setSecondaryOn(false)
    }
  }, [standbyType])

  useEffect(() => {
    const newEvent = {
      timestamp: new Date(),
      event: `Standby type changed to ${standbyType}`,
      type: 'system' as const
    }
    setTimelineEvents(prev => [newEvent, ...prev])
  }, [standbyType])

  useEffect(() => {
    const newEvent = {
      timestamp: new Date(),
      event: `Primary server ${primaryOn ? 'started' : 'stopped'}`,
      type: 'primary' as const
    }
    setTimelineEvents(prev => [newEvent, ...prev])
  }, [primaryOn])

  useEffect(() => {
    const newEvent = {
      timestamp: new Date(),
      event: `Secondary server ${secondaryOn ? 'started' : 'stopped'}`,
      type: 'secondary' as const
    }
    setTimelineEvents(prev => [newEvent, ...prev])
  }, [secondaryOn])

  const handleScenarioSelect = (scenario: string) => {
    switch (scenario) {
      case 'primary-failure':
        setPrimaryOn(false)
        setPrimaryHealthy(false)
        setSecondaryOn(true)
        setSecondaryHealthy(true)
        break
      case 'load-balancing':
        setStandbyType('hot')
        setPrimaryOn(true)
        setSecondaryOn(true)
        setPrimaryHealthy(true)
        setSecondaryHealthy(true)
        break
      case 'disaster-recovery':
        setPrimaryOn(false)
        setPrimaryHealthy(false)
        setSecondaryOn(true)
        setSecondaryHealthy(true)
        setStandbyType('cold')
        break
      case 'maintenance':
        setPrimaryOn(false)
        setPrimaryHealthy(true)
        setSecondaryOn(true)
        setSecondaryHealthy(true)
        setStandbyType('warm')
        break
      case 'random':
        setPrimaryOn(Math.random() < 0.5)
        setSecondaryOn(Math.random() < 0.5)
        setPrimaryHealthy(Math.random() < 0.8)
        setSecondaryHealthy(Math.random() < 0.8)
        setStandbyType(['cold', 'warm', 'hot'][Math.floor(Math.random() * 3)] as 'cold' | 'warm' | 'hot')
        break
    }
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Legend />
            <PerformanceMetrics
              standbyType={standbyType}
              primaryOn={primaryOn}
              secondaryOn={secondaryOn}
            />
          </div>
          <Timeline events={timelineEvents} />
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
          <PredefinedScenarios onScenarioSelect={handleScenarioSelect} />
          <SystemLogs
            standbyType={standbyType}
            primaryOn={primaryOn}
            secondaryOn={secondaryOn}
            primaryHealthy={primaryHealthy}
            secondaryHealthy={secondaryHealthy}
          />
        </div>
      </div>
    </main>
  )
}

