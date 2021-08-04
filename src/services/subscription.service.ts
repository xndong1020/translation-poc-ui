import { client } from "../client";
import {
  TaskCreatedDocument,
  TaskCreatedSubscription,
  TaskCreatedSubscriptionVariables,
} from "../graphql/graphqlTypes";

export const subscriptionToTaskCreated = async () => {
  return (
    await client.query<
      TaskCreatedSubscription,
      TaskCreatedSubscriptionVariables
    >({
      query: TaskCreatedDocument,
    })
  ).data.taskCreated!;
};
