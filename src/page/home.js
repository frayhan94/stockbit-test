import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react";
import '../App.css';
import Modal from '../component/modal/index';
import axios from "axios";
import Error from '../component/error/index';
import Loading from '../component/loading/index';
import Empty from '../component/empty/index';
import {API_KEY, BASE_URL} from '../constant';
import {
    setLoading,
    setLoadingMore,
    selectAllMovie,
    getAllMovie as getAllMovieSlice,
    selectLoading,
    selectLoadingMore
} from '../reducers/movieSlice';
function Home() {

    const initialFetchType = 'initial';
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [fetchType, setFetchType] = useState(initialFetchType);
    const [search, setSearch] = useState('Batman');
    const [error, setError] = useState(false);

    const allMovie = useSelector(selectAllMovie);
    const movieCount = useSelector((state) => state.movie.count);
    const movieLoading = useSelector(selectLoading);
    const movieLoadingLoadMore = useSelector(selectLoadingMore);


    const [modalPoster, setModalPoster] = useState(null);

    function handleScroll() {
        /** Only perform this if total result more than 5 */
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
            setFetchType('loadMore');
            setPage(page + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page]);

    const getAllMovie = (fetchType=initialFetchType) => {

        fetchType === initialFetchType ? setLoading(true) : setLoadingMore(true)

        axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${search || 'Batman'}&page=${page}`)
            .then((response)=> {
                /**
                 * Merge existing with new one
                 *
                 * @todo only push to the state if search exist
                 */
                dispatch(getAllMovieSlice(
                    page === 1 ? response.data.Search : [...allMovie,...response.data.Search]
                ));
            })
            .catch((error) => {
                setError(true);
            }).finally(() => {
                fetchType === initialFetchType ? setLoading(true) : setLoadingMore(true)
        });
    };

    useEffect(() => {
        getAllMovie(fetchType);

    }, [page]);

    if(movieLoading) {
        return (
            <Loading text={'Loading...'} />
        )
    }

    console.log('allMovie',allMovie);

    return (
        <div className="App">
            {
                modalPoster && (
                        <Modal
                            img={modalPoster}
                            onClose={() => {
                                setModalPoster(null);
                            }}
                        />
                )
            }
            {
                error && (
                    <Error text={'Ada masalah sedang terjadi. Harap bersabar'}/>
                )
            }

            {
                allMovie.length === 0 && (
                    <Empty text={'Movie tidak di temukan'} />
                )
            }
            <div style={{marginBottom: '30px'}}>
                <input
                    placeholder={'Search by movie title'}
                    style={{
                        padding: '6px',
                        marginTop: '8px',
                        marginRight: '16px',
                        fontSize: '17px'
                    }}
                    className={'Search'}
                    type={'text'}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <input
                    onClick={()=> {
                        /**
                         * Reset search to page 1
                         */
                        setPage(1);
                    }}
                    type={'button'}
                    value={'Search'}
                />
            </div>
            {
                allMovie.length > 0 &&  allMovie.map((value) => {
                    const {
                        Poster,
                        Title,
                        Type,
                        Year,
                        imdbID
                    } = value;
                    return (
                        <div className={'Movie-Wrapper'} key={imdbID}>
                            <div style={{ marginRight: '20px'}}>
                                <img
                                    alt={'movie_poster_thumbnail'}
                                    onClick={() => {
                                        setModalPoster(Poster);
                                    }}
                                    src={Poster}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <div className={'Movie-Description-Wrapper'}>
                                <div className={'Item-Text'}>
                                    Title: {Title}
                                </div>
                                <div className={'Item-Text'}>
                                    Type: {Type}
                                </div>
                                <div className={'Item-Text'}>
                                    Year: {Year}
                                </div>
                                <div className={'Item-Text'}>
                                    ImdbID: {imdbID}
                                </div>

                                <div className={'Item-Text'}>
                                    <a href={`/detail/${imdbID}`}>
                                        Lihat Detail
                                    </a>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
            {
                movieLoadingLoadMore && (
                    <Loading text={'Muat Lebih'} />
                )
            }
        </div>
    );
}

export default Home;
