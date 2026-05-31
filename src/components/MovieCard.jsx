import { Link } from "react-router-dom";
import "../styles/moviecard.css";

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.imdbID}`} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="card-overlay">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <span>{movie.Type}</span>
            </div>
        </Link>
    );
}

export default MovieCard;
