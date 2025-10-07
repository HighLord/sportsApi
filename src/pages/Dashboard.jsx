import { useEffect, useState } from "react";
import { useUser } from "../components/dashboard/UserContext";
import SportsCards from "../components/dashboard/SportsCards";
import Requests from "../components/dashboard/Requests";
import Activity from "../components/dashboard/Activity";
import News from "../components/dashboard/News";
import { useLocation } from "react-router-dom";
import { callStatusApi } from "../api/statusApi";

const loadingMessages = [
	"Checking session . . .",
	"Getting data . . .",
	"Loading data . . .",
	"Setting up . . .",
];

const Plans = [
    { id: 1, name: "Free" },
    { id: 2, name: "Standard" },
    { id: 3, name: "Pro" }
];

function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [valid, setValid] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);
	const [requestDone, setRequestDone] = useState(false);
	const { setUserData, userData } = useUser();
	const [retriesLeft, setRetriesLeft] = useState(10);
	const location = useLocation();

	const getUserPlan = () => {
		const planId = userData.plan || 1; // default to Free if no plan specified
		const plan = Plans.find((p) => p.id === planId);
		return plan ? plan.name : "Free";
	};

	useEffect(() => {
		if (messageIndex < loadingMessages.length) {
			const timer = setTimeout(() => {
				setMessageIndex((prev) => prev + 1);
			}, 700);

			return () => clearTimeout(timer);
		} else {
			if (requestDone && messageIndex === loadingMessages.length) {
				setLoading(false);
			}
		}
	}, [messageIndex, requestDone]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			window.location.href = "/";
			return;
		}

		const validate = async (retries = 10) => {
			try {
				const res = await callStatusApi(token);

				if (
					res.Status == 200 ||
					res.status == 200 ||
					res.Status === "200"
				) {
					setValid(true);
					setRequestDone(true);

					if (res) {
						setUserData(res);
					}
				} else {
					localStorage.removeItem("token");
					window.location.href = "/";
				}
			} catch (err) {
				console.log("Network Error", err);
				if (retries > 1) {
					setRetriesLeft(retries - 1);
					setTimeout(() => validate(retries - 1), 1000); // wait 2s then retry
				} else {
					localStorage.removeItem("token");
					window.location.href = "/login";
				}
			}
		};
		validate();
	}, [setUserData]);

	if (loading) {
		let displayMessage =
			messageIndex < loadingMessages.length
				? loadingMessages[messageIndex]
				: retriesLeft > 9
				? loadingMessages[3]
				: "Unable to connect, redirecting to login...";
		return (
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					flexDirection: "column",
					background: "#ffffffff",
					zIndex: 9999,
				}}>
				<div
					className="spinner"
					style={{
						width: "80px",
						height: "80px",
						border: "3px solid #f3f3f3",
						borderTop: "3px solid #3498db",
						borderBottom: "3px solid #3498db",
						borderRadius: "50%",
						animation: "spin 1.2s linear infinite",
					}}
				/>
				<p style={{ marginTop: "15px", fontSize: "14px" }}>
					{displayMessage}
				</p>
				<style>
					{`
                  	@keyframes spin {
                    	0% { transform: rotate(0deg); }
                    	100% { transform: rotate(360deg); }
                  	}
                `}
				</style>
			</div>
		);
	}

	if (!valid) {
		return null; // already redirected
	}

	return (
		<div className="dash-border">
			<h4>
				Hi, {userData.firstname}
				<span className="plan-badge">{getUserPlan()} Plan</span>
			</h4>
			{(location.pathname === "/dashboard" ||
				location.pathname.startsWith("/dashboard/account")) && (
					<>
						<SportsCards />
						<div className="dash-section-1">
							<Requests />
							<Activity />
						</div>
						<News />
					</>
				)}
		</div>
	);
}

export default Dashboard;
