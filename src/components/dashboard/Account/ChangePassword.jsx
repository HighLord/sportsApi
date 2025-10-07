import Auth from "../../Auth"; // adjust the path if your auth component is elsewhere
import "./changePassword.css";

export default function ChangePassword() {
	return (
		<div className="change-password-container">
            <Auth defaultTab="forgot" disabled={true} />
		</div>
	);
}
