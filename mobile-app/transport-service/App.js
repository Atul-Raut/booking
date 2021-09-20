import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import DrawerNavigator from "./components/common/navigator/DrawerNavigator";
import { ExternalStackNavigator } from "./components/common/navigator/ExternalStackNavigator";
import { AuthContext } from './components/common/AppContext';
import {setDataintoLocalStorage, setReloadData, 
  setSelectedService, setSignedIn} from "./components/common/AppBaseComponent"

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const onSelectedService = () => {
    let selectedServiceId = "1";
    let selectedServiceName = "Transport Service";
    setSelectedService(selectedServiceId, selectedServiceName);
    return {selectedServiceId, selectedServiceName};
  }

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
         userToken = await SecureStore.getItemAsync('userToken');
         if(null == userToken || userToken == ""){
          dispatch({ type: 'SIGN_OUT'});
         }else{
            let data = JSON.parse(userToken);
            setDataintoLocalStorage("userInfo", data.userInfo);
            setDataintoLocalStorage("LOGIN-accounts", data.accounts);
            setReloadData();
            onSelectedService();
            setSignedIn();

          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
         }
      } catch (e) {
        // Restoring token failed
        dispatch({ type: 'SIGN_OUT'});
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // navigate to Home page
        try{
          await SecureStore.setItemAsync('userToken', JSON.stringify(data));
        }catch(e){
          console.log(e)
        }
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: async () => {
        //Navigate to landing page
        try{
          await SecureStore.setItemAsync('userToken', "null");
        }catch(e){
          console.log(e)
        }
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          {state.userToken == null ? (
            // user isn't signed in
           <ExternalStackNavigator/>
          ) : (
            // User is signed in
            <DrawerNavigator/> 
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
