import React from 'react'
import { render, screen } from '@testing-library/react'
import { StandbyVisualization } from '../app/components/StandbyVisualization'
import { describe, it } from 'node:test'
import { expect } from '@jest/globals'

describe('StandbyVisualization', () => {
    it('renders the correct standby type', () => {
        render(
            <StandbyVisualization
                standbyType="cold"
                primaryOn={true}
                secondaryOn={false}
                primaryHealthy={true}
                secondaryHealthy={true}
            />
        )
        expect(screen.getByText('Cold Standby')).toBeInTheDocument()
    })

    it('displays correct server status', () => {
        render(
            <StandbyVisualization
                standbyType="hot"
                primaryOn={true}
                secondaryOn={true}
                primaryHealthy={true}
                secondaryHealthy={false}
            />
        )
        expect(screen.getByText('Primary')).toBeInTheDocument()
        expect(screen.getByText('Secondary')).toBeInTheDocument()
        expect(screen.getByText('Healthy')).toBeInTheDocument()
        expect(screen.getByText('Unhealthy')).toBeInTheDocument()
    })
})