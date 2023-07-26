import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import OTPTextView from '~react-native-otp-textinput';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '60%',
    gap: 20,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

const App: React.FC = () => {
  const [otpInput, setOtpInput] = useState<string>('');

  const input = useRef<OTPTextView>(null);

  const clear = () => input.current?.clear();

  const updateOtpText = () => input.current?.setValue(otpInput);

  const showTextAlert = () => otpInput && Alert.alert(otpInput);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <OTPTextView
          ref={input}
          containerStyle={styles.textInputContainer}
          handleTextChange={setOtpInput}
          inputCount={4}
          keyboardType="numeric"
        />
        <TextInput
          maxLength={4}
          onChangeText={setOtpInput}
          style={styles.textInput}
        />
        <View style={styles.buttonWrapper}>
          <Button title="Clear" onPress={clear} />
          <Button title="Update" onPress={updateOtpText} />
          <Button title="Submit" onPress={showTextAlert} />
        </View>
        <Text style={styles.instructions}>Customizations</Text>
        <OTPTextView
          handleTextChange={() => {}}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={5}
          inputCellLength={2}
        />
        <OTPTextView
          handleTextChange={() => {}}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          defaultValue="1234"
        />
        <OTPTextView
          handleTextChange={() => {}}
          containerStyle={styles.textInputContainer}
          // textInputStyle={[styles.roundedTextInput, { borderRadius: 100 }]}
          tintColor="#000"
        />
        <TextInput />
        <OTPTextView
          handleTextChange={() => {}}
          containerStyle={styles.textInputContainer}
          tintColor={['#FF0000', '#FFFF00', '#00FF00', '#0000FF']}
        />
        <OTPTextView
          handleTextChange={() => {}}
          containerStyle={styles.textInputContainer}
          tintColor="#000"
          offTintColor={['#FF0000', '#FFFF00', '#00FF00', '#0000FF']}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
