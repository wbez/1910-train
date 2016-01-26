// Global jQuery references
var $commentCount = null;

/*
 * Run on page load.
 */
var onDocumentLoad = function(e) {
    // Cache jQuery references
    $commentCount = $('.comment-count');

    renderExampleTemplate();

    SHARE.setup();
}

/*
 * Basic templating example.
 */
var renderExampleTemplate = function() {
    var context = $.extend(APP_CONFIG, {
        'template_path': 'jst/example.html',
        'config': JSON.stringify(APP_CONFIG, null, 4),
        'copy': JSON.stringify(COPY, null, 4)
    });

    var html = JST.example(context);

    $('#template-example').html(html);
}

/*
 * Display the comment count.
 */
var showCommentCount = function(count) {
    $commentCount.text(count);

    if (count > 0) {
        $commentCount.addClass('has-comments');
    }

    if (count > 1) {
        $commentCount.next('.comment-label').text('Comments');
    }
}

var onPageLoad = function() {
    $('.section').css({
      'opacity': 1,
      'visibility': 'visible',
    });
};

/*
 * DInitialize fullpage.
 */
$(document).ready(function() {
    $('#fullpage').fullpage({
        verticalCentered: true,
        controlArrows: true,
        css3: true,
        fixedElements: '#nav',
        loopHorizontal: false,
        autoScrolling: false,
        keyboardScrolling: false,
        scrollingSpeed: 0,
        afterRender: onPageLoad,
        onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
            var leavingSlide = $(this);
            $.fn.fullpage.setScrollingSpeed(800);            
        },
        onLeave: function( index, nextIndex, direction){
            var leavingSlide = $(this);
            var scrollSpeed = 0;
            console.log(index, nextIndex, direction)
            if (index == 1 & nextIndex != 7) {
                scrollSpeed = 800;
            }
            $.fn.fullpage.setScrollingSpeed(scrollSpeed);          
        }
    });

    $('.start.btn').click(function(){
        $.fn.fullpage.moveTo(2,0)
    });

    $('.return').click(function(){
        $.fn.fullpage.moveTo(2, 0)
    });

    $('.credits').click(function(){
        $.fn.fullpage.moveTo(7, 0)
    });

    $('.flip').click(function(){
        $slide = $(this).parents( ".slide" )
        $slide.find('.front').toggleClass('active-side');
        $slide.find('.back').toggleClass('active-side');
        var bg = $slide.find('.active-side').data('background');
        $slide.css('background-image','url('+bg+')');
        console.log($slide)
    });

    for (var i = 0; i < COPY.personas.length; i++) {
        (function(j) {
            var personaID = COPY.personas[j]['id']
            var personaBtn = '.' + personaID + '-start'

            console.log(personaID,personaBtn)
            
            $(personaBtn).click(function(){
                $.fn.fullpage.moveTo(personaID)
            });

        })(i);
    }
});

$(onDocumentLoad);
