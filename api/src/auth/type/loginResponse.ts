export interface LoginResponse {
  fullname: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken?: string;
  studentId?: string;
  advisorId?: string;
  companyName?: string;
  profilePicture?: string;
}
