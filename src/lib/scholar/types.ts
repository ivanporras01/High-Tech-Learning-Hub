export type ScholarAccount = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  institution?: string;
  createdAt: string;
};

export type ScholarSession = {
  scholarId: string;
  email: string;
  fullName: string;
};

export type Scholar = {
  id: string;
  fullName: string;
  email: string;
  institution?: string;
  registeredAt: string;
};

export type ScholarProgress = {
  completedLessonIds: string[];
  certificateIssuedAt?: string;
  certificateId?: string;
};
