// Utility functions for exporting Q&A to PDF and DOCX
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import jsPDF from 'jspdf';

export interface QAItem {
  question: string;
  answer: string;
}

export function exportQAToPDF(qaList: QAItem[], filename = 'interview-qa.pdf') {
  const doc = new jsPDF();
  let y = 20;
  doc.setFontSize(16);
  doc.text('Interview Q&A', 10, y);
  y += 10;
  doc.setFontSize(12);
  qaList.forEach((item, idx) => {
    doc.text(`${idx + 1}. Q: ${item.question}`, 10, y);
    y += 8;
    doc.text(`   A: ${item.answer}`, 14, y);
    y += 12;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });
  doc.save(filename);
}

export async function exportQAToDOCX(qaList: QAItem[], filename = 'interview-qa.docx') {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: 'Interview Q&A', bold: true, size: 32 })],
            spacing: { after: 300 },
          }),
          ...qaList.flatMap((item, idx) => [
            new Paragraph({
              children: [new TextRun({ text: `${idx + 1}. Q: ${item.question}`, bold: true })],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: `A: ${item.answer}` })],
              spacing: { after: 200 },
            }),
          ]),
        ],
      },
    ],
  });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
