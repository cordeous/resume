import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';

/**
 * Generate QR code as data URL
 * @param {Object} personalInfo - Personal information to encode in QR code
 * @returns {Promise<string>} QR code data URL
 */
export const generateQRCode = async (personalInfo) => {
  // Create vCard format for contact information
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${personalInfo.fullName || ''}
TEL:${personalInfo.phone || ''}
EMAIL:${personalInfo.email || ''}
URL:${personalInfo.linkedin || ''}
URL:${personalInfo.github || ''}
END:VCARD`;

  try {
    const qrCodeDataURL = await QRCode.toDataURL(vCard, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

/**
 * Generate a business card PDF with QR code
 * @param {Object} personalInfo - Personal information
 * @param {string} qrCodeDataURL - QR code as data URL
 * @param {string} filename - Output filename
 */
export const generateBusinessCard = async (personalInfo, qrCodeDataURL = null, filename = 'business-card.pdf') => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 53.98] // Standard business card size (3.5" x 2")
  });

  // Generate QR code if not provided
  if (!qrCodeDataURL) {
    qrCodeDataURL = await generateQRCode(personalInfo);
  }

  // Set background color (optional - white background)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 85.6, 53.98, 'F');

  // Left side - Personal Information
  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(45, 55, 72); // Dark gray
  doc.text(personalInfo.fullName || 'Your Name', 8, 15);

  // Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // Medium gray

  let yPos = 22;
  if (personalInfo.email) {
    doc.text(personalInfo.email, 8, yPos);
    yPos += 5;
  }
  if (personalInfo.phone) {
    doc.text(personalInfo.phone, 8, yPos);
    yPos += 5;
  }
  if (personalInfo.linkedin) {
    doc.text(personalInfo.linkedin.replace('https://', '').replace('http://', ''), 8, yPos);
    yPos += 5;
  }
  if (personalInfo.github) {
    doc.text(personalInfo.github.replace('https://', '').replace('http://', ''), 8, yPos);
  }

  // Right side - QR Code
  doc.addImage(qrCodeDataURL, 'PNG', 57, 10, 23, 23); // Position QR code on right side

  // QR Code label
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Scan for contact', 59.5, 36, { align: 'left' });

  // Optional: Add a border
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(3, 3, 79.6, 47.98);

  // Save the PDF
  doc.save(filename);
  return doc;
};

/**
 * Download just the QR code as an image
 * @param {Object} personalInfo - Personal information
 * @param {string} filename - Output filename
 */
export const downloadQRCodeImage = async (personalInfo, filename = 'resume-qr-code.png') => {
  try {
    const qrCodeDataURL = await generateQRCode(personalInfo);

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw error;
  }
};
