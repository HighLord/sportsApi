import "./HowItWorks.css";

function HowItWorks() {
	const steps = [
		{
			step: "1️⃣",
			title: "Sign Up",
			description:
				"Create an account in seconds. Start with a free trial, no credit card required.",
		},
		{
			step: "2️⃣",
			title: "Get Your API Key",
			description: "Securely generate your API key from the dashboard.",
		},
		{
			step: "3️⃣",
			title: "Start Building",
			description:
				"Use our REST API and WebSocket endpoints to integrate sports data into your apps.",
		},
	];

	return (
		<section className="how-it-works">
			<h2>⚡ How It Works</h2>
			<div className="steps">
				{steps.map((s, i) => (
					<div key={i} className="step-card">
						<div className="step-icon">{s.step}</div>
						<h3>{s.title}</h3>
						<p>{s.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}

export default HowItWorks;
