import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  console.log(listing);
  return (
    <View>
      <Image
        style={styles.image}
        tint="light"
        preview={{ uri: listing.images[0].thumbnailUrl }}
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title} numberOfLines={1}>
          {listing.title}
        </AppText>
        <AppText style={styles.subTitle}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/johnWick.png")}
            title="John Wick"
            subTitle="5 Listings"
            chevron="chevron-right"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 22,
  },
  userContainer: {
    marginVertical: 40,
  },
});
export default ListingDetailsScreen;
