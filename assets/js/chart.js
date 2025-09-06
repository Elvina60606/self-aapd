const ctx = document.getElementById("myChart").getContext("2d");

// 模擬資料
const labels = ["7月1日", "7月16日", "8月1日", "8月16日", "9月1日", "9月16日"];
const data = [33, 32, 29, 27.4, 23.3, 22.4];
const highlightIndices = [1, 4];

// 需要標示的點索引
const gradient = ctx.createLinearGradient(0, 0, 0, 200);

// 產生漸層
gradient.addColorStop(0, "rgba(255, 184, 93, 0.4)");
gradient.addColorStop(1, "rgba(255, 184, 93, 0)");

// 自定義插件繪製虛線和標籤
const highlightPlugin = {
  id: "highlightPlugin",
  afterDatasetsDraw(chart) {
    const {
      ctx,
      chartArea: { top, bottom },
      scales: { x, y },
    } = chart;

    highlightIndices.forEach((idx) => {
      const xPos = x.getPixelForValue(idx);
      const yPos = y.getPixelForValue(data[idx]);

      // 畫虛線
      ctx.save();
      ctx.strokeStyle = "rgba(99, 143, 255, 0.6)";
      ctx.setLineDash([4, 8]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xPos, top);
      ctx.lineTo(xPos, bottom);
      ctx.stroke();
      ctx.restore();

      // 畫圓點
      ctx.save();
      ctx.fillStyle = "#5e92f3";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(xPos, yPos, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // 畫百分比標籤背景
      const labelText = data[idx] + "%";
      ctx.save();
      ctx.fillStyle = "black";
      ctx.font = "bold 12px Arial";
      const textWidth = ctx.measureText(labelText).width;
      const padding = 6;
      const rectWidth = textWidth + padding * 2;
      const rectHeight = 20;
      const rectX = xPos - rectWidth / 2;
      const rectY = yPos - 30;

      // 圓角矩形
      const radius = 5;
      ctx.beginPath();
      ctx.moveTo(rectX + radius, rectY);
      ctx.lineTo(rectX + rectWidth - radius, rectY);
      ctx.quadraticCurveTo(
        rectX + rectWidth,
        rectY,
        rectX + rectWidth,
        rectY + radius
      );
      ctx.lineTo(rectX + rectWidth, rectY + rectHeight - radius);
      ctx.quadraticCurveTo(
        rectX + rectWidth,
        rectY + rectHeight,
        rectX + rectWidth - radius,
        rectY + rectHeight
      );
      ctx.lineTo(rectX + radius, rectY + rectHeight);
      ctx.quadraticCurveTo(
        rectX,
        rectY + rectHeight,
        rectX,
        rectY + rectHeight - radius
      );
      ctx.lineTo(rectX, rectY + radius);
      ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
      ctx.closePath();
      ctx.fill();

      // 寫文字
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labelText, xPos, rectY + rectHeight / 2);
      ctx.restore();
    });
  },
};

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels,
    datasets: [
      {
        label: "百分比",
        data,
        borderColor: "#F3AF5C", // 線條顏色
        borderWidth: 3,
        fill: true,
        backgroundColor: gradient,
        tension: 0.2, // 曲線平滑度
        pointRadius: 0, // 不顯示預設點
        hitRadius: 10,
        hoverRadius: 7,
        hoverBorderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000,
    },
    scales: {
      x: {
        border: {
          display: false, // 隱藏軸線
        },
        grid: {
          display: false, // 隱藏網格
          drawTicks: false,
          drawBorder: false,
        },
        ticks: {
          display: false, // 隱藏刻度
        },
      },
      y: {
        max: 40, // 調整 Y 軸範圍
        min: 10,
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30, // 多留點底部空白
      },
    },
  },
  plugins: [highlightPlugin],
});
