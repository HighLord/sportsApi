import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../styles/dashboard.css";
import "../../styles/homeDash.css";

export default function DashboardLayout({ children, title }) {
	const [collapsed, setCollapsed] = useState(true); // desktop collapsed/expanded

    const toggleSidebar = () => {
		setCollapsed((s) => !s);
    };
    
	return (
		<div
			className={`dashboard-root ${collapsed ? "collapsed" : "expanded"}`}
		>
			<Sidebar
				onToggle={toggleSidebar}
				collapsed={collapsed}
			/>
			<div className="dashboard-main">
				<Topbar title={title || "Dashboard"} />
				<div className="dashboard-content">{children}</div>
			</div>
		</div>
	);
}
