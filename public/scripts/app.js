$(document).ready(() => {
  //Put the elements in memory
  let cleanTag = $('<p>')
  let $form = $('.new-tweet').find('form')
  let $textarea = $form.find('textarea')
  let $compose = $('#compose')
  let $newTweet = $('.new-tweet')
    // Make the callbacks
  let composeToggle = composeToggleWith($newTweet, $textarea)
  let summitForm = summitWith($textarea, sendTweetWith)
    // load the tweets
  loadTweets()
    // starts listening to the Summit and Compose buttons
  $compose.on('click', composeToggle)
  $form.on('submit', summitForm)


  // -------local functions---------

  // Callback for the toggle button.
  function composeToggleWith($newTweet, $textarea) {
    return function() {
      if ($newTweet.is(':visible')) {
        $newTweet.hide()
      } else {
        $newTweet.show()
        $textarea.focus()
      }
    }
  }

  // Callback for the form summit button
  function summitWith($textarea, sendTweetWith) {
    return function(eve) {
      eve.preventDefault()
      sendTweetWith($(this).serialize())
      $textarea.val('')
    }
  }

  // Send tweet
  function sendTweetWith(serialStr) {
    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/tweets',
      data: serialStr,
      success: () => loadTweets(),
    });
  }

  // Get tweets
  function loadTweets() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'json',
      success: data => renderTweets(data)
    })
  }

  // Make tweet in one block of plain HTML
  function createTweetElement(tweet) {
    return `<article class='tweet'>
  <header>${tweet.user.name}</header>
    <img class='avatar-s'src="${tweet.user.avatars.small}" alt="">
    <p class="handle">${tweet.user.handle}</p>
    <p>${cleanText(tweet.content.text)}</p>
    <footer>${howLongAgo(tweet.created_at)} ago<span class='fa fa-heart'></span><span class='fa fa-retweet'></span><span class='fa fa-flag'></span>
  </footer>
</article>`
  }

  // Make all the tweets in one big block of HTML
  function renderTweets(tweets) {
    let result_HTML = ''
    tweets.forEach(tweet => result_HTML = createTweetElement(tweet) + result_HTML)
    $('#tweets-container').html(result_HTML)
  }

  // convert the millisecond to freindly date
  function howLongAgo(tweetTime) {
    return dateFns.distanceInWordsToNow(
      new Date(tweetTime), { includeSeconds: true }
    )
  }

  // clean the user tweet for security
  function cleanText(html) {
    let cleanTag = $('<p>').html(html)
    let cleanTxt = cleanTag.text()
    return cleanTxt
  }

})
