const footerBtn = document.getElementById("scrollButton");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= docHeight - 1) {
    // 捲到底，移除 d-none 顯示 footer
    footerBtn.classList.remove("d-none");
  } else {
    // 沒捲到底，加回 d-none 隱藏 footer
    footerBtn.classList.add("d-none");
  }
});
