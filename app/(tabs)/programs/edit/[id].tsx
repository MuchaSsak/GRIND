import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { COLORS, USER_THEME_COLORS } from "@/lib/constants";
import { queryClient } from "@/services/tanstack";
import useGetPrograms from "@/hooks/programs/useGetPrograms";
import useEditProgram from "@/hooks/programs/useEditProgram";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorInfo from "@/components/ErrorInfo";
import HeaderGradient from "@/components/HeaderGradient";
import ProgramsListItem from "@/components/programs/ProgramsListItem";

function EditProgram() {
  const { id } = useLocalSearchParams();
  // Calling the get all programs function because the results are already cached thanks to Tanstack Query.
  // This should eliminate loading time and be a better solution than making an another fetch request. I still account for fetching from Supabase though (just in case).
  const {
    data: programs,
    isLoading: isLoadingGetPrograms,
    isRefetching: isRefetchingGetPrograms,
    error: errorGetPrograms,
  } = useGetPrograms();
  const [program, setProgram] = useState(() =>
    programs?.find((program) => program.id === id)
  );

  // Edit program mutation
  const { mutate, isPending: isPendingEditProgram } = useEditProgram();

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["getPrograms"] });
  }, [id]);

  useEffect(() => {
    setProgram(programs?.find((program) => program.id === id));
  }, [programs, setProgram, id]);

  if (isLoadingGetPrograms || isRefetchingGetPrograms)
    return (
      <View className="justify-center flex-1">
        <ActivityIndicator className="text-foreground" size={96} />
      </View>
    );

  if (errorGetPrograms || !program)
    return (
      <ErrorInfo
        className="justify-center flex-1"
        error={errorGetPrograms}
        goBack="/programs"
      />
    );

  function handleEditProgram() {
    if (!program) return; // In reality `program` does exist here but this is cleaner than using the non-null assertion operator 7 times
    mutate({
      id: program.id,
      name: program.name.trim() || null, // required cell (user fills)
      theme_color: program.theme_color,
      weeks_to_do: program.weeks_to_do,
    });
  }

  return (
    <ScrollView>
      {/* Header gradient */}
      <HeaderGradient
        colors={[COLORS.amber[300], COLORS.amber[600]]}
        text="Edit exercise"
      />

      <View className="p-4">
        {/* Programs list item preview */}
        <View>
          <Text className="pb-3 pl-1 text-sm text-muted-foreground">
            This is just a preview card. All of your filled information will be
            stored even if it doesn't show up here.
          </Text>
          <ProgramsListItem program={program} isInteractive={false} />
        </View>

        {/* Form */}
        <View className="gap-3 pt-8">
          {/* Color selector */}
          <View className="flex-row gap-4 px-4 py-3 border rounded-md border-border">
            <Text className="pr-2 text-muted-foreground">Theme color:</Text>

            {USER_THEME_COLORS.map((color) => (
              <Button
                key={color}
                style={{
                  backgroundColor: color,
                  borderWidth: program.theme_color === color ? 2 : undefined,
                }}
                className="w-6 h-6 border-foreground disabled:opacity-100"
                disabled={program.theme_color === color}
                size="icon"
                onPress={() =>
                  setProgram((prev) => prev && { ...prev, theme_color: color })
                }
              />
            ))}
          </View>

          <View className="flex-row gap-3">
            {/* Name */}
            <Input
              label="Name *"
              maxLength={60}
              value={program.name === "Name" ? undefined : program.name}
              onChangeText={(newText) =>
                setProgram(
                  (prev) =>
                    prev && {
                      ...prev,
                      name: newText === "" ? "Name" : newText,
                    }
                )
              }
            />

            {/* Weeks to do */}
            <Input
              label="Weeks to do"
              maxLength={4}
              keyboardType="numeric"
              value={program.weeks_to_do?.toString()}
              onChangeText={(newText) =>
                setProgram(
                  (prev) =>
                    prev && {
                      ...prev,
                      weeks_to_do:
                        Number(newText) || newText === ""
                          ? Number(newText) || null
                          : prev.weeks_to_do, // Ignore characters like , or . but allow "" so that you can clear the input. Returns null if empty input
                    }
                )
              }
            />
          </View>

          {/* Submit button */}
          <Button
            className="mt-3"
            onPress={handleEditProgram}
            isLoading={isPendingEditProgram}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditProgram;
