import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AIChatScreen from "./AIChatScreen";
import TodayDashboardScreen from "./TodayDashboardScreen";
import CommunityFeedScreen from "./CommunityFeedScreen";
import GroupsScreen from "./GroupsScreen";
import ProfileScreen from "./ProfileScreen";
import AdminStack from "./AdminStack";

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111',
          borderTopColor: '#222',
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayDashboardScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📊</Text>
        }}
      />
      <Tab.Screen
        name="Genie"
        component={AIChatScreen}
        options={{
          tabBarLabel: 'Genie',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🤖</Text>
        }}
      />
      <Tab.Screen
        name="Feed"
        component={CommunityFeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📱</Text>
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👥</Text>
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminStack}
        options={{
          tabBarLabel: 'Admin',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🛡️</Text>
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
