var qInput = document.querySelector('[name="q"]');
var lastIndex = -1;

function updateLastIndex(queryResult, goUp) {
  for (var i = 0; i < queryResult.length; i++) {
    if (queryResult[i] === document.activeElement) {
      lastIndex = i;
      break;
    }
  }

  if (goUp) {
    //up
    if (lastIndex > 0) lastIndex--;
    else lastIndex = queryResult.length - 1;
  } else {
    //down
    if (lastIndex < queryResult.length - 1) lastIndex++;
    else lastIndex = 0;
  }
}

function focusOnResult(resultDom, h3div) {
  resultDom.parentElement.focus();
}


window.addEventListener("keydown", function (ev) {
  if (ev.keyCode === 27) {
    setTimeout(function () {
      document.body.click();
      var firstResult = document.querySelector('.g a h3');
      var firstResulth3div = firstResult;
      focusOnResult(firstResult, firstResulth3div);
      lastIndex = 0;
    }, 200);
  } else if (ev.keyCode === 191 && qInput !== document.activeElement) {
    setTimeout(function () {
      qInput.focus();
    }, 200);
  } else if (
    (ev.keyCode === 38 || ev.keyCode === 40) &&
    qInput !== document.activeElement
  ) {
    ev.preventDefault();
    document.body.click();
    var results = getLinks();
    var goUp = ev.keyCode === 38;
    if (results.length > 0) {
      updateLastIndex(results, goUp);

      for (var i = 0; i < results.length; i++) {
        var h3div = results[i];
        if (lastIndex === i) {
          focusOnResult(results[i], h3div);
        }
      }
    }
  }
});

function getLinks() {
  return [...document.querySelectorAll('.g')]
          .map(x => x.querySelector('a h3'));
}