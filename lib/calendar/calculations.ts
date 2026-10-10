export function calculateDaysLived(birthDate: Date, currentDate: Date = new Date()): number {
  const birthUTC = Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate());
  const currentUTC = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate());
  return Math.floor((currentUTC - birthUTC) / 86400000);
}

export function calculateWeekdayOccurrences(birthDate: Date, currentDate: Date = new Date()): number {
  const daysLived = calculateDaysLived(birthDate, currentDate);
  // Every 7 days the same weekday comes around. The birthday is the 1st occurrence.
  return Math.floor(daysLived / 7) + 1;
}

export function calculateElapsedSinceBirth(birthDate: Date, currentDate: Date = new Date()) {
  const msTotal = Math.max(0, currentDate.getTime() - birthDate.getTime());
  
  const days = Math.floor(msTotal / (1000 * 60 * 60 * 24));
  const msRemaining = msTotal % (1000 * 60 * 60 * 24);
  
  const hours = Math.floor(msRemaining / (1000 * 60 * 60));
  const minRemaining = msRemaining % (1000 * 60 * 60);
  
  const minutes = Math.floor(minRemaining / (1000 * 60));
  const secRemaining = minRemaining % (1000 * 60);
  
  const seconds = Math.floor(secRemaining / 1000);
  
  return { days, hours, minutes, seconds, msTotal };
}
