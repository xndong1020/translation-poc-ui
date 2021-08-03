import { client } from "../client";
import {
  CreateNewTaskDocument,
  CreateNewTaskInput,
  CreateNewTaskMutation,
  CreateNewTaskMutationVariables,
  CreateTaskDocument,
  CreateTaskMutation,
  CreateTaskMutationVariables,
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
  GetTranslationLanguageDocument,
  GetTranslationLanguageInput,
  GetTranslationLanguageQuery,
  GetTranslationLanguageQueryVariables,
} from "../graphql/graphqlTypes";

export const getAllTasks = async () => {
  return (
    await client.query<GetTasksQuery, GetTasksQueryVariables>({
      query: GetTasksDocument,
    })
  ).data.getTasks!;
};

export const getMyTask = async (input: GetTranslationLanguageInput) => {
  return (
    await client.query<
      GetTranslationLanguageQuery,
      GetTranslationLanguageQueryVariables
    >({
      query: GetTranslationLanguageDocument,
      variables: {
        input,
      },
    })
  ).data.getTranslationLanguage!;
};

export const createTask = async (taskName: string) => {
  return (
    await client.query<CreateTaskMutation, CreateTaskMutationVariables>({
      query: CreateTaskDocument,
      variables: {
        taskName: {
          name: taskName,
        },
      },
    })
  ).data.createTask!;
};

export const createNewTask = async ({
  taskName,
  translationItems,
  assignees,
}: CreateNewTaskInput) => {
  return (
    await client.query<CreateNewTaskMutation, CreateNewTaskMutationVariables>({
      query: CreateNewTaskDocument,
      variables: {
        createNewTaskDto: {
          taskName,
          translationItems,
          assignees,
        },
      },
    })
  ).data.createNewTask!;
};
