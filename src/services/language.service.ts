import { client } from "../client";
import {
  GetMyTaskLanguageDocument,
  GetMyTaskLanguageQuery,
  GetMyTaskLanguageQueryVariables,
  UpdateTranslationLanguageDocument,
  UpdateTranslationLanguageInput,
  UpdateTranslationLanguageMutation,
  UpdateTranslationLanguageMutationVariables,
} from "../graphql/graphqlTypes";

export const updateTranslationLanguage = async (
  input: UpdateTranslationLanguageInput
) => {
  console.log("input", input);
  return (
    await client.query<
      UpdateTranslationLanguageMutation,
      UpdateTranslationLanguageMutationVariables
    >({
      query: UpdateTranslationLanguageDocument,
      variables: {
        input,
      },
    })
  ).data.updateTranslationLanguage!;
};

export const getMyTaskLanguage = async (taskId: number) => {
  return (
    await client.query<GetMyTaskLanguageQuery, GetMyTaskLanguageQueryVariables>(
      {
        query: GetMyTaskLanguageDocument,
        variables: { taskId },
      }
    )
  ).data.getMyTaskLanguage!;
};
