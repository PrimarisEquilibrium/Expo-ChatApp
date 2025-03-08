import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#BB86FC",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: "#E0E0E0",
    marginBottom: 12,
    marginLeft: 4,
    textAlign: "left",
  },
  textInput: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BB86FC",
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#BB86FC",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  text: {
    color: "#BB86FC",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  errorText: {
    color: "#CF6679",
    fontSize: 14,
    marginTop: 6,
  },
});
