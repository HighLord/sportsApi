// src/api/statusApi.js
export async function callStatusApi ( token )
{
    try {
        const response = await fetch(
            "https://api.webapps.com.ng/v1/account/status.php",
            {
                method: "POST",
                headers: {
                    Authorization: token,
                },
            }
        );

        const data = await response.json();
        return data;
    } catch ( error ) {
        console.error( "Status API Error:", error );
        return { Status: "500", data: "Server encountered an error: " + error };
    }
}
