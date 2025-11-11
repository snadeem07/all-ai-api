import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId: string, fileName: string = 'ai-model-comparison.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  // Capture the element as canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
  });

  // Convert canvas to image
  const imgData = canvas.toDataURL('image/png');

  // Calculate PDF dimensions
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(fileName);
}

export async function exportToImage(elementId: string, fileName: string = 'ai-model-comparison.png') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
  });

  // Convert to blob and download
  canvas.toBlob((blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  });
}

export function shareLink(selectedModels: string[]) {
  const params = new URLSearchParams();
  if (selectedModels.length > 0) {
    params.set('models', selectedModels.join(','));
  }

  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    return url;
  }

  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = url;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  return url;
}
