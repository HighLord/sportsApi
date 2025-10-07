import { useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
	const [userData, setUserData] = useState(null);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
}
