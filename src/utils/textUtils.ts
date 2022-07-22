export function textfit(id: string) {
  const measureWidth = (text: string, font: string) => {
    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
      }
    }
    return 0;
  };

  if (typeof window !== "undefined") {
    const ele = document.getElementById(id);
    if (ele) {
      const styles = window.getComputedStyle(ele);
      const font = styles.font;
      const fontSize = parseInt(styles.fontSize);

      const measured = measureWidth(ele?.textContent!, font);
      const scale = ele.clientWidth / measured;
      const scaleFontSize = Math.floor(scale * fontSize);
      ele.style.fontSize = `${scaleFontSize - 5}px`;
      ele.style.height = `${scaleFontSize - 5}px`;
    }
  }
}
