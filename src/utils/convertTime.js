export function convertTime(time) {
  if (time) {
    let [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `at ${hours}:${minutes} ${ampm}`;
  }
  return "";
}
