// src/api/authApi.js
export async function callAuthApi ( action, payload )
{
    try {
        const formData = new FormData();
        formData.append( action, true ); // e.g., login, register
        Object.keys( payload ).forEach( key => formData.append( key, payload[key] ) );

        const response = await fetch( "https://api.webapps.com.ng/auth.php", {
            method: "POST",
            body: formData
        } );

        const data = await response.json();
        return data;
    } catch ( error ) {
        console.error( "API Error:", error );
        return { Status: "500", data: "Server encountered an error" + error };
    }
}
