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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#05375a",
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
    marginTop:5
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
    flexDirection:'row',
    width:'100%',
    alignItems:'flex-end',
    justifyContent:'space-between',
    textAlign:'center'
  },
  addButton: {
    right: 20, 
    alignItems: 'flex-end'
  },
  dropDownItemStyle: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#05375a",
  },
  dropDownPickerStyle: {
    height: 40,
    color: "#05375a",
    fontSize: 14,
    fontFamily: "Roboto-Regular",

    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text_footer:{

  },
  text_comp:{ 
    marginTop: 30 
  },
  validation_text_msg:{ 
    color: 'red', 
    marginTop: 2, 
    position: "absolute", 
    justifyContent:'flex-end', 
    flexDirection: "row", 
    textAlign:"right"
  },
  submitButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#009387",  
    borderWidth: 1, 
    backgroundColor: "#009387", 
    marginTop: 15,
    margin:12,
    padding:10
  }
});
