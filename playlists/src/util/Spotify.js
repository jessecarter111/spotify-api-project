import spotifyClientKey from '../config';

let accessToken
// Replace clientID with your own Spotify API client key
const clientID = spotifyClientKey
const redirectURI = 'http://localhost:3000/'

const Spotify = {
    getAccessToken() {
        if (accessToken){
            console.log("valid access token")
            return accessToken
        }

        const accessTokenReg = window.location.href.match(/access_token=([^&]*)/)
        const expiresInReg = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenReg && expiresInReg) {
            console.log("Regex match")
            accessToken = accessTokenReg[1]
            const expiresIn = Number(expiresInReg[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
            return accessToken
        }

        console.log("Retrieving New")
        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = accessURL
    },

    async search(searchTerm){
        let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, { headers: {Authorization: `Bearer ${accessToken}`}})

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        } else {
            const tracklist = await response.json()

            if (tracklist.tracks.items === []) {
                return []
            }

            return tracklist.tracks.items.map(track => 
                ({name: track.name, 
                artist: track.artists[0].name, 
                album: track.album.name, 
                id: track.id, 
                URI: track.uri}))
        }
    }
}

export default Spotify;