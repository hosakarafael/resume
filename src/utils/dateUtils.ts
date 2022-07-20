const defaultOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as Intl.DateTimeFormatOptions;

export const DAYS = [...Array(31).keys()].map((index) => {
  index++;
  return index.toString();
});

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentYear = new Date().getFullYear();

export const YEARS = [...Array(100).keys()].map((index) => {
  return (currentYear - index).toString();
});

export function formatDate(
  date: Date | string | null,
  format?: Intl.DateTimeFormatOptions
) {
  if (!date) {
    return "";
  }
  const d = new Date(date);
  if (format) {
    return d.toLocaleDateString("en-US", format);
  }
  return d.toLocaleDateString("en-US", defaultOptions);
}

export function splitDate(date: Date | null) {
  if (!date) {
    return ["", "", ""];
  }
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  return [year, month, day];
}

export function calculateAge(date: Date | string | null) {
  if (!date) {
    return "";
  }

  const now = new Date();
  const birthDate = new Date(date);
  let age = now.getFullYear() - birthDate.getFullYear();
  var month = now.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
