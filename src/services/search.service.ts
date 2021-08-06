import { client } from "../client";
import {
  SearchDocument,
  SearchQuery,
  SearchQueryVariables,
} from "../graphql/graphqlTypes";

export const searchByText = async (queryText: string) => {
  return (
    await client.query<SearchQuery, SearchQueryVariables>({
      query: SearchDocument,
      variables: { queryText },
    })
  ).data.search!;
};
