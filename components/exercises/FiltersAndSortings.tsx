import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ExercisesFilters, ExercisesSorting } from "@/typings/exercises";
import type { UserThemeColors } from "@/typings/colors";
import {
  COLORS,
  DEFAULT_EXERCISES_FILTERING_OPTIONS,
  DEFAULT_EXERCISES_SORTING_OPTION,
  EXERCISES_SORTING_OPTIONS,
  USER_THEME_COLORS,
} from "@/lib/constants";
import useColorScheme from "@/hooks/useColorScheme";
import { Cross, SlidersHorizontal } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";

type FiltersAndSortingsProps = {
  filters: ExercisesFilters;
  setFilters: React.Dispatch<React.SetStateAction<ExercisesFilters>>;
  sorting: ExercisesSorting;
  setSorting: React.Dispatch<React.SetStateAction<ExercisesSorting>>;
  disabled?: boolean;
};

function FiltersAndSortings({
  filters,
  setFilters,
  sorting,
  setSorting,
  disabled,
}: FiltersAndSortingsProps) {
  // Popover insets
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const { colorScheme } = useColorScheme();
  const [muscleGroupWord, setMuscleGroupWord] = useState("");

  function handleAddMuscleGroup() {
    // Return if this muscle is already in the array or if empty string
    if (filters.muscleGroup.includes(muscleGroupWord) || !muscleGroupWord)
      return;

    // Create a new muscle_group array with all its previous contents and this new muscle string
    setFilters((prev) => ({
      ...prev,
      muscleGroup:
        prev.muscleGroup.length > 0
          ? [...prev.muscleGroup, muscleGroupWord]
          : [muscleGroupWord],
    }));

    // Clear input
    setMuscleGroupWord("");
  }

  function handleRemoveMuscleGroup(muscle: string) {
    setFilters((prev) => ({
      ...prev,
      muscleGroup: prev.muscleGroup.filter((item) => item !== muscle),
    }));
  }

  function handleThemeColors(newColors: UserThemeColors[]) {
    setFilters((prev) => ({
      ...prev,
      themeColors: [...newColors],
    }));
  }

  function handleHasNotes() {
    setFilters((prev) => ({
      ...prev,
      hasNotes: !prev.hasNotes,
    }));
  }

  function handleHasVideoLink() {
    setFilters((prev) => ({
      ...prev,
      hasVideoLink: !prev.hasVideoLink,
    }));
  }

  function handleHasTempo() {
    setFilters((prev) => ({
      ...prev,
      hasTempo: !prev.hasTempo,
    }));
  }

  function handleClearAll() {
    setFilters({ ...DEFAULT_EXERCISES_FILTERING_OPTIONS });
    setSorting(DEFAULT_EXERCISES_SORTING_OPTION);
    setMuscleGroupWord("");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled={disabled} variant="outline" size="icon">
          <SlidersHorizontal className="text-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        sideOffset={8}
        insets={contentInsets}
        className="relative w-80"
      >
        {/* Clear all */}
        <Button
          className="absolute self-end top-3 right-4 z-[60]"
          size="sm"
          variant="destructive"
          onPress={handleClearAll}
        >
          <Text>Clear all</Text>
        </Button>

        {/* Filters */}
        <View className="gap-3">
          <Text className="text-xl font-medium">Filters</Text>

          {/* Muscle group */}
          <View className="flex-row items-center gap-2">
            <Input
              label="Muscle group (submit to add)"
              value={muscleGroupWord}
              onChangeText={(newText) => setMuscleGroupWord(newText)}
              containerStyles={{
                backgroundColor: COLORS[colorScheme].background,
                padding: 8,
                borderRadius: 6,
                borderColor: COLORS[colorScheme].border,
                borderWidth: 1,
                height: 42,
              }}
              maxLength={100}
              submitBehavior="submit"
              onSubmit={handleAddMuscleGroup}
            />
          </View>

          {/* Muscle group delete buttons */}
          {filters.muscleGroup.length ? (
            <View className="flex flex-row flex-wrap gap-3 text-muted-foreground">
              {filters.muscleGroup.map((muscle) => (
                <Button
                  key={muscle}
                  size="sm"
                  variant="secondary"
                  onPress={() => handleRemoveMuscleGroup(muscle)}
                >
                  <Text>{muscle}</Text>
                  <Cross size={16} className="text-foreground" />
                </Button>
              ))}
            </View>
          ) : undefined}

          {/* Theme color */}
          <View>
            <Label>Theme color:</Label>
            <ToggleGroup
              value={filters.themeColors}
              onValueChange={(newColors) =>
                handleThemeColors(newColors as UserThemeColors[])
              }
              className="justify-start"
              type="multiple"
            >
              {USER_THEME_COLORS.map((color) => (
                <ToggleGroupItem
                  key={color}
                  value={color}
                  className="w-9"
                  size="sm"
                >
                  <View
                    style={{
                      backgroundColor: color,
                      borderColor: filters.themeColors.includes(color)
                        ? COLORS[colorScheme].foreground
                        : "transparent",
                    }}
                    className="w-6 h-6 border-2 rounded-md disabled:opacity-100"
                  />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </View>

          {/* Has notes */}
          <View className="flex-row items-center gap-2">
            <Checkbox
              checked={filters.hasNotes}
              onCheckedChange={handleHasNotes}
            />
            <Label onPress={handleHasNotes}>Has notes</Label>
          </View>

          {/* Has video link */}
          <View className="flex-row items-center gap-2">
            <Checkbox
              checked={filters.hasVideoLink}
              onCheckedChange={handleHasVideoLink}
            />
            <Label onPress={handleHasVideoLink}>Has video link</Label>
          </View>

          {/* Has tempo */}
          <View className="flex-row items-center gap-2">
            <Checkbox
              checked={filters.hasTempo}
              onCheckedChange={handleHasTempo}
            />
            <Label onPress={handleHasTempo}>Has tempo</Label>
          </View>
        </View>

        {/* Sorting order */}
        <View className="gap-2 py-4">
          <Text className="text-xl font-medium">Sort by</Text>

          <Select
            value={{
              value: sorting,
              label: sorting,
            }}
            onValueChange={(newOption) =>
              setSorting(newOption?.value as ExercisesSorting)
            }
          >
            <SelectTrigger>
              <SelectValue
                className="text-sm text-foreground native:text-lg"
                placeholder="Sorting order"
              />
            </SelectTrigger>
            <SelectContent
              insets={contentInsets}
              sideOffset={8}
              className="w-72"
            >
              <SelectGroup>
                {EXERCISES_SORTING_OPTIONS.map((option) => (
                  <SelectItem key={option} label={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </PopoverContent>
    </Popover>
  );
}

export default FiltersAndSortings;
