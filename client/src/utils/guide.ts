import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { steps } from "../constants/guideSteps";

const driver = new Driver();

export const showGuide = (isSmall: boolean) => {
  const driverSteps = isSmall ? steps.slice(0, 2) : steps;
  driver.defineSteps(driverSteps);
  try {
    driver.start();
    localStorage.setItem("isOnboardSinsight", "true");
    setInterval(() => {
      localStorage.removeItem("isOnboardSinsight");
    }, 86400000);
  } catch (error) {
    console.log("can't find element for driver", error);
  }
};
