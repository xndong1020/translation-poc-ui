import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Assignee = {
  __typename?: 'Assignee';
  id: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  assignedLanguage: Scalars['String'];
  task: Task;
};

export type Assignees = {
  language: Scalars['String'];
  email: Scalars['String'];
};

export type CreateNewTaskInput = {
  taskName: Scalars['String'];
  translationItems: Array<TranslationKey>;
  assignees: Array<Assignees>;
};

export type CreateNewTaskResponse = {
  __typename?: 'CreateNewTaskResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateTaskInput = {
  name: Scalars['String'];
};

export type CreateUserDto = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};


export type GetAllTranslationResponse = {
  __typename?: 'GetAllTranslationResponse';
  key: Scalars['String'];
  en: Scalars['String'];
  fr: Scalars['String'];
  zh: Scalars['String'];
  ar: Scalars['String'];
  pt: Scalars['String'];
  es: Scalars['String'];
  ko: Scalars['String'];
};

export type GetTranslationLanguageInput = {
  taskId: Scalars['Int'];
  myTaskLanguage?: Maybe<Scalars['String']>;
};

export type LoginUserDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Scalars['Int']>;
  createNewTask: CreateNewTaskResponse;
  updateTranslationLanguage: UpdateTranslationLanguageResponse;
  createUser: CreateUserResponse;
  loginUser: LoginUserResponse;
};


export type MutationCreateTaskArgs = {
  createTaskDto: CreateTaskInput;
};


export type MutationCreateNewTaskArgs = {
  createNewTaskDto: CreateNewTaskInput;
};


export type MutationUpdateTranslationLanguageArgs = {
  updateTranslationLanguageInput: UpdateTranslationLanguageInput;
};


export type MutationCreateUserArgs = {
  newUser: CreateUserDto;
};


export type MutationLoginUserArgs = {
  loginUser: LoginUserDto;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getProjects?: Maybe<Array<Project>>;
  findProjectById?: Maybe<Project>;
  getAllTranslations?: Maybe<Array<GetAllTranslationResponse>>;
  getTasks?: Maybe<Array<Task>>;
  getMyTaskLanguage?: Maybe<Scalars['String']>;
  getTranslationLanguage?: Maybe<Array<TranslationTaskResponse>>;
  getUsers: Array<User>;
  me: User;
};


export type QueryFindProjectByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetMyTaskLanguageArgs = {
  taskId: Scalars['Float'];
};


export type QueryGetTranslationLanguageArgs = {
  input: GetTranslationLanguageInput;
};

export type Subscription = {
  __typename?: 'Subscription';
  taskCreated?: Maybe<Task>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  savedOn: Scalars['DateTime'];
  isComplete: Scalars['Boolean'];
  translationItems: Array<Translation>;
  assignees: Array<Assignee>;
};

export type Translation = {
  __typename?: 'Translation';
  id: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  keyName: Scalars['String'];
  task: Task;
};

export type TranslationKey = {
  keyName: Scalars['String'];
  keyValue: Scalars['String'];
};

export type TranslationTaskResponse = {
  __typename?: 'TranslationTaskResponse';
  languageId: Scalars['Int'];
  keyName: Scalars['String'];
  assignedLanguageName: Scalars['String'];
  assignedLanguageValue: Scalars['String'];
  en: Scalars['String'];
};

export type UpdateTranslationLanguageInput = {
  id?: Maybe<Scalars['Float']>;
  en?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  zh?: Maybe<Scalars['String']>;
  pt?: Maybe<Scalars['String']>;
  es?: Maybe<Scalars['String']>;
  ar?: Maybe<Scalars['String']>;
  ko?: Maybe<Scalars['String']>;
};

export type UpdateTranslationLanguageResponse = {
  __typename?: 'UpdateTranslationLanguageResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export enum UserRole {
  Owner = 'Owner',
  Admin = 'Admin',
  Translator = 'Translator'
}

export type FindProjectQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type FindProjectQuery = (
  { __typename?: 'Query' }
  & { findProjectById?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  )> }
);

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { getProjects?: Maybe<Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  )>> }
);

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { getTasks?: Maybe<Array<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'savedOn' | 'isComplete'>
  )>> }
);

export type GetMyTaskLanguageQueryVariables = Exact<{
  taskId: Scalars['Float'];
}>;


