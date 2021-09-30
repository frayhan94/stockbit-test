import { render, screen } from '@testing-library/react'
import Index from './index'

it('displays the empty', () => {
    render(<Index text={'empty'}/>)
    const element = screen.getByTestId('empty-wrapper')
    expect(screen.getByText('empty')).toBeInTheDocument()
    expect(element).toBeInTheDocument()
})
