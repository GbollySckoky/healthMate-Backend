export function generateOTP(): string {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

export function generateMemorableOTP(): string {
  const patterns = [
    () => {
      const n = Math.floor(10 + Math.random() * 90); // 2-digit number
      return `${n}${n}${n}`.slice(0, 6); // e.g., 454545
    },
    () => {
      const start = Math.floor(Math.random() * 5); // 0–4
      return Array.from({ length: 6 }, (_, i) => (start + i) % 10).join(''); // e.g., 345678
    },
    () => {
      const half = Math.floor(100 + Math.random() * 900);
      return `${half}${half}`; // e.g., 348348
    },
  ];

  const chosen = patterns[Math.floor(Math.random() * patterns.length)];
  return chosen();
}

