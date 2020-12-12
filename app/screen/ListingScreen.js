import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import ListItemSeparator from "../components/ListItemSeparator";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";

function ListingScreen({ navigation }) {
  const getListingApi = useApi(listingsApi.getListings);
  useEffect(() => {
    getListingApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingApi.loading} />
      <Screen style={styles.screen}>
        {getListingApi.error && (
          <>
            <AppText>Can't retrieve the listings</AppText>
            <AppButton title="Retry" onPress={getListingApi.request} />
          </>
        )}
        <FlatList
          data={getListingApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        ></FlatList>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 20, backgroundColor: colors.lightGrey },
});
export default ListingScreen;
