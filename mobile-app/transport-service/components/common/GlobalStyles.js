import { StyleSheet, Platform, Dimensions} from "react-native";

const { height } = Dimensions.get("screen");
const height_logo = height * 0.09;

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleText: {
    fontSize: 18,
    color: "#333",
  },
  textPage:{
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  cartHeader:{
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    letterSpacing: 1,
    paddingLeft:5,
    marginTop:5
  },
  cartContent:{
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
    letterSpacing: 1,
    paddingLeft:5,
    marginTop:5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#05375a",
  },
  inputTextArea: {
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
    color: "#05375a",
  },
  dropDownPickerStyle: {
    height: 40,
    color: "#05375a",
    fontSize: 14,
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
  },
  icon: {
    position: "absolute",
    left: 16,
  },
  iconStart: {
    left: 16
  },
  iconEnd: {
    left: 16,
    alignItems:'flex-end'
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#009387",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
    textAlign: "center",
    width: "100%",
  },
  serviceNameText: {
    right: 5,
    position: "absolute",
    justifyContent: "flex-end",
    flexDirection: "row",
    textAlign: "right",
    marginTop:30,
  },
  serviceNameText2: {
    fontSize: 10,
    color: "#333",
    letterSpacing: 1,
    letterSpacing:0,
  },
  cardMyRequest: {
    borderRadius: 6,
    elevation: 2,
    backgroundColor: "#C5CBE3",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 5,
    marginVertical: 5,
    height:200
  },
  cardProfile: {
    borderRadius: 0,
    elevation: 0,
    backgroundColor: "#C5CBE3",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 2,
    marginVertical: 2
  },
  cardConsent: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderColor: "black",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  profileInput: {
    height: 30,
    margin: 1,
    borderWidth: 0.5,
    padding: 5,
    color: "#05375a",
    width:200,
    marginLeft:30
  },
});
