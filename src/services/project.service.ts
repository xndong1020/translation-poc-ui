import { client } from "../client";
import {
  FindProjectDocument,
  FindProjectQuery,
  FindProjectQueryVariables,
  GetProjectsDocument,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from "../graphql/graphqlTypes";

export const getAllProjects = async () => {
  return (
    await client.query<GetProjectsQuery, GetProjectsQueryVariables>({
      query: GetProjectsDocument,
    })
  ).data.getProjects!;
};

export const findProjectById = async (id: number) => {
  return (
    await client.query<FindProjectQuery, FindProjectQueryVariables>({
      query: FindProjectDocument,
      variables: { id },
    })
  ).data.findProjectById!;
};
