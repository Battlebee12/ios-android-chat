import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { db, collection, getDocs } from "../firebase-utilities";

const ChatListScreen = ({ navigation }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const conversations = [];
      querySnapshot.forEach((doc) => {
        conversations.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id);
      });
      setChatList(conversations);
    };
    fetchConversations();
  }, []);

  const renderItem = ({ item }) => {
    const { id, name, chatName, lastMessage } = item;

    return (
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() => navigation.navigate("choice", { id, chatName })}
      >
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.chatAvatar}
        />
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>{name}</Text>
          <Text style={styles.chatLastMessage}>{lastMessage}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Users </Text>
      </View>
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Dark background
    paddingTop: "10%",
  },
  header: {
    height: 60,
    backgroundColor: "#333333", // Dark header
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff", // Light text color
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444444", // Darker border
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", // Light text color
  },
  chatLastMessage: {
    fontSize: 14,
    color: "#aaaaaa", // Lighter text color
  },
});

export default ChatListScreen;
