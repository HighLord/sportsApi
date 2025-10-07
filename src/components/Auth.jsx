import { useState } from "react";
import { callAuthApi } from "../api/authApi";
import "../styles/auth.css";

function Auth({ defaultTab = "login", disabled = false }) {
	const [activeTab, setActiveTab] = useState(defaultTab);
	const [formData, setFormData] = useState({});
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState( false );
    const [passwordVisible, setPasswordVisible] = useState({});
    
	if (localStorage.getItem( "token") && defaultTab !== "forgot") window.location.href = "/dashboard";
    const triggerVisibility = (fieldName) => {
		setPasswordVisible((prev) => ({ ...prev, [fieldName]: true }));
		setTimeout(() => {
			setPasswordVisible((prev) => ({ ...prev, [fieldName]: false }));
		}, 5000);
    };
    
    const validatePassword = (pass, passField, pass2 = null, pass2Field = null) => {
        if ( pass.length <= 5 ) {
            triggerVisibility(passField);
            return "Password length is too low.";
        }
        if (/^[a-z]+$/.test(pass)) {
		    triggerVisibility(passField);
		    return "Password must include uppercase letters, numbers, or special characters.";
	    }
	    if (pass2 !== null && pass !== pass2) {
		    if (pass2Field) triggerVisibility(pass2Field);
		    return "Passwords do not match! Please try again.";
	    }
	    return null;
    };

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
	const handleSubmit = async (e, overrideAction = null) => {
		e.preventDefault();
        let action;
        if( overrideAction ) action = overrideAction;
        else if ( activeTab === "login" ) action = "login";
        else if (activeTab === "register") action = "register";
        else if ( activeTab === "forgot" ) action = "forgot";
        
        if (action === "register") {
			const errorMsg = validatePassword(
				formData.userpass,
				"userpass",
				formData.userpass2,
				"userpass2"
			);
			if (errorMsg) {
				setMessage(errorMsg);
				setStatus(false);
				return;
			}
		}
		if (action === "reset") {
			const errorMsg = validatePassword(
				formData.password1,
				"password1",
				formData.password2,
				"password2"
			);
			if (errorMsg) {
				setMessage(errorMsg);
				setStatus(false);
				return;
			}
        }
        
		setIsLoading(true);
		try {
			const response = await callAuthApi(action, formData);
			setMessage(response.data || "Unknown response");
			if (response.Status === "200") {
				setStatus(true);
				if (action === "login") {
                    localStorage.setItem( "token", response.token );
                    window.location.href = "/dashboard";
				}
			} else {
				setStatus(false);
			}
		} catch (error) {
			setMessage(error.message || "An error occurred. Please try again.");
			setStatus(false);
		} finally {
			setIsLoading(false);
		}
	};

	const SubmitButton = ({ text }) => (
		<button type="submit" disabled={isLoading}>
			{isLoading ? (
				<span className="spinner">
					<span className="spinner-inner"></span>
				</span>
			) : (
				text
			)}
		</button>
	);

	return (
		<div className="auth-container">
			{/* Tabs */}
			<div className="auth-tabs">
				{!disabled && <button
					className={
						activeTab === "login"
							? "active"
							: ""
					}
					onClick={() =>
					{
						setActiveTab( "login" ), setMessage( "" );
					}}>
					Login
				</button>}
				{!disabled && <button
					className={
						activeTab === "register"
							? "active"
							: ""
					}
					onClick={() =>
					{
						setActiveTab( "register" ), setMessage( "" );
					}}>
					Register
				</button>}
				<button
					className={activeTab === "forgot" ? "active" : ""}
					style={disabled ? { display: "none" } : null}
					onClick={() => {
						setActiveTab("forgot"), setMessage("");
					}}>
					Reset Password
				</button>
			</div>

			{/* Form Section */}
			<div className="auth-forms">
				{activeTab === "login" && (
					<form className="auth-form" onSubmit={handleSubmit}>
						<h2>Login</h2>
						<div className="input-group">
							<input
								type="email"
								id="email"
								name="useremail"
								placeholder=" "
								onChange={handleChange}
								required
							/>
							<label htmlFor="useremail">Email</label>
						</div>
						<div className="input-group">
							<input
								type="password"
								id="password"
								name="password"
								placeholder=" "
								onChange={handleChange}
								required
							/>
							<label htmlFor="password">Password</label>
						</div>
						<SubmitButton text="Login" />
					</form>
				)}

				{activeTab === "register" && (
					<form className="auth-form" onSubmit={handleSubmit}>
						<h2>Register</h2>
						<div className="name-row">
							<div className="input-group">
								<input
									type="text"
									id="firstname"
									name="firstname"
									placeholder=" "
									onChange={handleChange}
									required
								/>
								<label htmlFor="firstname">First Name</label>
							</div>
							<div className="input-group">
								<input
									type="text"
									id="lastname"
									name="lastname"
									placeholder=" "
									onChange={handleChange}
									required
								/>
								<label htmlFor="lastname">Last Name</label>
							</div>
						</div>
						<div className="input-group">
							<input
								type="email"
								id="usermail"
								name="usermail"
								placeholder=" "
								onChange={handleChange}
								required
							/>
							<label htmlFor="usermail">Email</label>
						</div>
						<div className="input-group">
							<input
								type={
									passwordVisible["userpass"]
										? "text"
										: "password"
								}
								id="userpass"
								name="userpass"
								placeholder=" "
								onChange={handleChange}
								required
							/>
							<label htmlFor="userpass">Password</label>
						</div>
						<div className="input-group">
							<input
								type={
									passwordVisible["userpass2"]
										? "text"
										: "password"
								}
								id="userpass2"
								name="userpass2"
								placeholder=" "
								onChange={handleChange}
								required
							/>
							<label htmlFor="userpass2">Confirm Password</label>
						</div>
						<SubmitButton text="Register" />
					</form>
				)}
				{activeTab === "forgot" && (
					<form
						className="auth-form"
						onSubmit={(e) => handleSubmit(e, "forgot")}>
						<h2>Forgot Password</h2>
						<div className="input-group">
							<input
								type="email"
								id="useremail"
								name="useremail"
								placeholder=" "
								onChange={handleChange}
								required
							/>
							<label htmlFor="useremail">Email</label>
						</div>
						<SubmitButton text="Send Reset OTP" />
					</form>
				)}
				{/* Message Display */}

				{message && (
					<p
						style={{
							textAlign: "center",
							fontSize: "14px",
							color: status ? "green" : "red",
						}}>
						{message}
					</p>
				)}
			</div>

			{/* Divider */}
			<div className="divider">OR</div>

			{/* Google login */}
			{activeTab !== "forgot" && (
				<div className="google-login">
					<button className="google-btn">Continue with Google</button>
				</div>
			)}

			{activeTab === "forgot" && (
				<form
					className="auth-form"
					onSubmit={(e) => handleSubmit(e, "reset")}>
					<h2>Reset Password</h2>
					<div className="input-group">
						<input
							type="number"
							id="otp"
							name="otp"
							placeholder=" "
							onChange={handleChange}
							required
						/>
						<label htmlFor="otp">OTP</label>
					</div>
					<div className="input-group">
						<input
							type={
								passwordVisible["password1"]
									? "text"
									: "password"
							}
							id="password1"
							name="password1"
							placeholder=" "
							onChange={handleChange}
							required
						/>
						<label htmlFor="otp">New Password</label>
					</div>
					<div className="input-group">
						<input
							type={
								passwordVisible["password2"]
									? "text"
									: "password"
							}
							id="password2"
							name="password2"
							placeholder=" "
							onChange={handleChange}
							required
						/>
						<label htmlFor="otp">Confirm Password</label>
					</div>
					<SubmitButton text="Reset Password" />
				</form>
			)}
		</div>
	);
}

export default Auth;
