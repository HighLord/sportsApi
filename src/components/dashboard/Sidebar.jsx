import React, {useState, useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open = false, collapsed = true, onToggle}) {
	const items = [
		{ to: "/dashboard", label: "Home", icon: "🏠" },
		{ to: "/dashboard/snippets", label: "Code Snippets", icon: "💻" },
		{ to: "/dashboard/docs", label: "Docs", icon: "📄" },
		{ to: "/dashboard/analytics", label: "Analytics", icon: "📊" },
		{ to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
		{ to: "/dashboard/logout", label: "Logout", icon: "➜]" },
	];
	const [showLabel, setShowLabel] = useState( false );
	const sidebarRef = useRef(null);
    
	useEffect(() => {
		function handleClickOutside(e) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target) &&
				!collapsed
			) {
				onToggle(); // collapse if clicked outside
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [collapsed, onToggle] );
	
    useEffect( () =>
    {
        let timer;
        if (!collapsed) {
            timer = setTimeout(() => setShowLabel(true), 90);
        } else {
            setShowLabel(false);
        }
    return () => clearTimeout( timer );
    }, [collapsed]);

	return (
		<aside
			ref={sidebarRef}
			className={`dash-sidebar ${open ? "open" : ""} ${
				collapsed ? "collapsed" : "expanded"
			}`}>
			<nav className="sidebar-nav">
				<div className="hamburger-wrapper" onClick={onToggle}>
					<span className="hamburger">☰</span>
					{showLabel && <span className="brand-text">SportsAPI</span>}
				</div>

				{items.map((it) => (
					<NavLink
						key={it.to}
						to={it.label === "Logout" ? "/logout" : it.to}
						end={it.to === "/dashboard" || it.to === "/logout"}
						className={({ isActive }) =>
							"dash-nav-item" + (isActive ? " dash-active" : "")
						}
						onClick={() => {
							if (it.label === "Logout") {
								localStorage.removeItem("token");
								window.location.href = "/login";
							}
							if (!collapsed) onToggle();
						}}>
						<span className="nav-icon">{it.icon}</span>
						{showLabel && (
							<span className="nav-text">{it.label}</span>
						)}
					</NavLink>
				))}
			</nav>

			{!collapsed && (
				<div className="sidebar-footer">
				</div>
			)}
		</aside>
	);
}
