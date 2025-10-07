import { useEffect, useState } from "react";
import "./PricingPreview.css";

function Pricing ()
{
    const [currency, setCurrency] = useState("USD");

	useEffect(() => {
        const userLang = navigator.language || navigator.userLanguage || "";
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

        if (
			userLang.includes("en-NG") ||
			userLang.toLowerCase().includes("ng") ||
			timeZone === "Africa/Lagos"
		) {
			setCurrency("NGN");
		} else {
			setCurrency("USD");
		}
    }, [] );
    
	const plans = [
		{
			name: "Free Trial",
			priceNGN: "₦0",
			priceUSD: "$0",
			description: "Try the API free for 7 days",
			features: [
				"Up to 5000 requests / month",
				"Rate Limited to 15 requests / minute",
				"Access to Football & Basketball",
				"Basic past and upcoming games",
				"No live data",
			],
			button: "Start Free Trial",
		},
		{
			name: "Standard",
			priceNGN: "₦10,000 / month",
			priceUSD: "$7 / month",
			description: "For developers and startups",
			features: [
				"Up to 500,000 requests / month",
				"Rate Limited to 50 requests / minute",
				"All sports included with pre match odds",
				"Live data via WebSockets",
				"Email support",
			],
			button: "Subscribe",
			highlight: true,
		},
		{
			name: "Pro",
			priceNGN: "₦22,000 / month",
			priceUSD: "$15 / month",
			originalPriceNGN: "₦30,000",
			originalPriceUSD: "$20",
			discount: "26.66% OFF",
			description: "For businesses and production apps",
			features: [
				"Unlimited requests / month",
				"Rate Limited to 100 requests / minute",
				"All sports with premium data, pre and live odds",
				"Live data + advanced stats via WebSockets",
				"Priority support",
			],
			button: "Subscribe",
		},
	];

	return ( 
		<section className="pricing" id="pricing">
			<h2>Pricing Plans</h2>
			<p className="pricing-subtitle">
				Flexible plans for developers and businesses worldwide with a
				free trial.
			</p>
			<div className="pricing-grid">
				{plans.map((plan, index) => (
					<div
						key={index}
						className={`pricing-card ${
							plan.highlight ? "highlight" : ""
						}`}
					>
						{plan.highlight && (
							<div className="ribbon">Most Popular</div>
						)}
						<h3>{plan.name}</h3>
						{plan.discount && (
							<span className="discount-badge">
								{plan.discount}
							</span>
						)}
						{plan.originalPriceNGN && currency === "NGN" && (
							<p className="original-price">
								{plan.originalPriceNGN}
							</p>
						)}
						{plan.originalPriceUSD && currency === "USD" && (
							<p className="original-price">
								{plan.originalPriceUSD}
							</p>
						)}
						<p className="price">
							{currency === "NGN" ? plan.priceNGN : plan.priceUSD}
						</p>
						<p className="desc">{plan.description}</p>
						<ul>
							{plan.features.map((feature, i) => (
								<li key={i}>{feature}</li>
							))}
						</ul>
						<button className="pricing-btn">{plan.button}</button>
					</div>
				))}
			</div>
		</section>
	);
}

export default Pricing;
