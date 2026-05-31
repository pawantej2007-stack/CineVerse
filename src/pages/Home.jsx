import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import "../styles/home.css";

const API_KEY = "49b59c69";

const fallbackMovies = [
    {
        imdbID: "tt0468569",
        Title: "The Dark Knight",
        Year: "2008",
        Type: "movie",
        Poster:
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    },
    {
        imdbID: "tt4154796",
        Title: "Avengers: Endgame",
        Year: "2019",
        Type: "movie",
        Poster:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    },
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Type: "movie",
        Poster:
            "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    },
    {
        imdbID: "tt0816692",
        Title: "Interstellar",
        Year: "2014",
        Type: "movie",
        Poster:
            "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
    },
    {
        imdbID: "tt0120737",
        Title: "The Lord of the Rings",
        Year: "2001",
        Type: "movie",
        Poster:
            "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Type: "movie",
        Poster:
            "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
    },
];

function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("batman");
    const [query, setQuery] = useState("batman");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
                );
                const data = await response.json();

                if (data.Response === "True") {
                    const cleanedMovies = data.Search.map((movie, index) => ({
                        ...movie,
                        Poster:
                            movie.Poster !== "N/A"
                                ? movie.Poster
                                : fallbackMovies[index % fallbackMovies.length].Poster,
                    }));
                    setMovies(cleanedMovies);
                } else {
                    setMovies(fallbackMovies);
                    setError("OMDb key is not working, so fallback movies are shown.");
                }
            } catch {
                setMovies(fallbackMovies);
                setError("API failed, so fallback movies are shown.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setQuery(search.trim());
        }
    };

    const featuredMovie = movies[0] || fallbackMovies[0];

    return (
        <div className="home-page">
            <header
                className="hero"
                style={{
                    backgroundImage: `url(${featuredMovie.Poster})`,
                }}
            >
                <Navbar
                    search={search}
                    setSearch={setSearch}
                    handleSubmit={handleSubmit}
                />

                <div className="hero-content">
                    <p className="hero-label">Featured Title</p>
                    <h1>{featuredMovie.Title}</h1>
                    <p className="hero-description">
                        Discover blockbuster movies, timeless classics, and binge-worthy
                        content in a premium Netflix-inspired React app.
                    </p>

                    <div className="hero-buttons">
                        <Link to={`/movie/${featuredMovie.imdbID}`} className="play-btn">
                            ▶ More Details
                        </Link>
                        <button className="info-btn">Browse</button>
                    </div>
                </div>
            </header>

            <main className="content">
                <section className="row-section">
                    <div className="row-header">
                        <h2>Popular Results</h2>
                        <span>Search: {query}</span>
                    </div>

                    {loading && <p className="status-message">Loading movies...</p>}
                    {error && !loading && <p className="status-message error">{error}</p>}

                    {!loading && (
                        <div className="movie-row">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} key={movie.imdbID} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Home;