export type GetMyTaskLanguageQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getMyTaskLanguage'>
);

export type GetTranslationLanguageQueryVariables = Exact<{
  input: GetTranslationLanguageInput;
}>;


export type GetTranslationLanguageQuery = (
  { __typename?: 'Query' }
  & { getTranslationLanguage?: Maybe<Array<(
    { __typename?: 'TranslationTaskResponse' }
    & Pick<TranslationTaskResponse, 'languageId' | 'keyName' | 'en' | 'assignedLanguageName' | 'assignedLanguageValue'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'role'>
  ) }
);

export type CreateTaskMutationVariables = Exact<{
  taskName: CreateTaskInput;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTask'>
);

export type CreateNewTaskMutationVariables = Exact<{
  createNewTaskDto: CreateNewTaskInput;
}>;


export type CreateNewTaskMutation = (
  { __typename?: 'Mutation' }
  & { createNewTask: (
    { __typename?: 'CreateNewTaskResponse' }
    & Pick<CreateNewTaskResponse, 'ok' | 'error'>
  ) }
);

export type LoginUserMutationVariables = Exact<{
  loginUser: LoginUserDto;
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'LoginUserResponse' }
    & Pick<LoginUserResponse, 'error' | 'ok' | 'token'>
  ) }
);

export type UpdateTranslationLanguageMutationVariables = Exact<{
  input: UpdateTranslationLanguageInput;
}>;


export type UpdateTranslationLanguageMutation = (
  { __typename?: 'Mutation' }
  & { updateTranslationLanguage: (
    { __typename?: 'UpdateTranslationLanguageResponse' }
    & Pick<UpdateTranslationLanguageResponse, 'ok' | 'error'>
  ) }
);

export type TaskCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { taskCreated?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name'>
  )> }
);


export const FindProjectDocument = gql`
    query findProject($id: Float!) {
  findProjectById(id: $id) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindProjectQuery__
 *
 * To run a query within a React component, call `useFindProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindProjectQuery(baseOptions: Apollo.QueryHookOptions<FindProjectQuery, FindProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, options);
      }
export function useFindProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectQuery, FindProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, options);
        }
