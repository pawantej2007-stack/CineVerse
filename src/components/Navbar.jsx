import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ search, setSearch, handleSubmit }) {
    return (
        <nav className="navbar">
            <Link to="/" className="logo-link">
                <h1 className="logo">CineVerse</h1>
            </Link>

            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search movies"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    );
}

export default Navbar;
