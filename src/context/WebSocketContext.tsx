import { gql } from "@apollo/client";
import {
  OnSubscriptionDataOptions,
  useSubscription,
} from "@apollo/react-common";
import React, { createContext, memo, useState, useCallback } from "react";
import { wsClient } from "../wsClient";

export const WebSocketContext = createContext({} as IWebSocketContext);

export type IWebSocketMessage = {
  payload: any;
};

export interface IWebSocketContext {
  currentMessage?: IWebSocketMessage;
}

export const messageFeedDocument = gql`
  subscription messageFeed {
    messageFeed {
      functionName
      payload
    }
  }
`;

export const WebSocketContextProvider = memo(
  ({ children }: { children: any }) => {
    const onSubscriptionData = useCallback(
      ({ subscriptionData: { data } }: OnSubscriptionDataOptions) => {
        const currentMessage = data.messageFeed;
        console.log(`currentMessage`, currentMessage);
        setState((prevState: IWebSocketContext) => {
          return {
            ...prevState,
            currentMessage,
          };
        });
      },
      []
    );

    const [state, setState] = useState({});

    useSubscription(messageFeedDocument, {
      onSubscriptionData,
      client: wsClient,
    });

    return (
      <WebSocketContext.Provider value={state}>
        {children}
      </WebSocketContext.Provider>
    );
  }
);
