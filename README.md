# apis-101

This repo is for experimenting with APIs. 

Follow the steps below to set up a simple Node.js command-line application that makes requests to the YouTube Data API. 🚀

## Prerequisites
To run this project, you'll need:

* Node.js installed.
* The npm package management tool (comes with Node.js).
* Access to the internet and a web browser.
* A Google account.

## Setup

Here are some steps to get the project running locally:

1) Clone the repo -> run `git clone git@github.com:alex-blair/apis-101.git` in the command line.

2) Run `npm install`.

3) Next you'll need to obtain authorization credentials so your application can submit API requests. Follow the steps [here](https://developers.google.com/youtube/v3/quickstart/nodejs) under "Step 1: Turn on the YouTube Data API". 

4) Once you've got your `client_secret.json` (see the link in the step above), go to the command line and run `node quickstart.js`. The first time you run this, it will prompt you to authorize access:

   * Navigate to the URL provided in the command line using your web browser.

   * If you are not already logged into your Google account, you will be prompted to log in. If you are logged into multiple Google accounts, you will be asked to select one account to use for the authorization.

   * Click the Accept button.

   * Copy the code you're given, paste it into the command-line prompt, and press Enter.
   
   * You should see the following printed in the console: 
   ```
   This channel's ID is UC_x5XG1OV2P6uZZ5FSM9Ttw. Its title is 'Google Developers', and it has xxxxxxx views.
   ```
   
   If you can see this - congrats!! 🎉 The hardest part is over!
   
   You can now test requesting information about different channels by editing the `getChannel` function. 
   
   You can find a list of data related to a channel [here](https://developers.google.com/youtube/v3/docs/channels). 
   
   For instance, you could try requesting the `description` from `GoogleDevelopers` by adding `channels[0].snippet.description` to the `console.log`.
   
   ## Deeper Dive

If you want to try out some of the other API requests in `src`, you'll need to do a bit more setup:
 1. Find out where `youtube-nodejs-quickstart.json` has been saved locally and add a copy of it to your project file. Rename it `youtube_token.json` in your project.
    - *Tip:* You can see where `youtube-nodejs-quickstart.json` was saved by logging `TOKEN_PATH` 
  i.e. add the following line to `quickstart.js`:
  ```
  var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json'
console.log('Location of token: ' + TOKEN_PATH ) // Add this line
 ```
  Then run `node quickstart.js`. The location of the token should be printed in the console 😄
  
  2. Once you have the token saved as `youtube_token.json` in your project, you can use it to run the functions in `search1.js`, `search2.js`, `search3.js`. 
  
 ⚠️**Important note:** Make sure not to upload your `client_secret.json` or `youtube_toke.json` to Github! In this project both files are listed in the `.gitignore`, so by default will not be added when you make a commit. However, if you rename either of these files, remember to update the `.gitignore` so that you don't commit them by mistake. They contain secrets, and should not be made public on Github.⚠️
