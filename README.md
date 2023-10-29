<h1 align="center">
  <a href="">
    <img src="/src/assets/survey.svg" alt="Project Banner Image">
  </a>
</h1>

# Survey Project

This is our Hotel survey app which is a project created for Week 5 for the Technigo JS & React fall 2023 course.

## Getting Started with the Project

### Dependency Installation & Startup Development Server

Once cloned, navigate to the project's root directory and this project uses npm (Node Package Manager) to manage its dependencies.

The command below is a combination of installing dependencies, opening up the project on VS Code and it will run a development server on your terminal.

```bash
npm i && code . && npm run dev
```

### The Problem

Our main focus of the project was to make components reusable and allow the survey to scale up or down quickly by adding or removing questions.

We used a couple of technics to achieve this.
* Creating an object that contained as much info as possible about each step in the survey.
* Creating compontents for different type of form input types. In our case Select dropdowns, radiobuttons and Textinput.
* Assigning compontent type directly to each question in the steps object. Allowing us to loop through the object and call the correct compontent.
* Using one state variable for the complete surveyData
* Creating a display property for each question where you could set display requirements.
* Filtering the steps object based on the display property to get a object that contains all the visible questions and their properties.
* Adapted Navigation - Allowing for navigation back and forth between questions while correctly adjusting for any dynamic questions being shown/hidden based on answers.
* Creating a dynamic progressbar that dynamically calculates the length of the survey and the user's current progress.
* RequiredAnswer property that when set requires the question to have an answer. This is done by using reduce combined with chaining and reversing multiple statements.

#### Example technics:
##### requiredAnswer
```  const checkAllRequired = filteredSteps.reduce((passed, item) => {
    return passed && !(item.answerRequired && !surveyData[item.valueKey]);
  }, true);
```
We use the reduce function and initalize it as a boolean with the value true. For each iteration we check if answerRequired is set to true and if the value is not empty. If either answerRequired is false or the value is not empty we get "false" which we reverse and combine with passed. This becomes true && true which equals true. As a result checkAllRequried will be true as long as it doesnt run into any false values at any point. And the only thing that can return false is a step that has answerRequired set to true but value set to empty.

So long story short. As long as checkAllRequired returns true we know that required questions has a answer different from empty.

### View it live

https://enchanting-sunburst-16b6a5.netlify.app/

## Instructions

<a href="instructions.md">
   See instructions of this project
  </a>

#### Team
Petra
Mike
Demetria