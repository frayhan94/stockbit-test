import { render, screen } from '@testing-library/react'
import Index from './index'

it('displays the modal', () => {
    render(<Index />)
    const element = screen.getByTestId('modal-wrapper')
    expect(element).toBeInTheDocument()
})
