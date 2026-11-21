import type { Attendance, UcapanInput } from "@/types";

const ALLOWED_ATTENDANCE: Attendance[] = ["hadir", "tidak_hadir", "ragu"];
const MAX_NAME_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 300;

const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F-\u009F]/g;

function sanitize(str: string): string {
  return str.replace(CONTROL_CHARS_REGEX, "").trim();
}

export function validateUcapanInput(input: UcapanInput): {
  ok: boolean;
  errors: string[];
  data?: UcapanInput;
} {
  const errors: string[] = [];

  const name = sanitize(input.name);
  if (!name) {
    errors.push("Nama wajib diisi");
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.push(`Nama maksimal ${MAX_NAME_LENGTH} karakter`);
  }

  const message = sanitize(input.message);
  if (!message) {
    errors.push("Ucapan wajib diisi");
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.push(`Ucapan maksimal ${MAX_MESSAGE_LENGTH} karakter`);
  }

  const attendance = input.attendance;
  if (!ALLOWED_ATTENDANCE.includes(attendance)) {
    errors.push("Pilihan kehadiran tidak valid");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: [],
    data: { ...input, name, message },
  };
}

export function isHoneypotFilled(input: UcapanInput): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}