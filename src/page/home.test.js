import Home from './home'
import { fakeStore, render, screen } from '../utils/test-utils'

test('Home, given initial render with data', () => {
    render(<Home />, { initialState: fakeStore })
    expect(screen.getByAltText('movie_poster_thumbnail')).toBeInTheDocument();
})
