import { google } from 'googleapis'

import credentials from '../client_secret.json'

import authToken from '../youtube_token.json'

const OAuth2 = google.auth.OAuth2

const clientSecret = credentials.installed.client_secret
const clientId = credentials.installed.client_id
const redirectUrl = credentials.installed.redirect_uris[0]

// Lots of information with pages
const HIDDEN_BERLIN_VIDEOS = {
  maxResults: '50',
  part: 'snippet',
  q: 'dance',
  location: '52.497402, 13.402770',
  locationRadius: '50km',
  type: 'video',
  order: 'viewCount'
}

// const HIDDEN_BERLIN_VIDEOS = {
//   maxResults: '10',
//   part: 'snippet',
//   type: 'video',
//   location: '52.497402, 13.402770',
//   locationRadius: '5km',
//   publishedBefore: '2008-01-01T00:00:00Z'
// }

const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)
oauth2Client.credentials = authToken

// Starts the search
const start = async () => {
  // const result = await searchListByKeyword(
  //   oauth2Client,
  //   HIDDEN_BERLIN_VIDEOS
  // )

  const firstResult = await searchListByKeyword(
    oauth2Client,
    HIDDEN_BERLIN_VIDEOS
  )
  const lastResult = await goToEndOfList(firstResult, HIDDEN_BERLIN_VIDEOS)
  console.log(lastResult.data.items)
  console.log(lastResult.data)
  console.log('TOTAL RESULTS: ' + lastResult.data.pageInfo.totalResults)
  console.log('NEXT PAGE TOKEN: ' + lastResult.data.nextPageToken)
  console.log('PREVIOUS PAGE TOKEN: ' + lastResult.data.prevPageToken)
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
    console.log('Next page token: ' + result.data.nextPageToken)
    const nextPage = await searchListByKeyword(oauth2Client, {
      ...searchParams,
      pageToken: result.data.nextPageToken
    })
    return goToEndOfList(nextPage, searchParams)
  }
  console.log('Finished but still page token: ' + result.data.nextPageToken)
  return result
}

start()
