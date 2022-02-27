const clientId = '9a264854382a43f2a8efb58ef0403684';
const redirectUri = 'http://localhost:3000'

let accessToken;

const Spotify = {
    getAccessToken () {
        if(accessToken) {
            return accessToken;

            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);


            if( accessToken && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);


                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else {
                const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
                window.location = accessUri;
            }
        }
    }
}

export default Spotify;