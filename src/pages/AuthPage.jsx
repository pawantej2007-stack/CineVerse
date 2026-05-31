import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const DEMO_USER = {
  name: "Pratik",
  email: "demo@CineVerse.com",
  password: "Demo@123",
};

function AuthPage({ setIsLoggedIn }) {
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (isSignup && !formData.name)) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    if (isSignup) {
      setIsLoggedIn(true);
      navigate("/");
      return;
    }

    if (
      formData.email === DEMO_USER.email &&
      formData.password === DEMO_USER.password
    ) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setErrorMessage("Invalid demo credentials. Please use the demo login shown below.");
    }
  };

  const fillDemoCredentials = () => {
    setErrorMessage("");
    setIsSignup(false);
    setFormData({
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      password: DEMO_USER.password,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-box">
        <h1 className="auth-logo">CineVerse</h1>

        <div className="auth-card">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          <p className="auth-subtitle">
            {isSignup
              ? "Create your account to enter the movie experience."
              : "Sign in to continue to your movie dashboard."}
          </p>

          {!isSignup && (
            <div className="demo-credentials">
              <p><strong>Demo Email:</strong> {DEMO_USER.email}</p>
              <p><strong>Demo Password:</strong> {DEMO_USER.password}</p>
              <button
                type="button"
                className="demo-fill-btn"
                onClick={fillDemoCredentials}
              >
                Use Demo Credentials
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {errorMessage && <p className="auth-error">{errorMessage}</p>}

            <button type="submit" className="auth-btn">
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            {isSignup ? "Already have an account?" : "New to CineVerse?"}{" "}
            <span
              onClick={() => {
                setIsSignup(!isSignup);
                setErrorMessage("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
