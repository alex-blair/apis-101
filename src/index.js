import { google } from 'googleapis'

import credentials from '../client_secret.json'

import authToken from '../youtube_token.json'
const OAuth2 = google.auth.OAuth2
const clientSecret = credentials.installed.client_secret
const clientId = credentials.installed.client_id
const redirectUrl = credentials.installed.redirect_uris[0]

// Cats in Kreuzberg
// const CATS_IN_KREUZBERG = {
//   maxResults: '10',
//   part: 'snippet',
//   q: 'katze',
//   type: 'video',
//   location: '52.497402, 13.402770',
//   locationRadius: '5km',
//   publishedBefore: '2018-01-01T00:00:00Z'
// }

// Kreuzberg back in time
// const KREUZBERG_BACK_IN_TIME = {
//   maxResults: '10',
//   part: 'snippet',
//   type: 'video',
//   location: '52.497402, 13.402770',
//   locationRadius: '5km',
//   publishedBefore: '2008-01-01T00:00:00Z'
// }

// Lots of information with pages
const TOUR_OF_BERLIN = {
  maxResults: '50',
  part: 'snippet',
  q: 'dog',
  location: '52.497402, 13.402770',
  locationRadius: '50km',
  type: 'video',
  order: 'viewCount'
}

const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)
oauth2Client.credentials = authToken

// Starts the search
const start = async () => {
  // const result = await searchListByKeyword(
  //   oauth2Client,
  //   TOUR_OF_BERLIN
  // )

  const result = await searchListByKeyword(oauth2Client, TOUR_OF_BERLIN).then(
    (result) => goToEndOfList(result, TOUR_OF_BERLIN)
  )

  console.log(result.data.items)
  // console.log("NEXT PAGE TOKEN: " + result.data.nextPageToken)
  console.log('TOTAL RESULTS: ' + result.data.pageInfo.totalResults)
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

const goToEndOfList = async (result, searchParams) => {
  if (result.data.nextPageToken) {
    console.log('Next page')
    await searchListByKeyword(oauth2Client, {
      ...searchParams,
      pageToken: result.data.nextPageToken
    })
      .then((result) => goToEndOfList(result, searchParams))
      .catch((error) => console.log(error))
  }
  return result
}

start()
