import { google } from 'googleapis'

import credentials from '../client_secret.json'

import authToken from '../youtube_token.json'
const OAuth2 = google.auth.OAuth2
const clientSecret = credentials.installed.client_secret
const clientId = credentials.installed.client_id
const redirectUrl = credentials.installed.redirect_uris[0]

// const DEFAULT_PARAMS = {
//   maxResults: '2',
//   part: 'snippet',
//   q: 'baking',
//   type: ''
// }

// const LOCATION_KEYWORD_PARAMS = {
//   maxResults: '2',
//   part: 'snippet',
//   q: 'baking',
//   type: 'video',
//   regionCode: 'NZ',
//   location: '-43.528843, 172.633867',
//   locationRadius: '100km'
// }

// const ORDER_LOCATION_KEYWORD_PARAMS = {
//   maxResults: '49',
//   part: 'snippet',
//   q: 'cake',
//   type: 'video',
//   regionCode: 'NZ',
//   order: 'viewCount',
//   location: '-43.528843, 172.633867',
//   locationRadius: '1000km',
//   publishedAfter: '2018-01-01T00:00:00Z',
//   videoDuration: 'short'
// }

// const PARKOUR_BERLIN_SEARCH = {
//   maxResults: '49',
//   part: 'snippet',
//   q: 'Berlin',
//   type: 'video',
//   // order: 'viewCount',
//   location: '52.497402, 13.402770',
//   locationRadius: '5km',
//   publishedBefore: '2008-01-01T00:00:00Z'
//   // videoDuration: 'short',
// }

const CATS_BERLIN = {
  maxResults: '49',
  part: 'snippet',
  q: 'katze',
  type: 'video',
  // order: 'viewCount',
  location: '52.497402, 13.402770',
  locationRadius: '5km',
  publishedBefore: '2018-01-01T00:00:00Z'
  // videoDuration: 'short',
}

const start = async () => {
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)
  oauth2Client.credentials = authToken
  // const result = await searchListByKeyword(oauth2Client, DEFAULT_PARAMS)
  // const result = await searchListByKeyword(
  //   oauth2Client,
  //   LOCATION_KEYWORD_PARAMS
  // )
  // const result = await searchListByKeyword(
  //   oauth2Client,
  //   ORDER_LOCATION_KEYWORD_PARAMS
  // )
  const result = await searchListByKeyword(oauth2Client, CATS_BERLIN)
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
