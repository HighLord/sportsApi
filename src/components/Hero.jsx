import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
	return (
		<section className="hero">
			<h1>The Sports API for Football, Basketball, Tennis, and More</h1>
			<p>
				Access past results, live scores, and upcoming fixtures.
				Real-time data powered by WebSockets, with global coverage.
			</p>
			<div className="hero-buttons">
				<Link to="/register">
					<button className="btn-primary">Register</button>
				</Link>
				<Link to="/pricing">
					<button className="btn-secondary">View Pricing</button>
				</Link>
			</div>
		</section>
	);
}

export default Hero;
