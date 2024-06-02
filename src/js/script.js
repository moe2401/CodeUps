jQuery(function ($) {
  //ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-header").toggleClass("is-active");
      $(".js-drawer").fadeToggle();

      //drawer開いたらbodyスクロールしない
      // 現在のbodyタグのoverflowスタイルを確認
      if ($("body").css("overflow") === "hidden") {
        // もしoverflowがhiddenなら、bodyのスタイルを元に戻す
        $("body").css({
          height: "",
          overflow: "",
        });
      } else {
        // そうでなければ、bodyにheight: 100%とoverflow: hiddenを設定し、スクロールを無効にする
        $("body").css({
          height: "100%",
          overflow: "hidden",
        });
      }
    });
  });

  // ドロワーナビのaタグをクリックで閉じる
  $(".js-drawer a[href]").on("click", function () {
    $(".js-hamburger").removeClass("is-open");
    $(".js-drawer").fadeOut();
  });

  // resizeイベント
  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-open");
      $(".js-header").removeClass("is-active");
      $(".js-drawer").fadeOut();
    }
  });

  // スライダー
  var mv_swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  });

  // カードスライド;
  var campaign_swiper = new Swiper(".js-campaign-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    speed: 2000,

    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 40,
        width: 333,
      },
    },

    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //ページトップに戻るボタン
  const pageTop = $(".page-top-button");
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });

  // フッター手前でストップ;
  $(".page-top-button").hide();
  $(window).on("scroll", function () {
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = $("footer").innerHeight();
    if (scrollHeight - scrollPosition <= footHeight) {
      $(".page-top-button").css({
        position: "absolute",
        bottom: footHeight + 20,
      });
    } else {
      $(".page-top-button").css({
        position: "fixed",
        bottom: 30,
      });
    }
  });

  var speed = 700; // speed変数を定義
  var $elements = $(".information__img, .voice-card__img, .price__img");
  if ($elements.length > 0) {
    $elements.each(function () {
      $(this).append('<div class="color"></div>');
      var color = $(this).find(".color"),
        image = $(this).find("img");
      var counter = 0;

      image.css("opacity", "0");
      color.css("width", "0%");

      //inviewを使って背景色が画面に現れたら処理をする
      color.on("inview", function () {
        if (counter == 0) {
          $(this)
            .delay(200)
            .animate({ width: "100%" }, speed, function () {
              image.css("opacity", "1");
              $(this).css({ left: "0", right: "auto" });
              $(this).animate({ width: "0%" }, speed);
            });
          counter = 1;
        }
      });
    });
  }

  var speed = 700; // speed変数を定義
  $(".information__img, .voice-card__img, .price__img").each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find(".color"),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");

    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  // // モーダルウィンドウ
  const galleryItems = document.querySelectorAll(".gallery-list__item");
  const zoomContent = document.querySelector(".zoom__content");
  const body = document.querySelector("body");

  // 初期状態でzoomContentを非表示にする
  // zoomContent.style.display = "none";

  // galleryItems.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     const img = item.querySelector("img");
  //     const zoomImg = document.createElement("img");
  //     zoomImg.src = img.src;
  //     zoomImg.alt = img.alt;

  //     // zoomContentの中身をリセット
  //     zoomContent.innerHTML = "";
  //     zoomContent.appendChild(zoomImg);
  //     zoomContent.style.display = "flex";

  //     // スクロールを無効化
  //     body.classList.add("no-scroll");
  //   });
  // });

  // zoomContentがクリックされたら非表示にする;
  // zoomContent.addEventListener("click", (event) => {
  //   if (event.target === event.currentTarget) {
  //     zoomContent.style.display = "none";

  //     // スクロールを有効化
  //     body.classList.remove("no-scroll");
  //   }
  // });

  //タブ切り替え
  jQuery(function ($) {
    $(".js-tab-info-menu").on("click", function () {
      // 他のタブメニューアイテムの選択状態を解除
      $(".js-tab-info-menu").removeClass("is-tab");
      // 他のタブコンテンツアイテムを非表示
      $(".js-tab-info-content").removeClass("is-tab");
      // クリックされたタブメニューアイテムを選択状態に
      $(this).addClass("is-tab");
      // 対応するタブコンテンツアイテムを表示
      var number = $(this).data("number");
      $("#" + number).addClass("is-tab");

      // 他のタブのアイコン画像を緑に変更する
      $(".js-tab-info-menu")
        .not(this)
        .find(".tab-info__img img")
        .attr("src", "../assets/images/sub/whale-green.png");

      // クリックされたタブのアイコン画像を緑に変更する
      $(this)
        .find(".tab-info__img img")
        .attr("src", "../assets/images/sub/whale-green.png");

      // クリックされたタブに関連付けられた画像パスを取得し、画像のsrc属性を変更する
      var defaultImage = $(this).data("image-default");
      $(this).find(".tab-info__img img").attr("src", defaultImage);
    });

    // 初期状態でis-tabがついている要素の画像を白に設定
    $(".js-tab-info-menu.is-tab")
      .find(".tab-info__img img")
      .attr("src", "../assets/images/sub/whale-white.png");
  });

  //FAQ
  jQuery(function ($) {
    $(".js-faq-question").on("click", function () {
      $(this).next().slideToggle();
      $(this).toggleClass("is-open");
    });
  });
});
