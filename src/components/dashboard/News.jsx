// src/components/dashboard/News.jsx
import "./news.css";
import { useEffect, useState } from "react";

function fromUnix(unix) {
	return new Date(unix * 1000); // backend gives seconds, JS expects ms
}

function timeAgo(unixTimestamp) {
	const date = fromUnix(unixTimestamp);
	const now = new Date();
	const seconds = Math.floor((now - date) / 1000);

	if (seconds < 5) return "just now";
	if (seconds < 60) return `${seconds}s ago`;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days < 30) return `${days}d ago`;
	const months = Math.floor(days / 30);
	if (months < 12) return `${months}mo ago`;
	const years = Math.floor(months / 12);
	return `${years}y ago`;
}

export default function News() {
	const [now, setNow] = useState(Date.now()); // ✅ keep both

	// update every 1s
	useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(interval);
	}, []);

	const newsItems = [
		{
			text: "⚾ New update: API v1.0 now supports Baseball live stats.",
			time: 1759242600,
		},
		{
			text: "⚽ Football endpoints optimized for faster responses.",
			time: 1759231997,
		},
		{
			text: "🏀 NBA preseason analytics data available.",
			time: 1759191997,
		},
		{ text: "API v1.0 is Live", time: 1759141997 },
	];

	return (
		<div className="news-box">
			<h3 className="news-title">Latest News</h3>
			<div className="news-feed">
				{newsItems.map((item, index) => (
					<div className="news-item" key={index}>
						<p className="news-text">{item.text}</p>
						<span className="news-time">{timeAgo(item.time)}</span>
					</div>
				))}
			</div>
		</div>
	);
}
