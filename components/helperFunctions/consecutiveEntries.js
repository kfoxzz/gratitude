const today = new Date().toLocaleDateString('en-US');

let months = [];
let days = [];
let years = [];

function lastDayOfMonth(month) {
  switch (month) {
    case 12:
      return 31;
      break;
    case 11:
      return 30;
      break;
    case 10:
      return 31;
      break;
    case 9:
      return 30;
      break;
    case 8:
      return 31;
      break;
    case 7:
      return 31;
      break;
    case 6:
      return 30;
      break;
    case 5:
      return 31;
      break;
    case 4:
      return 30;
      break;
    case 3:
      return 31;
      break;
    case 2:
      return 28;
      break;
    case 1:
      return 31;
      break;
    default:
      break;
  }
}

export function consecutiveDates(arrayOfDates) {

  let consecutiveDays = 0;

  for (let i = 0; i < arrayOfDates.length; i++) {
    const splitDate = arrayOfDates[i].split('/');
    const month = Number(splitDate[0]);
    const day = Number(splitDate[1]);
    const year = Number(splitDate[2]);
    if (today === arrayOfDates[i]) {
      consecutiveDays += 1;
      months.push(month);
      days.push(day);
      years.push(year);
    } else {
      months.push(month);
      days.push(day);
      years.push(year);
      const yearsEqual = year === years[i - 1];
      const daysConsecutive = days[i - 1] - day === 1;
      const daysEqual = day === days[i-1];
      const monthsEqual = month === months[i - 1];
      if (monthsEqual && daysEqual && yearsEqual) {
        consecutiveDays += 1;
      } else if (monthsEqual && daysConsecutive && yearsEqual) {
        continue;
      } else if (
        months[i - 1] - month === 1 &&
        day === lastDayOfMonth(month) &&
        day > days[i - 1] &&
        yearsEqual
      ) {
        consecutiveDays += 1;
      } else if (
        month === 12 &&
        months[i - 1] === 1 &&
        years[i - 1] - year === 1 &&
        day === 31 &&
        days[i - 1] === 1
      ) {
        consecutiveDays += 1;
      } else {
        return consecutiveDays;
      }
    }
  }
  return consecutiveDays;
}