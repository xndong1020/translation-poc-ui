import { client } from "../client";
import {
  LoginUserDocument,
  LoginUserMutation,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  MutationLoginUserArgs,
} from "../graphql/graphqlTypes";

export interface ILoginForm {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: ILoginForm) => {
  return (
    await client.query<LoginUserMutation, MutationLoginUserArgs>({
      query: LoginUserDocument,
      variables: {
        loginUser: {
          email,
          password,
        },
      },
    })
  ).data.loginUser!;
};

export const me = async () => {
  return (
    await client.query<MeQuery, MeQueryVariables>({
      query: MeDocument,
    })
  ).data.me!;
};
