// (function () {

$(document).ready(function () {
    _bind_elements()
    // windowControls.init()
})

function _bind_elements() {
    // $(".window").mousedown(function () {
    //     _drag_init(this);
    // })
}

// TOGGLE SHOW/HIDE 
var windowControls = {
    init: function init() {
        $(".button_close").click(function (e) {
            e.preventDefault()
            e.stopPropagation()
            windowControls.hide(this)
        })

        // $(".button_show").click(function (e) {
        //     e.preventDefault()
        //     e.stopPropagation()
        //     console.log("show this", this)
        //     windowControls.show(this)
        // })
    },
    // show: _show_window,
    hide: _hide_window
}

// function _show_window(elem) {
//     elem = $(elem)
//     console.log("elem _show_window()", elem)
//     elem && elem.not(":visible")
//         ? elem.show()
//         : console.info(elem, "is already VISIBLE");
// }

function _hide_window(elem) {
    elem = $(elem).parents(".window")
    elem && elem.is(":visible")
        ? elem.hide()
        : console.info(elem, "is already HIDDEN");
}

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: false,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        cursorChecker: (action, interactable, element, interacting) => {
            switch (action.axis) {
                case 'x': return 'ew-resize'
                case 'y': return 'ns-resize'
                default: return interacting ? 'grabbing' : 'grab'
            }
        }
    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}