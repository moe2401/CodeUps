jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-drawer").fadeToggle();
    });
  });

  // ドロワーナビのaタグをクリックで閉じる
  $(".js-drawer a[href]").on("click", function () {
    $(".js-hamburger").removeClass("is-open");
    $(".js-drawer").fadeOut();
  });

  //スライダー
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

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //トップへ戻るボタン
  $(function () {
    const pagetop = $(".page-top-button");
    pagetop.hide(); //最初はボタンを非表示
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        //100px以上スクロールしたら
        pagetop.fadeIn(); //ボタンをフェードイン
      } else {
        pagetop.fadeOut(); //ボタンをフェードアウト
      }
    });
    pagetop.click(function () {
      $("body,html").animate(
        {
          scrollTop: 0, //上から0pxの位置に戻る
        },
        800
      ); //800ミリ秒かけて上に戻る
      return false;
    });
  });

  //フッター手前で止まるボタン
  $(document).ready(function () {
    $(".page-top-button").hide();
    $(window).on("scroll", function () {
      scrollHeight = $(document).height(); //ドキュメントの高さ
      scrollPosition = $(window).height() + $(window).scrollTop(); //現在の位置
      footHeight = $("footer").innerHeight(); //フッターの高さ
      if (scrollHeight - scrollPosition <= footHeight) {
        //ドキュメントの高さと現在の位置の差がフッターの高さ以下のとき
        $(".page-top-button").css({
          position: "absolute",
          bottom: footHeight + 0,
        }); //pisitionをabsoluteに変更
      } else {
        //それ以外の場合は
        $(".page-top-button").css({ position: "fixed", bottom: "0" }); //固定で表示
      }
    });
  });

  // var speed = 700; // speed変数を定義
  // $(".information__img, .voice-card__img, .price__img").each(function () {
  //   $(this).append('<div class="color"></div>');
  //   var color = $(this).find(".color"),
  //     image = $(this).find("img");
  //   var counter = 0;

  //   image.css("opacity", "0");
  //   color.css("width", "0%");
  //   //inviewを使って背景色が画面に現れたら処理をする
  //   color.on("inview", function () {
  //     if (counter == 0) {
  //       $(this)
  //         .delay(200)
  //         .animate({ width: "100%" }, speed, function () {
  //           image.css("opacity", "1");
  //           $(this).css({ left: "0", right: "auto" });
  //           $(this).animate({ width: "0%" }, speed);
  //         });
  //       counter = 1;
  //     }
  //   });
  // });
});
