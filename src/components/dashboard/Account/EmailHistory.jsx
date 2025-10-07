import "./emailHistory.css";

export default function EmailHistory() {
	// For now we’ll hardcode some sample emails.
	// Later you can fetch these from your backend.
	const emails = [
		{
			id: 1,
			subject: "Welcome to WebApps",
			date: "2025-09-15",
            status: "Delivered",
            details: "Your account has been successfully created."
		},
		{
			id: 2,
			subject: "Password Reset Request",
			date: "2025-09-20",
            status: "Failed",
            details: "You requested a password reset. Click the link to proceed."
		},
		{
			id: 3,
			subject: "Billing Receipt",
			date: "2025-09-25",
            status: "Delivered",
            details: "Your payment was successful. Here is your receipt."
		},
	];

	return (
		<div className="email-history-container">
			<h3>Email History</h3>
			<table className="email-table">
				<thead>
					<tr>
						<th>Subject</th>
						<th>Date</th>
						<th>Details</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{emails.map((email) => (
						<tr key={email.id}>
							<td>{email.subject}</td>
							<td>{email.date}</td>
							<td>{email.details}</td>
							<td>
								<div
									className={`status-badge ${email.status.toLowerCase()}`}>
									{email.status}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
