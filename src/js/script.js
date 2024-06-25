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
  $(document).ready(function () {
    const $modalContent = $(".modal .bigimg");

    function showModal(imgSrc, imgAlt) {
      $modalContent.html(`<img src="${imgSrc}" alt="${imgAlt}" />`);
      $(".modal").fadeIn();
      $("body").addClass("no-scroll");
    }

    $(".js-modal-open").click(function (e) {
      e.preventDefault();

      var $img = $(this).find("img");
      var imgSrc = $img.attr("src");
      var imgAlt = $img.attr("alt");

      showModal(imgSrc, imgAlt);
    });

    $(".modal").click(function (e) {
      // モーダルの背景または画像がクリックされたかをチェック
      if (
        $(e.target).is(".modal") ||
        $(e.target).closest(".modal .bigimg img").length
      ) {
        $(this).fadeOut(() => {
          // フェードアウト完了後に中身をクリア
          $modalContent.empty();
        });
        $("body").removeClass("no-scroll");
      }
    });
  });

  //informationタブ切り替え
// 指定された要素への滑らかなスクロールアニメーション
// function scrollToElement(selector) {
//   var element = $(selector);
//   if (element.length) {
//     $("html, body").animate({
//       scrollTop: element.offset().top
//     }, 100);
//   }
// }



//   $(function () {
//     // URLに#tabが含まれている場合、対応するタブをアクティブにする
//     if (location.hash) {
//       $(".js-tab-info-menu").removeClass("current");
//       var hash = location.hash;
//       $(".js-tab-info-content").hide();
//       $(hash).css("display", "flex");
//       $(
//         '.js-tab-info-menu[data-number="' + hash.replace("#", "") + '"]'
//       ).addClass("current");
//     } else {
//       // 初期状態で最初のタブコンテンツを表示
//       $(".js-tab-info-content:first-of-type").css("display", "flex");
//     }
  
//     // タブメニューがクリックされたときの処理
//     $(".js-tab-info-menu").on("click", function () {
//       // 他のタブメニューアイテムの選択状態を解除
//       $(".js-tab-info-menu").removeClass("current");
//       // クリックされたタブメニューアイテムを選択状態に
//       $(this).addClass("current");
//       // すべてのタブコンテンツを非表示
//       $(".js-tab-info-content").hide();
//       // 対応するタブコンテンツを表示
//       var dataNumber = $(this).attr("data-number");
//       $("#" + dataNumber).fadeIn(400);
//     });
  
//     var hash = window.location.hash;
//     if (hash) {
//       $(".js-tab-info-content").hide();
//       $(hash).show();
//       $(
//         '.js-tab-info-menu[data-number="' + hash.replace("#", "") + '"]'
//       ).addClass("current");
//     }
  
//     // クエリパラメーターでタブを指定する場合の処理
//     // $('a[href*="information.html?id="]').on('click', function(e) {
//     //   var targetId = $(this).attr('href').split('=')[1];
//     //   var targetTab = $('#tab' + targetId);
    
//     //   $('.js-tab-info-menu').removeClass('current');
//     //   $('.js-tab-info-menu[data-number="tab' + targetId + '"]').addClass('current');
    
//     //   $('.js-tab-info-content').hide();
//     //   targetTab.fadeIn(400);
//     // });

//     // アンカーリンクをつけないとリンクが遷移しない
// // アンカーリンクなしで遷移するようなjsの記述をしてください

// $('a[href*="information.html?id="]').on('click', function(e) {
//   e.preventDefault(); // リンクのデフォルト動作をキャンセル

//   var targetId = $(this).attr('href').split('=')[1];
//   var targetTab = $('#tab' + targetId);

//   $('.js-tab-info-menu').removeClass('current');
//   $('.js-tab-info-menu[data-number="tab' + targetId + '"]').addClass('current');

//   $('.js-tab-info-content').hide();
//   targetTab.fadeIn(400);
// });
    
// });


$(document).ready(function () {
  var tabButton = $(".js-tab-info-menu"),
    tabContent = $(".js-tab-info-content");

  function activateTab(tabName) {
    tabButton.removeClass("current");
    tabContent.removeClass("current");

    // タブボタンとタブコンテンツを一致させる
    tabButton.each(function (index) {
      if ($(this).data("number") === tabName) {
        $(this).addClass("current");
        tabContent.eq(index).addClass("current");
      }
    });
  }

  // ページ読み込み時にクエリパラメーターを確認してタブを表示
  var params = new URLSearchParams(window.location.search);
  var tab = params.get('id');
  if (tab) {
    activateTab(tab);
  }

  // タブクリック時の処理
  tabButton.on("click", function () {
    var tabId = $(this).data("number");
    activateTab(tabId);
    
    // URLにクエリパラメータを追加（ページ遷移なし）
    var newUrl = window.location.pathname + '?id=' + tabId + window.location.hash;
    history.pushState(null, '', newUrl);
  });

  // 初回ロード時にタブの状態を更新
  if (!tab) {
    activateTab("tab01"); // デフォルトタブ
  }
});


// ページ内リンクをクリックした際のスクロール処理
// document.querySelectorAll('a[href^="information.html?id="]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();

//     const targetId = this.getAttribute('href').split('=')[1];
//     const targetElement = document.getElementById(targetId);

//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth' });

//       // URLのハッシュを更新してページ内リンクが正しく動作するようにする
//       history.pushState(null, null, `#${targetId}`);
//     }
//   });
// });




  //archive アーカイブ
  $(".js-drawer-accordion").on("click", function () {
    $(this).next().slideToggle(500);
    $(this).toggleClass("is-open");
  });
});

//FAQ
jQuery(function ($) {
  $('.js-faq-question').on('click', function () {
      $(this).next().slideToggle();
      $(this).toggleClass('is-open');
  });
});
