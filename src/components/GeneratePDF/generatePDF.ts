import React from "react";
import { jsPDF } from "jspdf";
import { toCanvas } from "html-to-image";

const generatePDF = async (
  html: React.RefObject<HTMLDivElement>,
  fileName: string
) => {
  const image = await toCanvas(html.current!, {
    quality: 0.2,
  });
  const pdf = new jsPDF("portrait", "px", "a4");
  const imgProps = pdf.getImageProperties(image);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
  pdf.save(fileName);
};

export default generatePDF;
