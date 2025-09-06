const footerBtn = document.getElementById("scrollButton");

function checkScroll() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  const canScroll = docHeight > windowHeight;

  if (!canScroll) {
    // 頁面無法滾動，直接顯示 footer
    footerBtn.classList.remove("d-none");
    return;
  }

  // 頁面可滾動時，捲到底才顯示 footer
  if (scrollTop + windowHeight >= docHeight - 1) {
    footerBtn.classList.remove("d-none");
  } else {
    footerBtn.classList.add("d-none");
  }
}

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);
window.addEventListener("resize", checkScroll);
