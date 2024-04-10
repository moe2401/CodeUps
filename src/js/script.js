jQuery(function ($) {
  // service_swiper.autoplay.stop();
  // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-drawer").fadeToggle();
    });

    // ドロワーナビのaタグをクリックで閉じる
    $(".js-drawer a[href]").on("click", function () {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").fadeOut();
    });

    //スライダー;
    const mv_swiper = new Swiper(".js-mv-swiper", {
      loop: true,
      effect: "fade",
      speed: 3000,
      allowTouchMove: false,
      autoplay: {
        delay: 3000,
      },
    });

    //カードスライド
    var campaign_swiper = new Swiper(".js-campaign-swiper", {
      loop: true,
      speed: 2000,
      slidesPerView: 1.5,
      spaceBetween: 24,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 3.5,
          spaceBetween: 40,
        },
      },
      // navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      // },
    });

    // ページトップボタン
    $(function () {
      const pageTop = $(".js-page-top");
      pageTop.hide();
      $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
          pageTop.fadeIn();
        } else {
          pageTop.fadeOut();
        }
      });
      pageTop.click(function () {
        $("body, html").animate(
          {
            scrollTop: 0,
          },
          300
        );
        return false;
      });
    });
  });
});
