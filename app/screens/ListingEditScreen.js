import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import CategoryPickerItem from "../components/CategoryPickerItem";
import {
  Form,
  FormField,
  FormImagePicker,
  FormPicker,
  SubmitButton,
} from "../components/forms";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import useLocation from "../hooks/useLocation";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    label: "Furniture",
    value: 1,
    backgroundColor: "#fc5c65",
    icon: "lamp-outline",
  },
  {
    label: "Clothing",
    value: 2,
    backgroundColor: "#fd9644",
    icon: "shoe-heel",
  },
  { label: "Technology", value: 3, backgroundColor: "#26de81", icon: "laptop" },
  {
    label: "Books",
    value: 4,
    backgroundColor: "#fed330",
    icon: "book-open-page-variant-outline",
  },
  { label: "Music", value: 5, backgroundColor: "#2bcbba", icon: "headphones" },
  {
    label: "Games",
    value: 6,
    backgroundColor: "#45aaf2",
    icon: "gamepad-variant-outline",
  },
  {
    label: "Cars",
    value: 7,
    backgroundColor: "#4b7bec",
    icon: "car-outline",
  },
  {
    label: "Sports",
    value: 8,
    backgroundColor: "#778ca3",
    icon: "soccer",
  },
  {
    label: "Other",
    value: 9,
    backgroundColor: "#a55eea",
    icon: "application",
  },
];

const ListingEditScreen = () => {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    // Spread the contents of listing parameter and add location (line 68) rather than mutating the original
    const result = await listingsApi.addListing(
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
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          price: null,
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8} // 8 characters which is equivalent to 10000.00 (inc decimal and pence)
          name="price"
          placeholder="Price"
          width={120}
        />
        <FormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
