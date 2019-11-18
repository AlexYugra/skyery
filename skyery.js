var dayOrNight = 'day';
function isMobile(){
        "use strict";
        var ua = navigator.userAgent;
        return !!(ua.match(/(iemobile|opera mini|iphone|ipad|ipod|blackberry|andriod)/i)||ua.search(/mobile/i)>0);
}
isMobile()? stylizeMobile() : stylizeDesktop();
function stylizeMobile() {
	$('.container_sun, .container_moon').css({ 'top': '5%' });
	
	

};
function stylizeDesktop() {
	$('.container_sun, .container_moon').css({ 'top': '20%' });
	$('h1').css('font-size', '5vmin');
};

$(document).ready(function() {
    skyery();
    dayOrNight == 'day' ? $('.container_moon').hide() : $('.container_sun').hide();
    
});

window.onresize = function() {
    $('.smallStars').remove();
    dayOrNight == 'day' ? $('.container_moon').hide() : $('.container_sun').hide();
    isMobile()? stylizeMobile() : stylizeDesktop();
    skyery();
}
$('.parallax').on('mouseleave', function() {
    dayOrNight == 'day' ? $('.container_sun').triggerHandler('click') : $('.container_moon').triggerHandler('click');
});
$('.container_sun').click(function() {
    dayOrNight = "night";
    $(this).fadeOut(800);
    $('.container_moon').fadeIn(1800);
    $('.parallax').css('animation', 'DayNight 1s ease-in forwards');
    $('h1, h5').css('animation', 'h1h5colorsNight 1s ease-in forwards');
    $('.sajtim_link, a').css('animation', 'acolorsNight 1s ease-in forwards');
    $('.sajtim_link').css('background-color', '#2222246b');
});
$('.container_moon').click(function() {
    dayOrNight = "day";
    $(this).fadeOut(800);
    $('.container_sun').fadeIn(800);
    $('.parallax').css('animation', 'NightDay 1s ease-in backwards');
    $('h1, h5').css('animation', 'h1h5colorsDay 1s ease-in forwards');
    $('.sajtim_link, a').css('animation', 'acolorsDay 1s ease-in forwards');
    $('.sajtim_link').css('background-color', '#303a5926');
});

