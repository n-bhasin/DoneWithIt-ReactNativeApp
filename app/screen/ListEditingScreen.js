import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as yup from "yup";

import {
  AppForm,
  AppFormInput,
  SubmitButton,
  AppFormPicker,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validation = yup.object().shape({
  title: yup.string().required().min(1).label("Title"),
  price: yup.number().required().min(1).max(10000).label("Price"),
  category: yup.string().required().nullable().label("Category"),
  description: yup.string().label("Description"),
  image: yup.string().min(1, "Please select at least one image."),
});

const categories = [
  { label: "Furniture", id: 1, backgroundColor: "#fc5c65", icon: "floor-lamp" },
  { label: "Cars", id: 2, backgroundColor: "#fd9644", icon: "car" },
  { label: "Camera", id: 3, backgroundColor: "#fed330", icon: "camera" },
  { label: "Clothing", id: 4, backgroundColor: "#2bcbba", icon: "shoe-heel" },
  { label: "Sports", id: 5, backgroundColor: "#45aaf2", icon: "basketball" },
  {
    label: "Music & Movies",
    id: 6,
    backgroundColor: "#4b7bec",
    icon: "headphones",
  },
  { label: "Games", id: 7, backgroundColor: "#26de81", icon: "cards" },
  { label: "Books", id: 8, backgroundColor: "#000", icon: "library-books" },
  {
    label: "other",
    id: 9,
    backgroundColor: "#45aaf2",
    icon: "dots-horizontal",
  },
];

function ListEditingScreen(props) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListings(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing.");
    }
    resetForm();
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          category: null,
          description: "",
          image: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        <AppFormImagePicker name="image" />
        <AppFormInput
          maxLenght={255}
          name="title"
          errorName="Title"
          placeholder="Title"
        />

        <AppFormInput
          name="price"
          errorName="Price"
          placeholder="Price"
          keyBoardType="numeric"
          width={120}
          maxLength={8}
        />

        <AppFormPicker
          items={categories}
          name="category"
          errorName="Category"
          width="50%"
          numberOfColumns={3}
          placeholder="Category"
          PickerItemComponent={CategoryPickerItem}
        />
        <AppFormInput
          name="description"
          errorName="Description"
          placeholder="Description"
          maxLength={255}
          multiline
          numberOfLines={3}
        />

        <SubmitButton title="SUBMIT" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 10 },
});
export default ListEditingScreen;
