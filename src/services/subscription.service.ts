import { client } from "../client";
import {
  MessageFeedDocument,
  MessageFeedSubscription,
  MessageFeedSubscriptionVariables,
} from "../graphql/graphqlTypes";

export const subscriptionToMessageFeed = async () => {
  return (
    await client.query<
      MessageFeedSubscription,
      MessageFeedSubscriptionVariables
    >({
      query: MessageFeedDocument,
    })
  ).data.messageFeed!;
};
