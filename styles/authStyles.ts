import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginHorizontal: 24,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#bb86fc",
    textAlign: "center",
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    color: "#e0e0e0",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#bb86fc",
    marginBottom: 12,
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    marginTop: 8,
  },
  errorIcon: {
    marginRight: 8,
    color: "#ff7f50",
  },
  errorText: {
    fontSize: 14,
    color: "#ff7f50",
  },
  button: {
    backgroundColor: "#bb86fc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  link: {
    textAlign: "center",
    fontSize: 18,
    color: "#bb86fc",
  },
  linkText: {
    fontSize: 18,
    color: "#bb86fc",
  },
});
