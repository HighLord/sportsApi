import Pricing from "../components/PricingPreview";
import "../styles/pricing.css";

function Price() {
	return (
		<div>
			<section className="pricing-intro">
				<h1>Choose the Right Plan for Your Sports API Needs</h1>
				<p>
					Our Sports API gives you access to live and historical data
					for football, basketball, tennis, and more. Whether you're
					building a fan app, betting platform, or sports analytics
					tool, we have a plan that fits your needs.
				</p>
				<p>
					Pricing is available in <strong>Naira (₦)</strong> for
					Nigeria and <strong>US Dollars ($)</strong> for
					international users, powered by Paystack for secure
					payments.
				</p>
			</section>

			<Pricing />

			<section className="pricing-cta">
				<div>
					<h2>Ready to Get Started?</h2>
					<p>
						Start with a <strong>7-day free trial</strong>. No
						credit card required. Upgrade anytime to unlock live
						data and advanced features.
					</p>
					<a href="#pricing" className="cta-btn2">
						Start Free Trial
					</a>
				</div>
            </section>
    
		</div>
	);
}

export default Price;
