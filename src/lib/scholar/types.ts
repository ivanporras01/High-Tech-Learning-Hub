/** Scholar account & session — client-side MVP; migrate to Firebase/Supabase later */

export interface ScholarAccount {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  institution?: string;
  createdAt: string;
}

export interface ScholarSession {
  scholarId: string;
  email: string;
  fullName: string;
}

export interface ScholarProgress {
  courseId: string;
  completedLessonIds: string[];
  completedLabIds: string[];
  certificateId?: string;
  certificateIssuedAt?: string;
}

export interface CertificateRecord {
  id: string;
  scholarId: string;
  scholarName: string;
  courseTitle: string;
  issuedAt: string;
}
