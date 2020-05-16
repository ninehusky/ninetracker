const path = require('path');
const express = require('express');
require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');
const scopes = ['user-top-read', 'user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private'];

let spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL
});

function authenticateApi(req, res) {
    let authorizationURL = spotifyApi.createAuthorizeURL(scopes);
    res.send(authorizationURL + '&show_dialog=true')
}

async function callback(req, res) {
    // intercept code, access/refresh tokens
    const { code } = req.query;
    try {
        let data = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token } = data.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token)
        let userData = await spotifyApi.getMyTopTracks();
        res.json(userData);
        console.log('I just wanna be successful!');
    } catch(err) {
        console.error(err);
        res.redirect('http://localhost:3000/#yalldead');
    }
}

module.exports = {
    authenticateApi,
    callback
};