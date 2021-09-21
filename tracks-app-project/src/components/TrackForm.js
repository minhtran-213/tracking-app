import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "./Spacer";
import useSaveTrack from "../hooks/useSaveTrack";
const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  console.log(locations.length);
  const [saveTrack] = useSaveTrack();
  return (
    <>
      <Spacer>
        <Input
          onChangeText={changeName}
          value={name}
          placeholder="Enter name"
        />
        {recording ? (
          <Button title="Stop recording" onPress={stopRecording} />
        ) : (
          <Button title="Record" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? <Button title="Save" onPress={() => saveTrack(name, locations)} /> : null}
      </Spacer>
    </>
  );
};

export default TrackForm;
