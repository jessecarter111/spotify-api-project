import spotifyClientKey from '../config';

let accessToken
// Replace spotifyClientKey with your own Spotify API client key
const clientID = spotifyClientKey
const redirectURI = 'http://localhost:3000/'

const Spotify = {
    getAccessToken() {
        if (accessToken){
            return accessToken
        }

        const accessTokenReg = window.location.href.match(/access_token=([^&]*)/)
        const expiresInReg = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenReg && expiresInReg) {
            accessToken = accessTokenReg[1]
            const expiresIn = Number(expiresInReg[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
            return accessToken
        }

        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = accessURL
    },

    async search(searchTerm){
        const header = {Authorization: `Bearer ${Spotify.getAccessToken()}`}

        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: header})

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
    },

    async getUserID(){
        const header = {Authorization: `Bearer ${Spotify.getAccessToken()}`}

        const idResponse = await fetch('https://api.spotify.com/v1/me', {headers: header})

        if (!idResponse.ok) {
            throw new Error(`HTTP error! status: ${idResponse.status}`)
        } else {
            const idResponseJSON = await idResponse.json()
            return idResponseJSON.id
        }
    },

    async savePlaylist(userID, playlistName) {
        if (playlistName === '') return

        const header = {Authorization: `Bearer ${Spotify.getAccessToken()}`}

        const addPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
            { 
                headers: header, 
                method: 'POST', 
                body: JSON.stringify({name: playlistName})
            });

        if (!addPlaylistResponse.ok) {
            throw new Error(`HTTP error! status: ${addPlaylistResponse.status}`)
        } else {
            const addPlaylistResponseJSON = await addPlaylistResponse.json()
            return addPlaylistResponseJSON.id
        }   
    },

    async addTracksToPlaylist(playlistID, playlistURIs) {
        if (playlistID === '' || playlistURIs.length === 0) return

        const header = {Authorization: `Bearer ${Spotify.getAccessToken()}`}

        const addTracksToPlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            {
                method: 'POST', 
                headers: header,
                body: JSON.stringify({uris: playlistURIs})
            });

        if (!addTracksToPlaylistResponse.ok) {
            throw new Error(`HTTP error! status: ${addTracksToPlaylistResponse.status}`)
        } else {
            return 'Success'
        }   
    }
}

export default Spotify;