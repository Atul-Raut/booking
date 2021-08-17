import { StyleSheet, Platform} from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 18,
    color: "#333",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : 5,
    paddingLeft: 10,
    color: "#05375a",
    borderBottomWidth: 1,
    height:50
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#FFF',
  },
  editbutton: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#FFBF00",
    height: 34,
    borderRadius: 5,
    width: 70,
    textAlign: "center",
    padding: 6,
  },
  deletebutton: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#FF7F50",
    height: 34,
    borderRadius: 5,
    width: 70,
    textAlign: "center",
    padding: 6,
  },
  buttenContainer: {
    flex:1,
  },
  addButton: {
    right: 20, 
    alignItems: 'flex-end'
  }
});
