import "./Features.css";

function Features() {
	const features = [
		{
			title: "⚽ Football Coverage",
			description:
				"Get comprehensive coverage of football leagues worldwide, including Premier League, La Liga, Serie A, Bundesliga, and more. Access real-time scores, detailed match statistics, player performance data, and team standings. Our API delivers instant updates on goals, cards, substitutions, and match events.",
			backContent:
				"Access to 500+ football leagues worldwide with minute-by-minute updates and comprehensive stats",
		},
		{
			title: "🏀 Basketball Data",
			description:
				"Dive deep into basketball analytics with our extensive NBA and EuroLeague coverage. Track player statistics, team performance metrics, quarter-by-quarter scoring, and shooting percentages. Get real-time updates on game progress, player fouls, timeouts, and crucial game moments.",
			backContent:
				"Complete NBA and EuroLeague coverage with advanced player and team analytics",
		},
		{
			title: "🎾 Tennis Insights",
			description:
				"Stay on top of tennis action from all major tournaments including Grand Slams, ATP, and WTA tours. Follow matches with detailed point-by-point coverage, serve statistics, win percentages, and player rankings. Access comprehensive tournament brackets and live match statistics.",
			backContent:
				"Live point-by-point updates from all major tennis tournaments worldwide",
		},
		{
			title: "📡 Live WebSocket Feeds",
			description:
				"Experience seamless real-time updates with our WebSocket integration. Receive instant notifications for score changes, game events, and statistical updates. Our efficient data delivery system ensures minimal latency and reliable connection, perfect for live betting platforms and sports applications.",
			backContent:
				"Real-time data delivery with <100ms latency and 99.9% uptime guarantee",
		},
		{
			title: "📊 Historical Data",
			description:
				"Access a rich database of historical sports data spanning over 5 years. Analyze team performance trends, player statistics evolution, and historical match outcomes. Perfect for data analysis, machine learning models, and creating predictive algorithms for sports betting.",
			backContent:
				"5+ years of historical data with detailed match and player statistics",
		},
		{
			title: "🌍 Global Payments",
			description:
				"Flexible payment options tailored to your location. Accept payments in multiple currencies including USD and Naira through secure Paystack integration. Start with our risk-free trial period and choose from various subscription tiers to match your needs. Enjoy seamless billing and instant access to API keys.",
			backContent:
				"Secure payment processing with multiple currency support and flexible billing options",
		},
	];

	return (
		<section className="features">
			<h2>Why Choose SportsAPI?</h2>
			<div className="features-grid">
				{features.map((f, i) => (
					<div key={i} className="feature-card-container">
						<div
							className="feature-card"
						>
							<div className="card-front">
								<h3>{f.title}</h3>
								<p>{f.description}</p>
							</div>
							<div className="card-back">
								<p>{f.backContent}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default Features;
