import React from "react";
import {
  View,Text,
  TouchableOpacity, TextInput,Platform,CheckBox,ScrollView,StatusBar, Switch
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {translateMsg} from '../common/Translation'
import {globalStyles} from '../common/GlobalStyles'

const FreeTrialPolicyScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.signupContainer}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={globalStyles.header}>
        <Text style={globalStyles.text_header}>Free Trial Policy</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={globalStyles.footer}>
        <ScrollView>
          <View style={{flexDirection:'row'}}>
              <Text>Free Trial Policy</Text>
            </View>
           
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
export default FreeTrialPolicyScreen;
