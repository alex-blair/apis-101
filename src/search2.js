import { google } from 'googleapis'
import colors from 'colors/safe'

import credentials from '../client_secret.json'

import authToken from '../youtube_token.json'

const OAuth2 = google.auth.OAuth2

const clientSecret = credentials.installed.client_secret
const clientId = credentials.installed.client_id
const redirectUrl = credentials.installed.redirect_uris[0]

// Kreuzberg back in time
const KREUZBERG_BACK_IN_TIME = {
  maxResults: '10',
  part: 'snippet',
  type: 'video',
  location: '52.497402, 13.402770',
  locationRadius: '5km',
  publishedBefore: '2008-01-01T00:00:00Z'
}

const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)
oauth2Client.credentials = authToken

// Starts the search
const start = async () => {
  const result = await searchListByKeyword(oauth2Client, KREUZBERG_BACK_IN_TIME)

  console.log(result.data.items)
  console.log(
    colors.magenta('TOTAL RESULTS: ' + result.data.pageInfo.totalResults)
  )
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
