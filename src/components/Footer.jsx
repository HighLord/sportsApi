import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<p>© {new Date().getFullYear()} SportsAPI. All rights reserved.</p>
			<div className="footer-links">
				<a href="/contact">Contact</a>
				<a href="/docs">Documentation</a>
				<a href="/pricing">Pricing</a>
			</div>
		</footer>
	);
}

export default Footer;
