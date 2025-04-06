import React from "react";
import { Tabs } from "expo-router";

import "@/app/global.css";
import { COLORS, HIDDEN_TABS_ROUTES } from "@/lib/constants";
import useColorScheme from "@/hooks/useColorScheme";
import {
  BicepsFlexed,
  FaDumbbell,
  NotepadText,
  CircleUser,
} from "@/components/icons";

function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const defaultIconColor =
    colorScheme === "light" ? COLORS.light.foreground : COLORS.light.background;
  const focusedIconColor = COLORS.orange[500];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange[500],
      }}
    >
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            // Different pattern because this icon is not from `lucide-react-native`
            <FaDumbbell isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          title: "Programs",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NotepadText
              stroke={focused ? focusedIconColor : defaultIconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <BicepsFlexed
              stroke={focused ? focusedIconColor : defaultIconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CircleUser
              stroke={focused ? focusedIconColor : defaultIconColor}
            />
          ),
        }}
      />

      {/* Hidden routes */}
      {HIDDEN_TABS_ROUTES.map((route) => (
        <Tabs.Screen
          key={route}
          name={route}
          options={{ href: null, headerShown: false }}
        />
      ))}
    </Tabs>
  );
}

export default TabsLayout;
