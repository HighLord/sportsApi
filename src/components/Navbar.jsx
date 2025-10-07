import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const isHomePage = location.pathname === "/";
	const isPricing = location.pathname === "/pricing";
	const isLogin = location.pathname === "/login";
	const isRegister = location.pathname === "/register";
    const isDocs = location.pathname === "/docs";
    const isContact = location.pathname === "/contact";
	return (
		<nav className="navbar">
			<div className="logo">⚽ SportsAPI</div>

			{/* Hamburger Button (Mobile Only) */}
			<button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? "✕" : "☰"}
			</button>
			{/* Nav Links */}
			<ul className={`nav-links ${isOpen ? "open" : ""}`}>
				{(!isLogin && !isRegister) && (
					<Link to="/login" onClick={() => setIsOpen(false)}>
						<button className="btn-login">Login</button>
					</Link>
				)}
				{!isHomePage && (
					<li>
						<Link to="/" onClick={() => setIsOpen(false)}>
							Home
						</Link>
					</li>
				)}
				{!isPricing && (
					<li>
						<Link to="/pricing" onClick={() => setIsOpen(false)}>
							Pricing
						</Link>
					</li>
				)}
				{!isContact && (
					<li>
						<Link to="/contact" onClick={() => setIsOpen(false)}>
							Contact
						</Link>
					</li>
				)}
				{!isDocs && (
					<li>
						<Link to="/docs" onClick={() => setIsOpen(false)}>
							Documentation
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
