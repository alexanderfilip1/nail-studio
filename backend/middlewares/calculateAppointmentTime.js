function calculateAppointmentTime(time, neededTime) {
  let [hours, minutes] = time.split(":").map(Number);

  const additionalHours = Math.floor(neededTime / 60);
  const additionalMinutes = neededTime % 60;

  hours += additionalHours;
  minutes += additionalMinutes;

  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const resultTime = `${formattedHours}:${formattedMinutes}:00`;
  console.log(resultTime);
  return resultTime;
}

module.exports = calculateAppointmentTime;
