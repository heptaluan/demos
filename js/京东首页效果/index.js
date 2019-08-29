$(function () {
  $('.navRight li').mouseenter(function () {
    $(this).children('span').css('transform', 'rotate(135deg)');
  }).mouseleave(function () {
    $(this).children('span').css('transform', 'rotate(-45deg)');
  })
  $('.fenlei ul li').mouseenter(function () {
    $(this).stop().animate({ 'height': '289px' }, 300).siblings().stop().animate({ 'height': '44px' }, 300);
    $(this).siblings().css('background', '#F5F5F5');
    $('.fenleiright').fadeTo(0, 0.8).stop().animate({ 'width': '289px' }, 300);
  }).mouseleave(function () {
    $('.fenlei ul li').stop().animate({ 'height': '79px' }, 300)
    $(this).siblings().css('background', '#ffffff');
  });
  $('.navLeft').mouseleave(function () {
    $('.fenleiright').stop().animate({ 'width': '0px' }, 300);
  })
})