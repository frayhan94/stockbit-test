import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
import faker from 'faker'
import { Provider } from 'react-redux'
import movieReducer from '../reducers/movieSlice'

const fakeStore = {
    movie: {
        listAllMovies: [
            {
                Poster: faker.image.imageUrl(),
                Title: faker.commerce.productName(),
                Type: 'movie',
                Year: faker.date.past().toString(),
                imdbID: faker.random.uuid(),
            },
        ],
        listSingleMovie: {
            Title: "Batman Begins",
            Year: "2005",
            Rated: "PG-13",
            Released: "15 Jun 2005",
            Runtime: "140 min",
            Genre: "Action, Adventure",
            Director: "Christopher Nolan",
            Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
            Actors: "Christian Bale, Michael Caine, Ken Watanabe",
            Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
            Language: "English, Mandarin",
            Country: "United Kingdom, United States",
            Awards: "Nominated for 1 Oscar. 13 wins & 79 nominations total",
            Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            Ratings: [
                {
                    Source: "Internet Movie Database",
                    Value: "8.2/10"
                },
                {
                    Source: "Rotten Tomatoes",
                    Value: "84%"
                },
                {
                    Source: "Metacritic",
                    Value: "70/100"
                }
            ],
            Metascore: 70,
            imdbRating: 8.2,
            imdbVotes: "1,356,866",
            imdbID: "tt0372784",
            Type: "movie",
            DVD: "18 Oct 2005",
            BoxOffice: "$206,852,432",
            Production: "Warner Brothers, Di Bonaventura Pictures",
            Website: "N/A",
            Response: "True"
        }
    }
}

function render(
    ui,
    {
        initialState,
        store = configureStore({
            reducer: { movie: movieReducer },
            preloadedState: initialState
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render, fakeStore }
