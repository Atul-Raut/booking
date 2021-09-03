import React from "react";
import { View , Text} from "react-native";
import AppBaseComponent from "./AppBaseComponent";


export default class Settings extends AppBaseComponent {
  constructor(props){
      super(props);
}
render() {
  return (
    <View>
        <Text>Settings</Text>
    </View>
  );
}
}
