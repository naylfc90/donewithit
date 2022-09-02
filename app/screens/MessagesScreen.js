import React, { useState } from "react";
import { FlatList } from "react-native";

import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import Screen from "../components/Screen";

const initialMessages = [
  {
    id: 1,
    title: "John Smith",
    description: "Hi, do you deliver to the United States?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Steven Jones",
    description: "Hi, is the couch still available?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 3,
    title: "Paul Evans",
    description: "Would you be willing to negotiate price?",
    image: require("../assets/mosh.jpg"),
  },
];

const MessagesScreen = (props) => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 1,
              title: "John Smith",
              description: "Hi, do you deliver to the United States?",
              image: require("../assets/mosh.jpg"),
            },
            {
              id: 2,
              title: "Steven Jones",
              description: "Hi, is the couch still available?",
              image: require("../assets/mosh.jpg"),
            },
            {
              id: 3,
              title: "Paul Evans",
              description: "Would you be willing to negotiate price?",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
};

export default MessagesScreen;
