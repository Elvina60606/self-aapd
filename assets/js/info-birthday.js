// 匯入 Flatpickr CSS 與 JS
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

// 等整個頁面載入完成再初始化
window.addEventListener("load", () => {
  // 取得按鈕與隱藏 input
  const birthdayInput = document.getElementById("birthdayInput");
  const birthdayText = document.getElementById("birthdayText");
  const birthdayBtn = document.getElementById("birthdaySelect");

  if (!birthdayInput || !birthdayText || !birthdayBtn) {
    console.warn("Birthday elements not found, skipping Flatpickr initialization.");
    return;
  }

  // 初始化 Flatpickr
  const fp = flatpickr(birthdayInput, {
    dateFormat: "Y-m-d",   // 日期格式
    defaultDate: null,      // 預設不填日期
    onChange: (selectedDates, dateStr) => {
      // 選好日期後更新按鈕文字
      birthdayText.textContent = dateStr || "生日";
    }
  });

  // 點擊按鈕時開啟 Flatpickr
  birthdayBtn.addEventListener("click", () => {
    fp.open();
  });

  console.log("Birthday Flatpickr initialized successfully.");
});
