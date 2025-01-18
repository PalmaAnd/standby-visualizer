import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Controls } from '../app/components/Controls'
import { expect, jest } from '@jest/globals'
import { describe, it } from 'node:test'

describe('Controls', () => {
    const mockSetStandbyType = jest.fn()
    const mockSetPrimaryOn = jest.fn()
    const mockSetSecondaryOn = jest.fn()
    const mockSetPrimaryHealthy = jest.fn()
    const mockSetSecondaryHealthy = jest.fn()

    it('renders all standby type options', () => {
        render(
            <Controls
                standbyType="cold"
                setStandbyType={mockSetStandbyType}
                primaryOn={true}
                setPrimaryOn={mockSetPrimaryOn}
                secondaryOn={false}
                setSecondaryOn={mockSetSecondaryOn}
                primaryHealthy={true}
                setPrimaryHealthy={mockSetPrimaryHealthy}
                secondaryHealthy={true}
                setSecondaryHealthy={mockSetSecondaryHealthy}
            />
        )
        expect(screen.getByLabelText('Cold (7s)')).toBeInTheDocument()
        expect(screen.getByLabelText('Warm (4s)')).toBeInTheDocument()
        expect(screen.getByLabelText('Hot (2s)')).toBeInTheDocument()
    })

    it('calls setStandbyType when a new type is selected', () => {
        render(
            <Controls
                standbyType="cold"
                setStandbyType={mockSetStandbyType}
                primaryOn={true}
                setPrimaryOn={mockSetPrimaryOn}
                secondaryOn={false}
                setSecondaryOn={mockSetSecondaryOn}
                primaryHealthy={true}
                setPrimaryHealthy={mockSetPrimaryHealthy}
                secondaryHealthy={true}
                setSecondaryHealthy={mockSetSecondaryHealthy}
            />
        )
        fireEvent.click(screen.getByLabelText('Warm (4s)'))
        expect(mockSetStandbyType).toHaveBeenCalledWith('warm')
    })
})

