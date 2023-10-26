import { useState } from "react";
import { SelectOption } from "./SelectOption";
import { RadioButtons } from "./RadioButtons";
import { TextInput } from "./TextInput";
import { Summary } from "./Summary";
import { ProgressBar } from "./ProgressBar";

// Define the survey component
export const SurveyForm = () => {
  const [surveyData, setSurveyData] = useState({
    name: "",
    roomType: "",
    duration: "",
    treatment: "",
    stars: "",
    comments: "",
  });

  // State to track current page in the survey
  const [currentStep, setCurrentStep] = useState(1);
  const [submit, setSubmit] = useState(false);

  const updateSurveyData = (field, value) => {
    setSurveyData((values) => ({ ...values, [field]: value }));
  };

  const nextStep = () => {
    {
      currentStep < filteredSteps.length && setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    {
      currentStep > 1 && setCurrentStep(currentStep - 1);
    }
  };

  const submitSurvey = () => {
    setSubmit(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // We save all steps in an array as objects
  const steps = [
    {
      label: "Step 1",
      Component: TextInput,
      valueKey: "name",
      question: "What is your name?",
      className: "name",
      display: true
    },
    {
      label: "Step 2",
      Component: SelectOption,
      valueKey: "roomType",
      question: "Which room did you stay in?",
      options: ["<Select type of room>", "Option 1", "Option 2", "Option 3"],
      className: "",
      display: true
    },
    {
      label: "Step 3",
      Component: RadioButtons,
      valueKey: "duration",
      className: "",
      options: ["1-7 days", "8-14 days", "15-19 days", "more than 19 days"],
      question: "How long did you stay at the Balance?",
      display: true
    },
    {
      label: "Step 4",
      Component: SelectOption,
      valueKey: "treatment",
      question: "Did you book any treatments during your stay?",
      className: "",
      options: [
        "<Select a treatment>",
        "I had no treatments",
        "Treatment 1",
        "Treatment 2",
        "Treatment 3",
      ],
      display: true
    },
    {
      label: "Step 5",
      Component: RadioButtons,
      valueKey: "stars",
      question: "How many stars would you give your treatment?",
      className: "",
      options: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
      display: surveyData.treatment != "I had no treatments"
    },
    {
      label: "Step 6",
      Component: TextInput,
      valueKey: "comments",
      question:
        "Please let us know if there is anything else that you want to share with us.",
      className: "",
      display: true
    },
  ];

  const filteredSteps = steps.filter(item => item.display === true)
  console.log("FilteredSteps ", filteredSteps)

  // Our array is indexed from 0 but currentStep starts from 1 so we subtract currentStep with 1 to get the data for the correct step.
  const stepDetails = filteredSteps[currentStep - 1];
  return (
    <>
      {submit ? (
        <Summary surveyData={surveyData} />
      ) : (
        <form className="surveyForm" onSubmit={handleSubmit}>
          <div className="survey-question">
            <stepDetails.Component
              value={surveyData[stepDetails.valueKey]}
              valueKey={stepDetails.valueKey}
              question={stepDetails.question}
              className={stepDetails.className}
              updateSurveyData={updateSurveyData}
              options={stepDetails?.options || []}
            />
          </div>
          <div className="survey-navigation">
            {currentStep > 1 && <button onClick={prevStep}>Back</button>}
            {/* We use the steps.length instead of hard coding a number. This way we can easily add or remove steps */}
            {currentStep < steps.length ? (
              <button onClick={nextStep}>Next</button>
            ) : (
              <button onClick={submitSurvey}>Submit</button>
            )}
          </div>
          <ProgressBar currentStep={currentStep} numberOfQuestions={filteredSteps.length} />
        </form>
      )}
    </>
  );
};