function skyery() {

    var bit_size_classes = ['bit1', 'bit2', 'bit3', 'bit4', 'bit5', 'bit6'];
    var colors = ['#FF7400', '#33CCCC', '#A60000', '#BF3030', '#009999', '#FFB273', '#FFFACD'];
    var bit_anim = ['bits', 'bits_contr', 'bits_static'],
        svg_items = [{
                viewbox: '0 0 50 50',
                xlink: '/bits/conterspiral.svg#conterspiral',
                stroke: 'AliceBlue'
            },
            {
                viewbox: '0 0 400 400',
                xlink: '/bits/ninestar.svg#ninestar',
                stroke: 'AliceBlue'
            },
            {
                viewbox: '0 0 500 500',
                xlink: '/bits/octastar.svg#octastar',
                fill: 'AliceBlue'

            },
            {
                viewbox: '0 0 24 24',
                xlink: '/bits/spiral.svg#spiral',
                stroke: 'AliceBlue'
            },
            {
                viewbox: '0 0 340 340',
                xlink: '/bits/star.svg#star',
                fill: 'AliceBlue'
            },
            {
                viewbox: '0 0 639 600',
                xlink: '/bits/triskele.svg#triskele',
                fill: 'AliceBlue'
            }
        ];


    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand; //спасибо Илье Кантору
    }

    $('.containers').each(function(index) {
        var rand_bit = svg_items[randomInteger(0, 5)],
            rand_horizont = randomInteger(0, 90),
            rand_vertical = randomInteger(0, 90),
            rand_size = randomInteger(0, 5),
            rand_colors = randomInteger(0, 6),
            rand_anim = randomInteger(0, 2),
            subdiv = $(this).children(':first'),
            this_svg = $(this).find('svg'),
            this_use = $(this).find('use');

        $(this).attr('style', 'left:' + rand_horizont + '%; top:' + rand_vertical + '%');
        subdiv.addClass(bit_anim[rand_anim] + ' ' + bit_size_classes[rand_size]);
        if (subdiv.hasClass('bits_static')) subdiv.attr('style', 'transform: rotate(' + rand_vertical + 'deg);');
        this_svg.attr('viewBox', rand_bit.viewbox);
        this_use.attr('xlink:href', rand_bit.xlink);
        if (rand_bit.fill) {
            rand_bit.fill = colors[rand_colors];
            this_use.attr('fill', rand_bit.fill);
        } else {
            rand_bit.stroke = colors[rand_colors];
            this_use.attr('stroke', rand_bit.stroke);
        }

    });



    function Star(size) {
        var smallStar = $("<div></div>", {
            "class": "bits_static smallStars",
            "style": "width: " + size + "px; height: " + size + "px;"
        });
        return smallStar;
    }

    function addOctaStar(min, max) {
        var octaStarSize = randomInteger(5, 8);
        var randomPosHorizont = randomInteger(min, max),
            randomPosVertical = randomInteger(min, max);
        var octastar = Star(octaStarSize);
        octastar.load("/bits/octastar.svg#octastar");
        octastar.css({ "left": randomPosHorizont + "%", "top": randomPosVertical + "%", "fill": "gold" });
        octastar.prependTo($('.parallax'));
    }

    function addCircle(min, max) {
        var circleStarSize = randomInteger(2, 5),
            randomPosHorizont = randomInteger(min / 3, max),
            randomPosVertical = randomInteger(min * 2, max);
        var circlestar = Star(circleStarSize);
        circlestar.load("/bits/octastar.svg#octastar");
        circlestar.css({ "left": randomPosHorizont + "%", "top": randomPosVertical + "%", "fill": "#F5FFFA" });
        circlestar.prependTo($('.parallax'));
    }
    for (var i = 0; i <= 48; i++) {
        addOctaStar(0, 95);
        addCircle(0, 95);
    }
    for (var i = 0; i <= 24; i++) {
        addCircle(10, 80);
    }

    for (var i = 0; i <= 48; i++) {
        addCircle(30, 90);
    }

    function parallax() {
        var pax_top = $('.parallax').offset().top,
            pax_left = $('.parallax').offset().left,
            pax_width = $('body').width() - $('body').width() + $('.parallax').width(),
            pax_height = $('.parallax').height();
        var small_pos = $('.smallStars');
        small_pos.each(function() {
            this.init_position = $(this).position();
        });
        var containers_pos = $('.containers');
        containers_pos.each(function() {
            this.init_position = $(this).position();
        });
        var sun_init_pos = function() {
            var sun_init;
            dayOrNight == 'day' ? sun_init = $('.container_sun').position() : sun_init = $('.container_moon').position();
            return sun_init;
        };
        $('.parallax').mousemove(function(event) {
            var mouseX = event.pageX - pax_left,
                mouseY = event.pageY - pax_top;
            $('.smallStars').each(function() {
                $(this).css({
                    'top': this.init_position.top + (mouseY - pax_height / 2) / 32,
                    'left': this.init_position.left + (mouseX - pax_width / 2) / 32
                });
            });
            $('.containers').each(function() {
                $(this).css({
                    'top': this.init_position.top - (mouseY - pax_height / 2) / 48,
                    'left': this.init_position.left - (mouseX - pax_width / 2) / 48
                });
            });
            $('.container_sun, .container_moon').css({
                'top': sun_init_pos.top - (mouseY - pax_height / 2) / 64,
                'left': sun_init_pos.left + (mouseX - pax_width / 2) / 64
            });

        });
    }
    $('.parallax').hover(parallax());
}
