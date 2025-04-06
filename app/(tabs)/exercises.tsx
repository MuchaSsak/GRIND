import React, { useState } from "react";
import { TextInput, View, FlatList } from "react-native";
import { router } from "expo-router";

import {
  COLORS,
  DEFAULT_EXERCISES_FILTERING_OPTIONS,
  DEFAULT_EXERCISES_SORTING_OPTION,
} from "@/lib/constants";
import { filterExercises, searchExercises, sortExercises } from "@/lib/utils";
import useGetExercises from "@/hooks/exercises/useGetExercises";
import useColorScheme from "@/hooks/useColorScheme";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ExercisesListItem from "@/components/exercises/ExercisesListItem";
import FiltersAndSortings from "@/components/exercises/FiltersAndSortings";
import ErrorInfo from "@/components/ErrorInfo";
import HeaderGradient from "@/components/HeaderGradient";
import GetStartedInfo from "@/components/exercises/GetStartedInfo";

function Exercises() {
  const { colorScheme } = useColorScheme();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_EXERCISES_FILTERING_OPTIONS);
  const [sorting, setSorting] = useState(DEFAULT_EXERCISES_SORTING_OPTION);
  const { data: exercises, isLoading, error } = useGetExercises();

  // Transform exercises according to search query, filters and sorting
  const allExercises = exercises ?? [];
  const searchedExercises = searchExercises(search, allExercises);
  const filteredExercises = filterExercises(filters, searchedExercises);
  const sortedExercises = sortExercises(sorting, filteredExercises);
  const transformedExercises = sortedExercises;

  // Check if user even has any exercises in the first place
  const userHasExercises = !!allExercises.length;

  return (
    <>
      {/* Header gradient */}
      <HeaderGradient text="Exercises" />

      <View className="flex-row gap-2 p-4">
        {/* Search  */}
        <TextInput
          value={search}
          // Disable input if user has no exercises
          editable={userHasExercises}
          style={{
            opacity: userHasExercises ? 1 : 0.5,
          }}
          onChangeText={(newText) => setSearch(newText)}
          placeholder="Search..."
          className="flex-grow pl-4 border rounded-md shadow bg-background text-foreground border-border"
          cursorColor={COLORS[colorScheme].primary}
          selectionColor={COLORS[colorScheme].primary}
          placeholderTextColor={COLORS[colorScheme].mutedForeground}
        />

        {/* Filters & sortings */}
        <FiltersAndSortings
          filters={filters}
          setFilters={setFilters}
          sorting={sorting}
          setSorting={setSorting}
          disabled={!userHasExercises}
        />

        {/* Add new exercise */}
        <Button onPress={() => router.push("/exercises/add")}>
          <Text>Add exercise</Text>
        </Button>
      </View>

      {/* Error info */}
      {error && <ErrorInfo error={error} />}

      {/* Exercises list */}
      {!error && (
        <FlatList
          data={transformedExercises}
          renderItem={({ item }) => (
            <ExercisesListItem exercise={item} key={item.id} />
          )}
          className="p-4"
          contentContainerStyle={{
            gap: 8,
            paddingBottom: 100,
          }}
          scrollEnabled={!!transformedExercises?.length}
          ListEmptyComponent={
            <>
              {isLoading ? (
                <>
                  {/* Loading skeletons (x15 to cover the screen) */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-16" />
                  ))}
                </>
              ) : (
                <>
                  {/* No exercises found info */}
                  {userHasExercises ? (
                    <>
                      <Text className="text-lg text-center text-muted-foreground">
                        Exercises not found!
                      </Text>
                    </>
                  ) : (
                    <GetStartedInfo />
                  )}
                </>
              )}
            </>
          }
        />
      )}
    </>
  );
}

export default Exercises;
