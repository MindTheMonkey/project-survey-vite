export const Summary = ({ surveyData, steps }) => {
  // lets grab the names for the select and radio button values.

  const treatmentOptions = steps.find(step => step.valueKey === 'treatment').options.reduce(
    (acc, option) => (
      {...acc, [option.valueKey]: option.name}
      ), {});
  const durationOptions = steps.find(step => step.valueKey === 'duration').options.reduce(
    (acc, option) => (
      {...acc, [option.valueKey]: option.name}
      ), {});

  const treatment = treatmentOptions[surveyData.treatment];
  let treatmentText = "";
  if (surveyData.treatment === "no") {
    treatmentText = "You did not book any treatments."
    switch(surveyData.noTreatmentReason) {
      case "noTime":
        treatmentText += " Hopefully you will have time to enjoy our services next time."
        break

      case "expensive":
        treatmentText += " We have recorded your input on our treatment prices. Below you will find a 15% promo voucher for your next visit."
        break

      case "missingTreatments":
        treatmentText += " We are sorry we didnt have your favorite treatments this time. Dont forget to subscribe to our newsletter as we are adding new treatments from time to time."
        break
      default:
        break
    }
  } else {
      treatmentText = `You booked a ${treatment} treatment and gave us a
        rating of ${surveyData.stars} stars!`
  }

  return (
    <div className="summary">
      <p>Thank your for your valuable feedback {surveyData.name}!</p>
      <p>Here is a summary about your feedback:</p>
      <p>
        You stayed in our {surveyData.roomType}, for a period of{" "}
        {durationOptions[surveyData.duration]}.{" "}
        {treatmentText}
      </p>
      <p>
        Your feedback will help us to improve our services for you. For your
        next booking, we offer you 15% off! Use the code “BalanceMe”
      </p>
      <p>Hope to welcome you soon again.</p>
    </div>
  );
};
