import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Block , Text } from "galio-framework";
import { icpaTheme } from "../../constants";

export default function UploadStatus({ status, onChange, label }) {
  return (
    <Block style={styles.uploadContainer}>
      <Text style={{marginBottom:5}}>{label}</Text>

      {status === 1 && (
        <TouchableOpacity primary onPress={onChange}>
          <Text bold  color={icpaTheme.COLORS.PRIMARY}>Upload</Text>
        </TouchableOpacity>
      )}
      {status === 2 && (
        <ActivityIndicator small/>
      )}
      {status === 3 && <Text color={icpaTheme.COLORS.ERROR}>Error</Text>}
      {status === 4 && <Text color={icpaTheme.COLORS.SUCCESS}>Uploaded</Text>}
    </Block>
  );
}
const styles = StyleSheet.create({
  uploadContainer: {
    marginTop: 10,
    backgroundColor:'#fff',
    padding:10
  },
});
