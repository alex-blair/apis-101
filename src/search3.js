import { google } from 'googleapis'
import colors from 'colors/safe'

import credentials from '../client_secret.json'

import authToken from '../youtube_token.json'

const OAuth2 = google.auth.OAuth2

const clientSecret = credentials.installed.client_secret
const clientId = credentials.installed.client_id
const redirectUrl = credentials.installed.redirect_uris[0]

const MAX_NUMBER_OF_ITEMS_TO_SHOW = 10

// Lots of information with pages
const DEFAULT_SEARCH_PARAMS = {
  maxResults: '50',
  part: 'snippet',
  location: '52.497402, 13.402770',
  locationRadius: '50km',
  type: 'video',
  order: 'viewCount'
}

const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)
oauth2Client.credentials = authToken

// Starts the search
const start = async (searchTerm, verbose = false) => {
  console.log(colors.green(`Searching for ${searchTerm} videos`))
  const searchParams = {
    ...DEFAULT_SEARCH_PARAMS,
    q: searchTerm
  }

  const firstResult = await searchListByKeyword(oauth2Client, searchParams)
  const [allTheItems, lastResult] = await getItemsFromAllPages(
    firstResult,
    searchParams
  )
  const numberOfItemsToShow =
    allTheItems.length > MAX_NUMBER_OF_ITEMS_TO_SHOW
      ? MAX_NUMBER_OF_ITEMS_TO_SHOW
      : allTheItems.length
  const lastFewItems = allTheItems.slice(
    allTheItems.length - numberOfItemsToShow
  )

  if (verbose) {
    console.log(lastFewItems)
  }
  if (lastFewItems.length) {
    console.log(
      colors.magenta('TOTAL RESULTS: ' + lastResult.data.pageInfo.totalResults)
    )
  } else {
    console.log(
      colors.red(
        `Youtube cannot return any of the ${
          lastResult.data.pageInfo.totalResults
        } items for this search query`
      )
    )
  }
  lastFewItems.map((i) => {
    console.log(
      colors.green(i.snippet.title),
      colors.cyan.underline(`https://www.youtube.com/watch?v=${i.id.videoId}`)
    )
  })
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

const getItemsFromAllPages = async (
  result,
  searchParams,
  currentItems = result.data.items
) => {
  if (result.data.nextPageToken) {
    console.log(colors.yellow('Going to the next page'))
    const nextPage = await searchListByKeyword(oauth2Client, {
      ...searchParams,
      pageToken: result.data.nextPageToken
    })
    return getItemsFromAllPages(nextPage, searchParams, [
      ...currentItems,
      ...nextPage.data.items
    ])
  }

  return [currentItems, result]
}

var args = process.argv.slice(2)
start(args[0], args[1])
