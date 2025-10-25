import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailVerificationScreen from './EmailVerificationScreen';
import PersonalInfoScreen from './PersonalInfoScreen';
import VerificationStatusScreen from './VerificationStatusScreen';

const Stack = createNativeStackNavigator();

const VerificationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="VerificationStatus" component={VerificationStatusScreen} />
    </Stack.Navigator>
  );
};

export default VerificationNavigator;
