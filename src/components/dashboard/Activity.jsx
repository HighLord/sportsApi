import "./activity.css";

export default function Activity ()
{
    const getPastelColor = () => {
		const hue = Math.floor(Math.random() * 360);
		return `hsl(${hue}, 100%, 50%)`;
	};
    
    const activities = [
		{ time: "10:45 AM", action: "You requested NBA API" },
		{ time: "11:20 AM", action: "You requested EPL API" },
		{ time: "01:05 PM", action: "You requested MLB API" },
		{ time: "10:45 AM", action: "You requested NBA API" },
		{ time: "11:20 AM", action: "You requested EPL API" },
		{ time: "01:05 PM", action: "You requested MLB API" },
		{ time: "10:45 AM", action: "You requested NBA API" },
	];
    
	return (
		<div className="activity-box">
			<h3 className="activity-title">My Activity</h3>
			<div className="timeline">
				{activities.map((a, i) => (
					<div key={i} className="timeline-item">
						<div className="timeline-time">{a.time}</div>
						<div
							className="timeline-marker"
                            style={{ border: `3px solid ${getPastelColor()}` }}
						/>
						<div className="timeline-action">{a.action}</div>
					</div>
				))}
			</div>
		</div>
	);
}
