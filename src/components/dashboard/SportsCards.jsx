import React from "react";
import "./sports-cards.css"; // separate styling file

const mockUsage = [
	{ sport: "Football", percent: 72, icon: "⚽" },
	{ sport: "Basketball", percent: 45, icon: "🏀" },
	{ sport: "Baseball", percent: 30, icon: "⚾" },
	{ sport: "Tennis", percent: 4, icon: "🎾" },
	{ sport: "Ice Hockey", percent: 54, icon: "🏒" },
];

export default function SportsCards({ data = mockUsage }) {
	return (
		<div className="sports-grid">
			{data.map((item) => (
				<div key={item.sport} className="sport-card">
					<div className="sport-header">
						<p>{item.icon}</p>
						<p>{item.sport}</p>
                    </div>
                    <div>
                        <span className="sport-percent">{item.percent}% Used</span>
                    </div>
					<div className="progress-bar">
						<div
							className="progress-fill"
							style={{ width: `${item.percent}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
