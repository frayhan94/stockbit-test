import { render, screen } from '@testing-library/react'
import Index from './index'

it('displays the loading', () => {
    render(<Index text={'loading'}/>)
    const element = screen.getByTestId('loading-wrapper')
    expect(screen.getByText('loading')).toBeInTheDocument()
    expect(element).toBeInTheDocument()
})
