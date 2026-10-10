export const MONTHS_AMHARIC = [
  "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት",
  "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
];

export const MONTHS_ENGLISH = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yakatit",
  "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"
];

const UNIX_EPOCH_JDN = 2440588;
const ETHIOPIAN_EPOCH_JDN = 1724221;

function dateToJDN(date: Date): number {
  return Math.floor(date.getTime() / 86400000) + UNIX_EPOCH_JDN;
}

function jdnToDate(jdn: number): Date {
  return new Date((jdn - UNIX_EPOCH_JDN) * 86400000);
}

export function ethiopianToGregorian(year: number, month: number, day: number): Date {
  const jdn = ETHIOPIAN_EPOCH_JDN + 365 * (year - 1) + Math.floor(year / 4) + (month - 1) * 30 + day - 1;
  return jdnToDate(jdn);
}

export function gregorianToEthiopian(date: Date) {
  const jdn = dateToJDN(date);
  const r = jdn - ETHIOPIAN_EPOCH_JDN;
  const n = Math.floor(r / 1461); // 1461 days in a 4-year cycle
  
  let days = r % 1461;
  let year = n * 4 + 1;

  while (true) {
    const isLeap = (year % 4 === 3);
    const daysInYear = isLeap ? 366 : 365;
    if (days < daysInYear) break;
    days -= daysInYear;
    year++;
  }

  const month = Math.floor(days / 30) + 1;
  const day = (days % 30) + 1;

  return {
    year,
    month,
    day,
    monthNameAmharic: MONTHS_AMHARIC[month - 1],
    monthNameEnglish: MONTHS_ENGLISH[month - 1]
  };
}
