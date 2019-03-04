var resultSelector = ".g .rc .r > a[ping]";
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
  h3div.style.borderLeft = "3px solid #795548";
  h3div.style.borderRight = "3px solid #795548";
  h3div.style.borderRadius = "8px";
  h3div.style.padding = "3px";
  resultDom.focus();
  resultDom.style.outline = "none";
}

window.addEventListener("keydown", function(ev) {
  console.log(ev.keyCode);
  if (ev.keyCode === 27) {
    setTimeout(function() {
      document.body.click();
      var firstResult = document.querySelector(resultSelector);
      var firstResulth3div = firstResult.querySelector("h3");
      focusOnResult(firstResult, firstResulth3div);
      lastIndex = 0;
    }, 200);
  } else if (ev.keyCode === 191 && qInput !== document.activeElement) {
    setTimeout(function() {
      qInput.focus();
    }, 200);
  } else if (
    (ev.keyCode === 38 || ev.keyCode === 40) &&
    qInput !== document.activeElement
  ) {
    ev.preventDefault();
    document.body.click();
    var results = document.querySelectorAll(resultSelector);
    var goUp = ev.keyCode === 38;
    if (results.length > 0) {
      updateLastIndex(results, goUp);

      for (var i = 0; i < results.length; i++) {
        var h3div = results[i].querySelector("h3");
        if (lastIndex === i) {
          focusOnResult(results[i], h3div);
        } else {
          h3div.style.borderLeft = "none";
          h3div.style.borderRight = "none";
          h3div.style.borderRadius = "none";
          results[i].style.padding = "0px";
        }
      }
    }
  }
});
