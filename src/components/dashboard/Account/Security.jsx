import { useState } from "react";
import "./security.css";

export default function Security() {
	const [twoFAEnabled, setTwoFAEnabled] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");

	const handleToggle2FA = () => {
		setTwoFAEnabled(!twoFAEnabled);
		setVerificationCode("");
	};

	const handleVerify = () => {
		alert("Verification code submitted: " + verificationCode);
		// TODO: hook to API for verifying Google Authenticator code
	};

	return (
		<div className="security-container">
			<h3>Security Settings</h3>

			<div className="twofa-section">
				<div className="twofa-status">
					<strong>2-Factor Authentication:</strong>{" "}
					{twoFAEnabled ? "Enabled" : "Disabled"}
				</div>
				<button className="twofa-btn" onClick={handleToggle2FA}>
					{twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
				</button>
			</div>

			{twoFAEnabled && (
				<div className="twofa-setup">
					<p>
						Scan the QR code with Google Authenticator or enter the
						secret key manually.
					</p>
					<div className="qr-placeholder">
						{/* Replace with actual QR code later */}
						QR Code Placeholder
					</div>

					<div className="info-row">
						<label>Verification Code:</label>
						<input
							type="text"
							placeholder="Enter 6-digit code"
							value={verificationCode}
							onChange={(e) =>
								setVerificationCode(e.target.value)
							}
						/>
					</div>

					<div className="info-actions">
						<button
							className="verify-btn"
							onClick={handleVerify}
							disabled={!verificationCode}>
							Verify
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
