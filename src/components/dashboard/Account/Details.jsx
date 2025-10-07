import { useUser } from "../UserContext";
import "./details.css";

export default function Details() {
	const { userData } = useUser();

	return (
		<div className="details-container">
			{/* Account Info */}
			<div className="info-section">
				<h3>Account Information</h3>
				<div className="info-row">
					<label>First Name:</label>
						<input
							type="text"
							value={userData?.firstname}
							disabled
						/>
				</div>
				<div className="info-row">
					<label>Last Name:</label>
						<input
							type="text"
							value={userData?.lastname}
							disabled
						/>
				</div>
				<div className="info-row">
					<label>Email:</label>
					<input type="text" value={userData?.email} disabled />
				</div>
			</div>

			{/* Billing Info */}
			<div className="info-section">
				<h3>Billing Information</h3>
				<div className="info-row">
					<label>Address:</label>
					<input type="text" placeholder="Enter billing address" />
				</div>
				<div className="info-row">
					<label>City:</label>
					<input type="text" placeholder="Enter city" />
				</div>
				<div className="info-row">
					<label>Country:</label>
					<input type="text" placeholder="Enter country" />
				</div>
				<div className="info-row">
					<label>Postal Code:</label>
					<input type="text" placeholder="Enter postal code" />
				</div>
				<div className="info-actions">
					<button className="save-btn">Save</button>
				</div>
			</div>
		</div>
	);
}
