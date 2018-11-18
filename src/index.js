import { google } from 'googleapis'

import credentials from '../client_secret.json'

import authToken from '../youtube_token.json'
const OAuth2 = google.auth.OAuth2
const clientSecret = credentials.installed.client_secret
const clientId = credentials.installed.client_id
const redirectUrl = credentials.installed.redirect_uris[0]

const DEFAULT_PARAMS = {
  maxResults: '25',
  part: 'snippet',
  q: 'surfing',
  type: ''
}

const start = async () => {
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)
  oauth2Client.credentials = authToken
  const result = await searchListByKeyword(oauth2Client, DEFAULT_PARAMS)
  console.log(result.data.items)
}

const searchListByKeyword = (auth, requestData) => {
  const service = google.youtube('v3')
  return new Promise((resolve, reject) => {
    service.search.list({ auth, ...requestData }, (err, response) => {
      if (err) {
        return reject(err)
      }
      resolve(response)
    })
  })
}

start()
