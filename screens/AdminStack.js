import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from './AdminDashboardScreen';
import SOSScreen from './SOSScreen';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="SOS" component={SOSScreen} />
    </Stack.Navigator>
  );
};

export default AdminStack;
