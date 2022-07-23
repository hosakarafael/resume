import { jsPDF } from "jspdf";
import { toCanvas } from "html-to-image";

const generatePDF = async (html: HTMLDivElement, fileName: string) => {
  function filter(node: HTMLElement) {
    return !node.classList?.contains("ignorePDF");
  }

  const image = await toCanvas(html, {
    quality: 0.2,
    filter: filter,
  });
  const pdf = new jsPDF("portrait", "px", "a4");
  const imgProps = pdf.getImageProperties(image);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
  pdf.save(fileName);
};

export default generatePDF;
