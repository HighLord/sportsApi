import React, { useEffect, useState, useRef } from "react";
import { useUser } from "./UserContext";
import AccountPopup from "./Account/AccountPopup";
import { refreshToken } from "../../api/refreshTokenApi"; 


export default function Topbar({ title = "Dashboard" }) {
	const { userData } = useUser();
	const [timeLeft, setTimeLeft] = useState("00:00:00");
	const timerRef = useRef( null );
	
	const [popupOpen, setPopupOpen] = useState(false);

	useEffect(() => {
		if (!userData?.token) return;

		const expiry = parseInt(userData.token, 10) * 1000;

		const updateTimer = () => {
			const now = Date.now();
			const diff = (expiry - now) / 1000;

			if (diff < 1) {
				setTimeLeft("00:00:00");
				return;
			}

			const hours = String(Math.floor(diff / (60 * 60))).padStart(2, "0");
			const minutes = String(Math.floor((diff / 60) % 60)).padStart(
				2,
				"0"
			);
			const seconds = String(Math.floor(diff % 60)).padStart(2, "0");

			setTimeLeft(`${hours}:${minutes}:${seconds}`);

			if (diff < 300 && timerRef.current) {
				timerRef.current.classList.add("show-tooltip");
				setTimeout(() => {
					timerRef.current?.classList.remove("show-tooltip");
				}, 30000);
			}
		};

		updateTimer();
		const interval = setInterval(updateTimer, 1000);

		return () => clearInterval(interval);
	}, [userData?.token]);

	useEffect(() => {
		if (!userData?.token) return;

		const expiry = parseInt(userData.token, 10) * 1000;
		const diff = (expiry - Date.now()) / 1000;

		if (diff > 0 && diff < 300) {
			const currentToken = localStorage.getItem("token");

			refreshToken(currentToken);
		}
	}, [userData?.token]);

	return (
		<header className="dash-topbar">
			<div className="topbar-title">{title}</div>

			<div className="topbar-actions">
				{userData && userData.token ? (
					<div
						ref={timerRef}
						className="logout-timer"
						data-tooltip="Time left in your session. Refresh if under 5 mins to stay logged in.">
						{timeLeft}
					</div>
				) : (
					<div className="logout-timer">--:--:--</div> // placeholder
				)}
				<input
					className="topbar-search"
					placeholder="Search API keys, endpoints..."
				/>
				{userData && (
					<div
						className="avatar"
						onClick={() => setPopupOpen(!popupOpen)}>
						{userData.email
							? userData.email.charAt(0).toUpperCase()
							: "?"}
					</div>
				)}
				<AccountPopup
					isOpen={
						popupOpen
					}
					onClose={() => setPopupOpen(false)}
				/>
			</div>
		</header>
	);
}
