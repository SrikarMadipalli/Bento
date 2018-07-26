$(document).ready(() => {
  $(window).scroll(() => {
    const scroll = $(window).scrollTop();
    if (scroll > 700) {
      $(".navbar").css("background", "pink");
    }
    if (scroll < 700) {
      $(".navbar").css("background", "transparent");
    }
  })
})