import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import AppBaseComponent, {
  resetReloadData,
  reloadDataFlag,
} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import { FlatGrid } from "react-native-super-grid";
import { translateMsg } from "../common/Translation";
import AwesomeAlert from "react-native-awesome-alerts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../common/GlobalStyles";
import * as Animatable from "react-native-animatable";
import { SpeedDial } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import MapViewDirections from "./MapViewDirection";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyDK2_2dft6wq8ApWSvMk0fOk4S0dZ8pans";

export default class MyVehicleScreen extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showDeleteConfirmation: false,
      deleteSuccess: false,
      selectedItem: null,
      deleteFailed: false,
    };
    this.state = {
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
    };
  }

  componentDidMount() {
    // this.makeRemoteRequest();
    // this.props.navigation.addListener("focus", this.handleFocus);
  }
  handleFocus = () => {
    if (reloadDataFlag() && this) {
      this.makeRemoteRequest();
      resetReloadData();
    }
  };

  onMapPress = (e) => {
    if (this.state.coordinates.length == 2) {
      this.setState({
        coordinates: [e.nativeEvent.coordinate],
      });
    } else {
      this.setState({
        coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
      });
    }
  };

  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20,
      },
    });
  };

  onError = (errorMessage) => {
    Alert.alert(errorMessage);
  };

  makeRemoteRequest = async () => {
    //TODO remove userID and account type from body
    let param = {
      serviceId: "WS-VS-03",
      body: {},
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      if (response.result.length > 0) {
        this.setState({
          data: response.result,
        });
      } else {
        this.setState({
          data: [],
        });
      }
    } else {
      this.setState({
        data: [],
      });
    }
    this.setState({
      showDeleteConfirmation: false,
      deleteSuccess: false,
      selectedItem: null,
      deleteFailed: false,
    });
  };

  addVehicle = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "AddVehicleScreen" }],
    });
  };

  updateVehicle = (item) => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "AddVehicleScreen", item: item.item }],
    });
  };

  handleDelete = (item) => {
    this.setState({
      selectedItem: item,
      showDeleteConfirmation: true,
    });
  };

  cancleDelete = () => {
    this.setState({
      selectedItem: null,
      showDeleteConfirmation: false,
    });
  };

  deleteVehicle = async () => {
    this.setState({
      showDeleteConfirmation: false,
    });
    let item = this.state.selectedItem.item;
    let param = {
      serviceId: "WS-VS-04",
      body: item,
    };

    let response = await callApi(param);
    if (response && response.retCode == this.SUCCESS_RET_CODE) {
      this.setState({
        deleteSuccess: true,
      });
    } else {
      this.setState({
        deleteFailed: true,
      });
    }
    this.setState({
      selectedItem: null,
    });
  };

  render() {
    const { deleteSuccess, showDeleteConfirmation, deleteFailed } = this.state;
    return (
      //   <View>

      <>
        <View style={styles.containerS}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en", // language of the results
            }}
            onPress={(data, details = null) => console.log(data)}
            onFail={(error) => console.error(error)}
            requestUrl={{
              url:
                "https://maps.googleapis.com/maps/api/place/autocomplete/json?data=${data}",
              // useOnPlatform: "web",
            }} // this in only required for use on the web. See https://git.io/JflFv more for details.
          />
        </View>
        <View style={styles.container}>
          {/* <Text>Maps</Text> */}

          <MapView
            style={styles.map}
            //   initialRegion={{
            //     latitude: 37.78825,
            //     longitude: -122.4324,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            //   }}
            onPress={this.onMapPress}
            showsMyLocationButton={true}
            rotateEnabled={false}
            // showsTraffic={true}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            {this.state.coordinates.map(
              (coordinate, index) => (
                <MapView.Marker
                  key={`coordinate_${index}`}
                  coordinate={coordinate}
                />
              ) // eslint-disable-line react/no-array-index-key
            )}
            {this.state.coordinates.length === 2 && (
              <MapViewDirections
                origin={this.state.coordinates[0]}
                destination={this.state.coordinates[1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                onReady={this.onReady}
                onError={this.onError}
              />
            )}
          </MapView>
          <View style={styles.whereContainer}>
            <View>
              {/* <Text>
              <MaterialIcons
                key={"MyLocation"}
                name="my-location"
                size={20}
                color={"black"}
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  zIndex: 5,
                }}
              />
            </Text> */}
              {/* <TextInput
                maxLength={250}
                placeholder="Pickup Point"
                //value={bidValue}
                style={{
                  height: 40,
                  width: 300,
                  // margin: 12,
                  borderWidth: 1,
                  borderRadius: 5,
                  //padding: 10,
                  textAlign: "center",
                  color: "#05375a",
                  fontSize: 18.5,
                  fontWeight: "bold",
                  marginBottom: 5,
                  borderColor: "gray",
                  zIndex: 5,
                }}
              /> */}
            </View>
            <View>
              {/* <TextInput
                maxLength={250}
                placeholder="Drop Point"
                //value={bidValue}
                style={{
                  height: 40,
                  width: 300,
                  // margin: 12,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 5,
                  //padding: 10,
                  textAlign: "center",
                  color: "#05375a",
                  fontSize: 18.5,
                  fontWeight: "bold",
                  zIndex: 5,
                }}
              /> */}
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerS: {
    // flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
    zIndex: 5,
  },
  map: {
    flex: 1,
  },
  whereContainer: {
    margin: "2%",
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: 5,
    borderRadius: 5,
    zIndex: 5,
  },
});
