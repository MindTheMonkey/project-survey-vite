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
      Component: TextInput,
      valueKey: "name",
      question: "What is your name?",
      className: "name",
      display: true,
      answerRequired: true
    },
    {
      Component: SelectOption,
      valueKey: "roomType",
      question: "Which room did you stay in?",
      options: [
        { name: "<Select type of room>", valueKey:""},
        { name: "Suite", valueKey:"suite"},
        { name: "Double room", valueKey:"double"},
        { name: "Single room", valueKey:"single"},
      ],
      className: "dropdown",
      display: true,
      answerRequired: true
    },
    {
      Component: RadioButtons,
      valueKey: "duration",
      className: "radio-buttons",
      options: [
        { name: "1-7 days", valueKey: "short" },
        { name: "8-14 days", valueKey: "medium" },
        { name: "15-19 days", valueKey: "long" },
        { name: "more than 19 days", valueKey: "extended" }
      ],
      question: "How long did you stay at the Balance?",
      display: true,
      answerRequired: true
    },
    {
      Component: SelectOption,
      valueKey: "treatment",
      question: "Did you book any treatments during your stay?",
      className: "dropdown",
      options: [
        { name: "<Select a treatment>" , valueKey: ""},
        { name: "I had no treatments", valueKey: "no"},
        { name: "Massage", valueKey:"massage"},
        { name: "Infra sauna", valueKey:"sauna"},
        { name: "Facial", valueKey:"facial"},
      ],
      display: true,
      answerRequired: true
    },
    {
      Component: RadioButtons,
      valueKey: "professionalism",
      question: "Would you say that you were treated professionally by our SPA-team?",
      className: "radio-buttons",
      options: [
        { name: "Yes", valueKey: "yes"},
        { name: "No", valueKey: "no"}
      ],
      display: !(["no", ""].includes(surveyData.treatment)),
      answerRequired: true
    },
    {
      Component: RadioButtons,
      valueKey: "stars",
      question: "How many stars would you give your treatment?",
      className: "radio-buttons",
      options: [
        { name: "1 star", valueKey: "1"},
        { name: "2 stars", valueKey: "2"},
        { name: "3 stars", valueKey: "3"},
        { name: "4 stars", valueKey: "4"},
        { name: "5 stars", valueKey: "5"},
        ],
      // We define a list of the values that should not render this display. And if our state is set to one of the values we get true. We then return the opposite meaning that we set display to false if the answer is one of our excluded values.
      display: !(["no", ""].includes(surveyData.treatment)),
      answerRequired: true
    },
    {
      Component: SelectOption,
      valueKey: "noTreatmentReason",
      question: "Was there a specific reason for not attending any treatments?",
      className: "dropdown",
      options: [
        { name: "<Select reason>", valueKey: ""},
        { name: "Didn't have time", valueKey: "noTime"},
        { name: "Too expensive", valueKey: "expensive"},
        { name: "Didn't have the treatments that I like", valueKey: "missingTreatments"},
        { name: "Other", valueKey: "other"}
      ],
      display: (["no", ""].includes(surveyData.treatment)),
      answerRequired: true
    },
    {
      Component: TextInput,
      valueKey: "comments",
      question:
        "Please let us know if there is anything else that you want to share with us.",
      className: "textarea",
      display: true,
      answerRequired: false
    },
  ];

  const filteredSteps = steps.filter(item => item.display === true)
  const checkAllRequired = filteredSteps.reduce((passed, item) => {
    return passed && !(item.answerRequired && !surveyData[item.valueKey]);
  }, true);

  // Our array is indexed from 0 but currentStep starts from 1 so we subtract currentStep with 1 to get the data for the correct step.
  const stepDetails = filteredSteps[currentStep - 1];
  return (
    <>
      {submit ? (
        <Summary surveyData={surveyData} steps={steps} />
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
            {currentStep > 1 && (
              <button onClick={prevStep} className="button-survey">
                Back
              </button>
            )}
            {/* We use the steps.length instead of hard coding a number. This way we can easily add or remove steps */}
            { currentStep < filteredSteps.length ? (
              <button onClick={nextStep} className="button-survey" disabled={ stepDetails.answerRequired && surveyData[stepDetails.valueKey] == ""}>
                Continue
              </button>
            ) : (
              <button onClick={submitSurvey} className="submit" disabled={!checkAllRequired}>
                Submit
              </button>
            )}
          </div>
          <ProgressBar
            currentStep={currentStep}
            numberOfQuestions={filteredSteps.length}
          />
        </form>
      )}
    </>
  );
};
