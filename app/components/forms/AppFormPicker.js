import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  items,
  name,
  errorName,
  PickerItemComponent,
  placeholder,
  width,
  numberOfColumns,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        width={width}
        PickerItemComponent={PickerItemComponent}
        selectedItem={values[name]}
        onSelectedItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        numberOfColumns={numberOfColumns}
      />
      <ErrorMessage errors={errors[errorName]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  screen: { padding: 10 },
});
export default AppFormPicker;
