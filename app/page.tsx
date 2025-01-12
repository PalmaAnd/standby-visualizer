"use client"

import { useState, useEffect } from 'react'
import { StandbyVisualization } from '@/components/StandbyVisualization'
import { Controls } from '@/components/Controls'
import { Legend } from '@/components/Legend'
import { SystemLogs } from '@/components/SystemLogs'
import { Timeline } from '@/components/Timeline'
import { PredefinedScenarios } from '@/components/PredefinedScenarios'
import { PerformanceMetrics } from '@/components/PerformanceMetrics'
import { DataFlowVisualization } from '@/components/DataFlowVisualization'
import { ComparisonMode } from '@/components/ComparisonMode'
import { CostEstimationCalculator } from '@/components/CostEstimationCalculator'
import { MultiRegionScenario } from '@/components/MultiRegionScenario'

export default function Home() {
  const [standbyType, setStandbyType] = useState<'cold' | 'warm' | 'hot'>('cold')
  const [primaryOn, setPrimaryOn] = useState(true)
  const [secondaryOn, setSecondaryOn] = useState(false)
  const [primaryHealthy, setPrimaryHealthy] = useState(true)
  const [secondaryHealthy, setSecondaryHealthy] = useState(true)
  const [timelineEvents, setTimelineEvents] = useState<Array<{ timestamp: Date; event: string; type: 'primary' | 'secondary' | 'system' }>>([])
  const [showComparison, setShowComparison] = useState(false)

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

  useEffect(() => {
    let timer: NodeJS.Timeout

    const handleFailover = () => {
      if (!primaryOn || !primaryHealthy) {
        if (standbyType === 'cold') {
          timer = setTimeout(() => {
            setSecondaryOn(true)
            addTimelineEvent('Secondary server activated (Cold Standby)', 'system')
          }, 7000)
        } else if (standbyType === 'warm') {
          timer = setTimeout(() => {
            setSecondaryOn(true)
            addTimelineEvent('Secondary server activated (Warm Standby)', 'system')
          }, 4000)
        } else if (standbyType === 'hot') {
          timer = setTimeout(() => {
            addTimelineEvent('Secondary server handling all requests (Hot Standby)', 'system')
          }, 2000)
        }
      }
    }

    handleFailover()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [primaryOn, primaryHealthy, standbyType])

  const addTimelineEvent = (event: string, type: 'primary' | 'secondary' | 'system') => {
    setTimelineEvents(prev => [{
      timestamp: new Date(),
      event,
      type
    }, ...prev])
  }

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
          {showComparison ? (
            <ComparisonMode />
          ) : (
            <>
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
              <CostEstimationCalculator
                standbyType={standbyType}
                primaryOn={primaryOn}
                secondaryOn={secondaryOn}
              />
              <MultiRegionScenario />
            </>
          )}
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
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? "Hide Comparison Mode" : "Show Comparison Mode"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

