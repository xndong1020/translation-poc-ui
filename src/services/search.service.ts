import { client } from '../client';
import {
  SearchDocument,
  SearchQuery,
  SearchQueryVariables,
  TranslationSearchInput,
} from '../graphql/graphqlTypes';

export const searchByText = async (
  translationSearchInput: TranslationSearchInput,
) => {
  return (
    await client.query<SearchQuery, SearchQueryVariables>({
      query: SearchDocument,
      variables: {
        translationSearchInput,
      },
    })
  ).data.search!;
};