export type FindProjectQueryHookResult = ReturnType<typeof useFindProjectQuery>;
export type FindProjectLazyQueryHookResult = ReturnType<typeof useFindProjectLazyQuery>;
export type FindProjectQueryResult = Apollo.QueryResult<FindProjectQuery, FindProjectQueryVariables>;
export const GetProjectsDocument = gql`
    query getProjects {
  getProjects {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetTasksDocument = gql`
    query getTasks {
  getTasks {
    id
    name
    savedOn
    isComplete
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetMyTaskLanguageDocument = gql`
    query getMyTaskLanguage($taskId: Float!) {
  getMyTaskLanguage(taskId: $taskId)
}
    `;

/**
 * __useGetMyTaskLanguageQuery__
 *
 * To run a query within a React component, call `useGetMyTaskLanguageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTaskLanguageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTaskLanguageQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetMyTaskLanguageQuery(baseOptions: Apollo.QueryHookOptions<GetMyTaskLanguageQuery, GetMyTaskLanguageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTaskLanguageQuery, GetMyTaskLanguageQueryVariables>(GetMyTaskLanguageDocument, options);
      }
export function useGetMyTaskLanguageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTaskLanguageQuery, GetMyTaskLanguageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTaskLanguageQuery, GetMyTaskLanguageQueryVariables>(GetMyTaskLanguageDocument, options);
        }
export type GetMyTaskLanguageQueryHookResult = ReturnType<typeof useGetMyTaskLanguageQuery>;
export type GetMyTaskLanguageLazyQueryHookResult = ReturnType<typeof useGetMyTaskLanguageLazyQuery>;
export type GetMyTaskLanguageQueryResult = Apollo.QueryResult<GetMyTaskLanguageQuery, GetMyTaskLanguageQueryVariables>;
export const GetTranslationLanguageDocument = gql`
    query getTranslationLanguage($input: GetTranslationLanguageInput!) {
  getTranslationLanguage(input: $input) {
    languageId
    keyName
    en
    assignedLanguageName
    assignedLanguageValue
  }
}
    `;

/**
 * __useGetTranslationLanguageQuery__
 *
 * To run a query within a React component, call `useGetTranslationLanguageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTranslationLanguageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTranslationLanguageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTranslationLanguageQuery(baseOptions: Apollo.QueryHookOptions<GetTranslationLanguageQuery, GetTranslationLanguageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTranslationLanguageQuery, GetTranslationLanguageQueryVariables>(GetTranslationLanguageDocument, options);
      }
export function useGetTranslationLanguageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTranslationLanguageQuery, GetTranslationLanguageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTranslationLanguageQuery, GetTranslationLanguageQueryVariables>(GetTranslationLanguageDocument, options);
        }
export type GetTranslationLanguageQueryHookResult = ReturnType<typeof useGetTranslationLanguageQuery>;
export type GetTranslationLanguageLazyQueryHookResult = ReturnType<typeof useGetTranslationLanguageLazyQuery>;
export type GetTranslationLanguageQueryResult = Apollo.QueryResult<GetTranslationLanguageQuery, GetTranslationLanguageQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($taskName: CreateTaskInput!) {
  createTask(createTaskDto: $taskName)
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      taskName: // value for 'taskName'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreateNewTaskDocument = gql`
    mutation createNewTask($createNewTaskDto: CreateNewTaskInput!) {
  createNewTask(createNewTaskDto: $createNewTaskDto) {
    ok
    error
  }
}
    `;
export type CreateNewTaskMutationFn = Apollo.MutationFunction<CreateNewTaskMutation, CreateNewTaskMutationVariables>;

/**
 * __useCreateNewTaskMutation__
 *
 * To run a mutation, you first call `useCreateNewTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewTaskMutation, { data, loading, error }] = useCreateNewTaskMutation({
 *   variables: {
 *      createNewTaskDto: // value for 'createNewTaskDto'
 *   },
 * });
 */
export function useCreateNewTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewTaskMutation, CreateNewTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewTaskMutation, CreateNewTaskMutationVariables>(CreateNewTaskDocument, options);
      }
export type CreateNewTaskMutationHookResult = ReturnType<typeof useCreateNewTaskMutation>;
export type CreateNewTaskMutationResult = Apollo.MutationResult<CreateNewTaskMutation>;
export type CreateNewTaskMutationOptions = Apollo.BaseMutationOptions<CreateNewTaskMutation, CreateNewTaskMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($loginUser: LoginUserDto!) {
  loginUser(loginUser: $loginUser) {
    error
    ok
    token
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      loginUser: // value for 'loginUser'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const UpdateTranslationLanguageDocument = gql`
    mutation updateTranslationLanguage($input: UpdateTranslationLanguageInput!) {
  updateTranslationLanguage(updateTranslationLanguageInput: $input) {
    ok
    error
  }
}
    `;
export type UpdateTranslationLanguageMutationFn = Apollo.MutationFunction<UpdateTranslationLanguageMutation, UpdateTranslationLanguageMutationVariables>;

/**
 * __useUpdateTranslationLanguageMutation__
 *
 * To run a mutation, you first call `useUpdateTranslationLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTranslationLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTranslationLanguageMutation, { data, loading, error }] = useUpdateTranslationLanguageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTranslationLanguageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTranslationLanguageMutation, UpdateTranslationLanguageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTranslationLanguageMutation, UpdateTranslationLanguageMutationVariables>(UpdateTranslationLanguageDocument, options);
      }
export type UpdateTranslationLanguageMutationHookResult = ReturnType<typeof useUpdateTranslationLanguageMutation>;
export type UpdateTranslationLanguageMutationResult = Apollo.MutationResult<UpdateTranslationLanguageMutation>;
export type UpdateTranslationLanguageMutationOptions = Apollo.BaseMutationOptions<UpdateTranslationLanguageMutation, UpdateTranslationLanguageMutationVariables>;
export const TaskCreatedDocument = gql`
    subscription taskCreated {
  taskCreated {
    id
    name
  }
}
    `;

/**
 * __useTaskCreatedSubscription__
 *
 * To run a query within a React component, call `useTaskCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTaskCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TaskCreatedSubscription, TaskCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskCreatedSubscription, TaskCreatedSubscriptionVariables>(TaskCreatedDocument, options);
      }
export type TaskCreatedSubscriptionHookResult = ReturnType<typeof useTaskCreatedSubscription>;
export type TaskCreatedSubscriptionResult = Apollo.SubscriptionResult<TaskCreatedSubscription>;