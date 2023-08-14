import moment from "moment";

export const determineToiletStatus = (toilet) => {
  const currentTime = moment();

  if (toilet.horaire === null) {
    return "Not Available";
  }

  if (toilet.horaire === "24 h / 24") {
    return "Open";
  }

  const [openingTime, closingTime] = toilet.horaire.split(" - ");

  // Assuming the time is in 24 hours format
  const opening = moment(openingTime, "H h");
  const closing = moment(closingTime, "H h");

  if (currentTime.isBetween(opening, closing)) {
    return "Open";
  } else {
    return "Closed";
  }
};
