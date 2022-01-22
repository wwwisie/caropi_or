/* --- Function Index --- */
var site = {
  // 1st function to fire
  ready: ready,
  // 2nd function to fire
  load: load,
  resize: resize,
  responsive: function getResponsive() {
    var windowWidth = window.innerWidth;
    var size;
    if (windowWidth > 768) {
      size = "lg"
    }
    else if (windowWidth <= 768 && windowWidth > 426) {
      size = "md"
    }
    else if (windowWidth <= 426) {
      size = "sm"
    }

    return size
  }
}

function ready() {
  // REMOVE THIS WHEN CHANGED TO RUBY 
  $("header").load("./partials/_header.html");
  $("footer").load("./partials/_footer.html");
  $("#svg").load("./partials/_svg.html");

  var waitExist = setInterval(function () {
    if ($('#burger-menu').length) {
      clearInterval(waitExist);

      $("input[type='checkbox']").change(function () {
        var a = $("input[type='checkbox']");
        if (a.length == a.filter(":checked").length) {
          $("#black").animate({ opacity: "0" }, 150);
          $("#color").animate({ opacity: "1" }, 150);
          $("body").addClass("dark_mode")
        } else {
          $("#black").animate({ opacity: "1" }, 150);
          $("#color").animate({ opacity: "0" }, 150);
          $("body").removeClass("dark_mode")
        }
      });
    }
  }, 100);
}

$(document).ready(function () {
  site.ready();
});

function load() {
  $('.loader-component').delay(600).fadeOut('slow');
  $('.loader-image').fadeOut(350);
  $('main').css({
    opacity: 1
  });
}

$(window).on('load', function () {
  site.load();
});

var lastScrollTop = 0;
$(window).scroll(function (event) {
  var st = $(this).scrollTop();
  $(".circle-rotate").css("transform", `rotate(${(st * .5)}deg)`)
  lastScrollTop = st;
});


function resize() {
  var r = site.responsive()
}

$(window).on('resize', function () {
  site.resize();
});

const Util = {
  getSelectorFromElement(element) {
    var selector = element.getAttribute('data-target')
    if (!selector || selector === '#') {
      selector = element.getAttribute('href') || ''
    }

    try {
      return document.querySelector(selector) ? selector : null
    } catch (err) {
      return null
    }
  },
  getIdFromDropdown(element) {
    var selector = element.parentElement.getAttribute("data-id")

    try {
      return document.getElementById(selector) ? document.getElementById(selector) : null
    } catch (err) {
      return null
    }
  }
}

// Toggle Classes for [data-toggle=] HTML tags.
/* PARAMS: 
  class to toggle: data-toggle="class"
  Target to toggle above class: data-target="header, main"
*/
$(function () {
  $(document).on('click', '[data-toggle="show"]', function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A' && $(this).data("prevent") != false) {
      event.preventDefault()
    }

    const $trigger = $(this)
    const selector = Util.getSelectorFromElement(this)
    const selectors = [].slice.call(document.querySelectorAll(selector))
    $(selectors).each(function () {
      const $target = $(this)
      const $data = $trigger.data("toggle")
      $target.toggleClass($data)
      const $focus = $trigger.data("focus")
      if ($focus != "") {
        console.log("focus", $focus)
        $($focus).focus()
      }
    })
  })

  $(document).on('click', '[data-link="offset"]', function (event) {
    const $offset = $(this).data("link-offset");
    const $trigger = $(this).attr("href");
    $('html, body').stop().animate({ scrollTop: $($trigger).offset().top - $offset });
  })
})
