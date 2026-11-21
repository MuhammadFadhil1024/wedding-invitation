export type Attendance = "hadir" | "tidak_hadir" | "ragu";

export interface Ucapan {
  id: string;
  name: string;
  message: string;
  attendance: Attendance;
  created_at: string;
  is_visible: boolean;
}

export interface UcapanInput {
  name: string;
  message: string;
  attendance: Attendance;
  slug: string;
  website?: string;
}