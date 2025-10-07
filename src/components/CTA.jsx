import "./CTA.css";
import { Link } from "react-router-dom";

function CTA() {
	return (
		<section className="cta">
			<h2>🚀 Ready to Power Your Sports App?</h2>
			<p>
				Start your free trial today. Cancel anytime. Paystack & USD
				payments supported.
			</p>
			<Link to="/Pricing#pricing">
				<button className="cta-btn">Start Free Trial</button>
			</Link>
		</section>
	);
}

export default CTA;
