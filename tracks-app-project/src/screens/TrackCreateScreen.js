import React, { useContext, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/Map";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import useLocation from "../hooks/useLocation";
import '../_mockLocation';
import {withNavigationFocus} from 'react-navigation';
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from '@expo/vector-icons';
const TrackCreateScreen = ({isFocused}) => {
  const {state : {recording}, addLocation} = useContext(LocationContext);
  const callBack = useCallback((locations) => addLocation(locations, recording), [recording])
  const [err] = useLocation(isFocused || recording, callBack);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create track</Text>
      <Map />
      {err ? <Text>Please accept the permission to use this app.</Text> : null}
      <Spacer>
        <TrackForm />
      </Spacer>
    </SafeAreaView>
  );
};
TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={24} color="black" />
}
export default withNavigationFocus(TrackCreateScreen);

const styles = StyleSheet.create({});
