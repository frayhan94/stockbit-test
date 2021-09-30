import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Loading from '../component/loading/index';
import axios from "axios";
import {API_KEY, BASE_URL} from '../constant';
import '../App.css';
import {
    useParams
} from "react-router-dom";

import {
    setLoading,
    getSingleMovie,
    selectLoading,
    selectSingleMovie,
} from '../reducers/movieSlice';


function Detail() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const movieSingle = useSelector(selectSingleMovie);
    const movieSingleLoading = useSelector(selectLoading);


    useEffect(() => {
        setLoading(false)
        axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${id}`)
            .then((response)=> {
                dispatch(getSingleMovie(response.data));
            })
            .catch((error) => {

            }).finally(() => {
                setLoading(false)
        })
    }, [dispatch,id]);


    if(movieSingleLoading) {
        return (
            <Loading text={'Loading...'} />
        )
    }

    const {
        Poster,
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Ratings,
        Metascore,
        imdbRating,
        imdbVotes,
        imdbID,
        Type,
        DVD,
        BoxOffice,
        Production,
        Website
    } = movieSingle
    return (
        <div className={'Detail-Wrapper'}>
            <a href={'/'} style={{
                marginBottom: '10px'
            }}>
                Back
            </a>
            <img src={Poster} alt={'movie_poster_thumbnail_detail'}/>
            <div className={'Item-Text'}>Title: {Title}</div>
            <div className={'Item-Text'}>Year: {Year}</div>
            <div className={'Item-Text'}>Rated: {Rated}</div>
            <div className={'Item-Text'}>Released: {Released}</div>
            <div className={'Item-Text'}>Runtime: {Runtime}</div>
            <div className={'Item-Text'}>Runtime: {Runtime}</div>
            <div className={'Item-Text'}>Genre: {Genre}</div>
            <div className={'Item-Text'}>Director: {Director}</div>
            <div className={'Item-Text'}>Writer: {Writer}</div>
            <div className={'Item-Text'}>Actors: {Actors}</div>
            <div className={'Item-Text'}>Plot: {Plot}</div>
            <div className={'Item-Text'}>Language: {Language}</div>
            <div className={'Item-Text'}>Country: {Country}</div>
            <div className={'Item-Text'}>Awards: {Awards}</div>
            <ul className={'Item-Text'}>Rating
            {
                Ratings && Ratings.map((value) => {
                    const {
                        Source,
                        Value
                    } = value;
                    return (
                        <li className={'Item-Text'}>
                            <div className={'Item-Text'}>
                                {Source}
                            </div>
                            <div className={'Item-Text'}>
                                {Value}
                            </div>
                        </li>
                    )
                })
            }
            </ul>
            <div className={'Item-Text'}>Metascore: {Metascore}</div>
            <div className={'Item-Text'}>imdbRating: {imdbRating}</div>
            <div className={'Item-Text'}>imdbVotes: {imdbVotes}</div>
            <div className={'Item-Text'}>imdbID: {imdbID}</div>
            <div className={'Item-Text'}>Type: {Type}</div>
            <div className={'Item-Text'}>DVD: {DVD}</div>
            <div className={'Item-Text'}>BoxOffice: {BoxOffice}</div>
            <div className={'Item-Text'}>Production: {Production}</div>
            <div className={'Item-Text'}>Website: {Website}</div>
        </div>
    );

}


export default Detail;
