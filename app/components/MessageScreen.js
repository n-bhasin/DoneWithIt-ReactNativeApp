import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItem from "./ListItem";
import ListItemDelete from "./ListItemDelete";

const initialMessages = [
  {
    id: 1,
    title: "Red Jacket",
    description: "This is red jacket is really beautiful",
    image: require("../assets/johnWick.png"),
  },
  {
    id: 2,
    title: "Couch",
    description: "What are the dimensions of this couch",
    image: require("../assets/johnWick.png"),
  },
];

function MessageScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    //delete the messages from state
    setMessages(messages.filter((m) => m.id !== message.id));

    //call the server to delete the messages
  };
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={messages}
        keyExtractor={(messages) => messages.id.toString()}
        renderItem={({ item, index, sepaators }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("message", item)}
            renderRightActions={() => (
              <ListItemDelete onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "Second List",
              description: "D2",
              image: require("../assets/johnWick.png"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
export default MessageScreen;
