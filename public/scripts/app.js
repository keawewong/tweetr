/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



function renderTweets(tweets) {
  let result_HTML = ''
  tweets.forEach(tweet => result_HTML = createTweetElement(tweet) + result_HTML)
  $('#tweets-container').html(result_HTML)
}

function createTweetElement(tweet) {
  // var $tweet = $('<article>').addClass('tweet');
  let theTweet =
    `<article class='tweet'>
  <header>${tweet.user.name}</header>
    <img class='avatar-s'src="${tweet.user.avatars.small}" alt="">
    <p class="handle">${tweet.user.handle}</p>
    <p>${tweet.content.text}</p>
    <footer>${tweet.created_at}<span class='fa fa-heart'></span><span class='fa fa-retweet'></span><span class='fa fa-flag'></span>
  </footer>
</article>`
  return theTweet
}


function loadTweets() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
    dataType: 'json',
    success: data => renderTweets(data)
  })
}

function sendTweet(serialStr) {
  $.ajax({
    type: "POST",
    url: 'http://localhost:8080/tweets',
    data: serialStr,
    success: () => loadTweets(),
  });

}

function composeToggleWith($newTweet, $textarea) {
  return function(e) {
    if ($newTweet.is(':visible')) {
      $newTweet.hide()
    } else {
      $newTweet.show()
      $textarea.focus()
    }
  }
}

$(document).ready(() => {
  loadTweets()
  let $form = $('.new-tweet').find('form')
  let $textarea = $form.find('textarea')
  let $compose = $('#compose')
  let $newTweet = $('.new-tweet')
  let composeToggle = composeToggleWith($newTweet, $textarea)
  $compose.on('click', composeToggle)
  $form.on('submit', ev => {
    ev.preventDefault()
    sendTweet($form.serialize())
    $textarea.val('')
  })
})
