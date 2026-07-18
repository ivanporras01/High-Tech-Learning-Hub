import { getScholarProgress, saveScholarProgress } from "./progress";
import type { CertificateRecord } from "./types";

export const CERTIFICATE_COURSE_TITLE =
  "Quantum Workforce Academy — Foundations Certificate";

function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `QWA-FOUND-${year}-${suffix}`;
}

export function issueCertificate(
  scholarId: string,
  scholarName: string
): CertificateRecord {
  const progress = getScholarProgress(scholarId);

  if (progress.certificateId && progress.certificateIssuedAt) {
    return {
      id: progress.certificateId,
      scholarId,
      scholarName,
      courseTitle: CERTIFICATE_COURSE_TITLE,
      issuedAt: progress.certificateIssuedAt,
    };
  }

  const issuedAt = new Date().toISOString();
  const id = generateCertificateId();

  saveScholarProgress(scholarId, {
    ...progress,
    certificateId: id,
    certificateIssuedAt: issuedAt,
  });

  return {
    id,
    scholarId,
    scholarName,
    courseTitle: CERTIFICATE_COURSE_TITLE,
    issuedAt,
  };
}

export function formatCertificateDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
