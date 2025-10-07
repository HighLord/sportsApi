import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { UserProvider } from "./components/dashboard/UserProvider";

function Layout({ children, hideLayout }) {
	return (
		<>
			{!hideLayout && <Navbar />}
			{children}
			{!hideLayout && <Footer />}
		</>
	);
}

function App() {
	return (
		<Router>
			<Routes>
				{/* Public routes */}
				<Route
					path="/"
					element={
						<Layout hideLayout={false}>
							<Home />
						</Layout>
					}
				/>
				<Route
					path="/pricing"
					element={
						<Layout hideLayout={false}>
							<Pricing />
						</Layout>
					}
				/>
				<Route
					path="/login"
					element={
						<Layout hideLayout={false}>
							<Login />
						</Layout>
					}
				/>
				<Route
					path="/register"
					element={
						<Layout hideLayout={false}>
							<Register />
						</Layout>
					}
				/>

				{/* Dashboard routes */}
				<Route
					path="/dashboard/*"
					element={
						<UserProvider>
							<Layout hideLayout={true}>
								<DashboardLayout>
									<Dashboard />
								</DashboardLayout>
							</Layout>
						</UserProvider>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
