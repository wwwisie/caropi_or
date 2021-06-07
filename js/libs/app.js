/* --- Function Index --- */
var site = {
  responsive: function getResponsive() {
    var windowWidth = window.innerWidth;
    var size;
    if (windowWidth > 768) {
      console.log("desktop")
      size = "lg"
    }
    else if (windowWidth <= 768 && windowWidth > 426) {
      console.log("tablet")
      size = "md"
    }
    else if (windowWidth <= 426) {
      console.log("mobile")
      size = "sm"
    }

    return size
  },
  header: {
    init: function init() {
      var waitExist = setInterval(function () {
        if ($('#burger-menu').length) {
          clearInterval(waitExist);

          $('#burger-menu').click(function () {
            site.header.open(this)
          })

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

          windowControls.init()
        }
      }, 100);
    }
  }
}

function ready() {
  $("header").load("_header.html");
  $("footer").load("_footer.html");
}

$(document).ready(function () {
  ready();
});

function load() {
  site.header.init()

  AOS.init();

  $('.loader-image').fadeOut(350);
  $('.loader-component').delay(600).fadeOut('slow');
  $('main').css({
    opacity: 1
  });
}

$(window).on('load', function () {
  load();
});

function resize() {
  var r = responsive()
  // console.log("r", r)
}

$(window).on('resize', function () {
  resize();
});
