// /api/refreshTokenApi.js
export async function refreshToken ( currentToken )
{
    try {
        const response = await fetch( "https://api.webapps.com.ng/v1/config/update_token.php", {
            method: "GET", // keep it as GET unless backend changes
            headers: {
                "Authorization": `${currentToken}`,
                "Content-Type": "application/json",
            },
        } );

        const data = await response.json();
        if ( data.Status === "200" && data.token ) {
            localStorage.setItem( "token", data.token );
            return data.token;
        } else {
            console.warn( "Token refresh failed", data );
            return null;
        }
    } catch ( err ) {
        console.error( "Token refresh error", err );
        return null;
    }
}
