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

export function determineColor(todo) {
  let color = "";
  if (todo.isCompleted) {
    color = "green";
  } else if (todo.date) {
    const timeDiff = new Date(todo.date) - new Date().setHours(0, 0, 0, 0);
    if (timeDiff < 0) {
      color = "red";
    } else if (timeDiff < 3 * 24 * 60 * 60 * 1000) {
      color = "orange";
    }
  }
  return color;
}

export function levelToText(value) {
  if (value <= 3) {
    return "Low";
  } else if (value <= 7) {
    return "Medium";
  }
  return "High";
}

export const variants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
};
