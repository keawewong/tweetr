$(document).ready(() => {

  let $set = {
    textarea: $('.new-tweet').find('textarea'),
    counter: $('.new-tweet').find('.counter'),
    submit: $('#submit').attr("disabled", true),
    label: $('.new-tweet').find('label').hide()
  }
  let validateTextLength = validateTextLengthWith($set)
  $set.textarea.on('keyup', validateTextLength)

  //-------local function-------

  function validateTextLengthWith($set) {
    return function(e) {
      let value = $set.textarea.val()
      let remain = 140 - value.trim().length

      $set.counter.text(remain)

      if (remain < 0) {
        $set.counter.addClass('negative')
        $set.label.text('Your tweet is too long').show()
        $set.submit.attr("disabled", true)
      } else if (remain >= 140) {
        $set.submit.attr("disabled", true)
      } else {
        $set.counter.removeClass('negative')
        $set.label.hide()
        $set.submit.attr("disabled", false)
      }
    }
  }
})
