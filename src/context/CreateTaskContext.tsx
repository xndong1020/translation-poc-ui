import React, { createContext, memo, useState } from "react";

export interface Assignee {
  email: string;
  language: string;
}
export interface TranslationKey {
  keyName: string;
  keyValue: string;
}
export interface ICreateTaskContextProps {
  taskName: string;
  setTaskName: (taskName: string) => void;
  translationItems: TranslationKey[];
  addTranslationItems: (translationKeys: TranslationKey[]) => void;
  removeTranslationItems: (toBeRemovedIndex: number) => void;
  assignees: Assignee[];
  setAssignees: (assignees: Assignee[]) => void;
}

const initContextValue = {
  taskName: "",
  setTaskName: (taskName: string) => {},
  translationItems: [],
  addTranslationItems: (translationKeys: TranslationKey[]) => {},
  removeTranslationItems: (toBeRemovedIndex: number) => {},
  assignees: [],
  setAssignees: (assignees: Assignee[]) => {},
};

export const CreateTaskContext =
  createContext<ICreateTaskContextProps>(initContextValue);

export const CreateTaskContextProvider = memo(
  ({ children }: { children: any }) => {
    const setTaskName = (taskName: string) => {
      setState((prevState: ICreateTaskContextProps) => ({
        ...prevState,
        taskName,
      }));
    };

    const addTranslationItems = (translationKeys: TranslationKey[]) => {
      setState((prevState: ICreateTaskContextProps) => ({
        ...prevState,
        translationItems: [...prevState.translationItems, ...translationKeys],
      }));
    };

    const removeKey = (
      allKeys: TranslationKey[],
      toBeRemovedIndex: number
    ): TranslationKey[] => {
      allKeys.splice(toBeRemovedIndex, 1);
      return allKeys;
    };

    const removeTranslationItems = (toBeRemovedIndex: number) => {
      setState((prevState: ICreateTaskContextProps) => ({
        ...prevState,
        translationItems: removeKey(
          prevState.translationItems,
          toBeRemovedIndex
        ),
      }));
    };

    const setAssignees = (assignees: Assignee[]) => {
      setState((prevState: ICreateTaskContextProps) => ({
        ...prevState,
        assignees,
      }));
    };

    const [state, setState] = useState({
      taskName: "",
      setTaskName,
      translationItems: [],
      addTranslationItems,
      removeTranslationItems,
      assignees: [],
      setAssignees,
    } as ICreateTaskContextProps);

    return (
      <CreateTaskContext.Provider value={state}>
        {children}
      </CreateTaskContext.Provider>
    );
  }
);
