import React from "react";
import { ActivityIndicator, View } from "react-native";
import { type Href, Link, useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { formatDate, getTextColorBasedOnBg, setWebviewHTML } from "@/lib/utils";
import useGetExercises from "@/hooks/exercises/useGetExercises";
import {
  PencilLine,
  SquareArrowOutUpRight,
  VideoOff,
  CircleHelp,
} from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ErrorInfo from "@/components/ErrorInfo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

function Exercise() {
  // Popover insets
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const { id } = useLocalSearchParams();
  // Calling the get all exercises function because the results are already cached thanks to Tanstack Query.
  // This should eliminate loading time and be a better solution than making an another fetch request. I still account for fetching from Supabase though (just in case).
  const { data: exercises, isLoading, error } = useGetExercises();
  const exercise = exercises?.find((exercise) => exercise.id === id);

  if (isLoading)
    return (
      <View className="justify-center flex-1">
        <ActivityIndicator className="text-foreground" size={96} />
      </View>
    );

  if (error || !exercise)
    return (
      <ErrorInfo
        className="justify-center flex-1"
        error={error}
        goBack="/exercises"
      />
    );

  const textColorOnThemedBackground = getTextColorBasedOnBg(
    exercise.theme_color
  );

  return (
    <View className="relative flex-1">
      {/* Video link */}
      {setWebviewHTML(exercise.video_link ?? "") ? (
        //  Video thumbnail with link
        <View className="h-[17.5rem]">
          <WebView
            source={{
              uri: exercise.video_link!,
              html: setWebviewHTML(exercise.video_link!),
            }}
            scrollEnabled={false}
          />

          {/* Play button (link to media) */}
          <Button
            style={{ backgroundColor: exercise.theme_color }}
            size="icon"
            className="absolute rounded-full shadow-xl top-12 right-4"
          >
            <Link href={exercise.video_link as Href}>
              <SquareArrowOutUpRight color={textColorOnThemedBackground} />
            </Link>
          </Button>
        </View>
      ) : (
        // No media available container
        <View className="relative items-center justify-center w-screen border border-dashed h-72 bg-muted border-muted-foreground">
          <VideoOff className="text-muted-foreground" size={100} />

          {/* Info button */}
          <Popover className="absolute top-12 right-4">
            <PopoverTrigger asChild>
              <Button
                style={{ backgroundColor: exercise.theme_color }}
                size="icon"
                className="rounded-full shadow-xl"
              >
                <CircleHelp color={textColorOnThemedBackground} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              insets={contentInsets}
              className="gap-1.5 w-80"
            >
              <Text className="text-xl font-medium">Media is unavailable</Text>
              <Text className="text-sm text-muted-foreground">
                You need to add a video link in order to see content here. If
                you already did, it probably means that your link is either
                broken or unsupported.
              </Text>
              {exercise.video_link && (
                <Text className="text-sm text-muted-foreground">
                  Current link:{" "}
                  <Link
                    href={exercise.video_link as Href}
                    className="text-sm font-medium underline text-muted-foreground"
                  >
                    {exercise.video_link}
                  </Link>
                </Text>
              )}
            </PopoverContent>
          </Popover>
        </View>
      )}

      <View className="flex-1 gap-8 p-4">
        {/* Background gradient */}
        <LinearGradient
          className="absolute top-0 left-0 w-screen h-screen opacity-25 -z-10"
          end={{ x: 0.5, y: 0.5 }}
          colors={[exercise.theme_color, "transparent"]}
        />

        <View className="gap-1">
          {/* Title */}
          <Text className="text-4xl font-bold">{exercise.name}</Text>
          {/* Date added */}
          <Text className="text-muted-foreground">
            Created in {formatDate(new Date(exercise.created_at))}
          </Text>
        </View>

        {/* Tempo */}
        <View className="gap-1">
          <Text className="text-lg font-medium">Tempo</Text>
          {exercise.tempo ? (
            <Text>{exercise.tempo}</Text>
          ) : (
            <Text className="text-muted-foreground">N/A</Text>
          )}
        </View>

        {/* Notes */}
        <View className="gap-1">
          <Text className="text-lg font-medium">Notes</Text>
          {exercise.notes ? (
            <Text>{exercise.notes}</Text>
          ) : (
            <Text className="text-muted-foreground">N/A</Text>
          )}
        </View>

        {/* Muscle group */}
        <View className="gap-1">
          <Text className="text-lg font-medium">Muscle group</Text>
          {exercise.muscle_group.length ? (
            <View className="flex-row flex-wrap gap-2">
              {exercise.muscle_group.map((muscle) => (
                <Text
                  key={muscle}
                  className="px-4 py-1 rounded-md"
                  style={{
                    backgroundColor: exercise.theme_color,
                    color: textColorOnThemedBackground,
                  }}
                >
                  {muscle}
                </Text>
              ))}
            </View>
          ) : (
            <Text className="text-muted-foreground">N/A</Text>
          )}
        </View>

        {/* Edit button */}
        <Button
          className="absolute self-center w-full bottom-4"
          size="lg"
          style={{ backgroundColor: exercise.theme_color }}
          onPress={() => router.push(`/exercises/edit/${id}`)}
        >
          <PencilLine color={textColorOnThemedBackground} size={19} />
          <Text style={{ color: textColorOnThemedBackground }}>Edit</Text>
        </Button>
      </View>
    </View>
  );
}

export default Exercise;
