import React from "react";

// core components
import Wizard from "../../components/Wizard/Wizard";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

import Step1 from "./WizardSteps/Step1";
import Step2 from "./WizardSteps/Step2";
import Step3 from "./WizardSteps/Step3";
import Step4 from "./WizardSteps/Step4";
import { CreateTaskContextProvider } from "../../context/CreateTaskContext";

const WizardView = () => {
  return (
    <CreateTaskContextProvider>
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            steps={[
              {
                stepName: "Create Task",
                stepComponent: Step1,
                stepId: "createTask",
                key: "createTask",
              },
              {
                stepName: "Add Translation Keys",
                stepComponent: Step2,
                stepId: "addTranslationItems",
                key: "addTranslationItems",
              },
              {
                stepName: "Assign Task",
                stepComponent: Step3,
                stepId: "assignTask",
                key: "assignTask",
              },
              {
                stepName: "Confirm",
                stepComponent: Step4,
                stepId: "confirm",
                key: "confirm",
              },
            ]}
            title="Build Your Profile"
            subtitle="This information will let us know more about you."
          />
        </GridItem>
      </GridContainer>
    </CreateTaskContextProvider>
  );
};

export default WizardView;
