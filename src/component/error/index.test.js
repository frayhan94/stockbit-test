import { render, screen } from '@testing-library/react'
import Index from './index'

it('displays the error', () => {
    render(<Index text={'error'}/>)
    const element = screen.getByTestId('error-wrapper')
    expect(screen.getByText('error')).toBeInTheDocument()
    expect(element).toBeInTheDocument()
})
