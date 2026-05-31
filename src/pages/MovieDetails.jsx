import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/moviedetails.css";

const API_KEY = "49b59c69";

const fallbackMovieDetails = {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Runtime: "152 min",
    Rated: "UA",
    imdbRating: "9.0",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    Language: "English",
    Country: "USA, UK",
    Type: "movie",
    Plot:
        "When Gotham is threatened by chaos, Batman faces the Joker in a gripping battle that tests heroism, order, and sacrifice.",
    Poster:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
};

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}`
                );
                const data = await response.json();

                if (data.Response === "True") {
                    setMovie({
                        ...data,
                        Poster:
                            data.Poster !== "N/A" ? data.Poster : fallbackMovieDetails.Poster,
                    });
                } else {
                    setMovie(fallbackMovieDetails);
                    setError("OMDb key is not working, so fallback details are shown.");
                }
            } catch {
                setMovie(fallbackMovieDetails);
                setError("API failed, so fallback details are shown.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div className="details-status">Loading movie details...</div>;
    }

    if (!movie) {
        return <div className="details-status error">Movie details not found.</div>;
    }

    return (
        <div className="details-page">
            <nav className="details-nav">
                <Link to="/" className="logo-link">
                    <h1 className="logo">NETFLIX</h1>
                </Link>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </nav>

            {error && <p className="details-status error">{error}</p>}

            <div className="details-container">
                <div className="details-poster">
                    <img src={movie.Poster} alt={movie.Title} />
                </div>

                <div className="details-info">
                    <p className="details-type">{movie.Type}</p>
                    <h1>{movie.Title}</h1>

                    <div className="details-meta">
                        <span>{movie.Year}</span>
                        <span>{movie.Runtime}</span>
                        <span>{movie.Rated}</span>
                        <span>⭐ {movie.imdbRating}</span>
                    </div>

                    <p className="details-plot">{movie.Plot}</p>

                    <div className="details-block">
                        <strong>Genre:</strong> {movie.Genre}
                    </div>
                    <div className="details-block">
                        <strong>Director:</strong> {movie.Director}
                    </div>
                    <div className="details-block">
                        <strong>Actors:</strong> {movie.Actors}
                    </div>
                    <div className="details-block">
                        <strong>Language:</strong> {movie.Language}
                    </div>
                    <div className="details-block">
                        <strong>Country:</strong> {movie.Country}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
