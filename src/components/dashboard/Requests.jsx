import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import "./requests.css";

const data = [
	{ name: "Mon", requests: 40 },
	{ name: "Tue", requests: 80 },
	{ name: "Wed", requests: 20 },
	{ name: "Thu", requests: 60 },
	{ name: "Fri", requests: 100 },
	{ name: "Sat", requests: 50 },
	{ name: "Sun", requests: 70 },
];

export default function Requests() {
	return (
		<div className="requests-box">
			<h3>Requests Graph</h3>
			<div className="requests-chart">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="requests"
							stroke="#3498db"
							strokeWidth={2}
							dot={{ r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
