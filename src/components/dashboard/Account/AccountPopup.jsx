import { useState } from "react";
import { useUser } from "../UserContext";
import "./accountPopup.css";

import Details from "./Details";
import EmailHistory from "./EmailHistory";
import ChangePassword from "./ChangePassword";
import Security from "./Security";

export default function AccountPopup({ isOpen }) {
    const { userData } = useUser();
	const [activeSection, setActiveSection] = useState(null);

	const menuItems = [
		{ id: "details", icon: "👤", label: "Account Details" },
		{ id: "email", icon: "📧", label: "Email History" },
		{ id: "password", icon: "🔑", label: "Change Password" },
		{ id: "security", icon: "🔒", label: "Security Settings" },
	];

	if (!isOpen) return null;

	return (
		<div className={`account-popup-overlay ${isOpen ? "active" : ""}`}>
			<div className="account-popup" onClick={(e) => e.stopPropagation()}>
				<div className="popup-avatar">
					<div className="avatar-circle">
						{userData && userData?.email
							? userData.email.charAt(0).toUpperCase()
							: "?"}
					</div>
					<div className="user-info">
						<h4>
							{userData &&
								userData.firstname + " " + userData.lastname}
						</h4>
						<span>{userData && userData.email}</span>
					</div>
				</div>
				<button
					className="back-button"
					onClick={() => setActiveSection(null)}
					style={{
						display: activeSection ? "block" : "none",
					}}>
					↩
				</button>
				<nav className="popup-content">
					{!activeSection && menuItems.map((item) => (
						<div
							key={item.id}
							className={`popup-link ${
								activeSection === item.id ? "active" : ""
							}`}
							onClick={() => setActiveSection(item.id)}>
							<span className="popup-icon">{item.icon}</span>
							{item.label}
						</div>
					))}
				</nav>
				<div className="popup-section">
					{activeSection === "details" && <Details />}
					{activeSection === "email" && <EmailHistory />}
					{activeSection === "password" && <ChangePassword />}
					{activeSection === "security" && <Security />}
				</div>
			</div>
		</div>
	);
}