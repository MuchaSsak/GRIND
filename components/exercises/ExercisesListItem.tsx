import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type Href, Link, router } from "expo-router";

import type { ExerciseFromDB } from "@/typings/exercises";
import useDeleteExercise from "@/hooks/exercises/useDeleteExercise";
import { EllipsisVertical, PencilLine, Trash2 } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ExercisesListItemProps = {
  exercise: ExerciseFromDB;
  isInteractive?: boolean; // Useful for making previews like in `/exercises/add`
};

function ExercisesListItem({
  exercise: { id, name, muscle_group, theme_color },
  isInteractive = true,
}: ExercisesListItemProps) {
  // Popover insets
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const { mutate, isPending } = useDeleteExercise();

  function handleDeleteExercise() {
    mutate(id);
  }

  return (
    <Link disabled={!isInteractive} href={`/exercises/${id}` as Href}>
      <View
        className="flex-row items-center w-full h-16 pr-2 border rounded-md bg-background"
        style={{ borderColor: theme_color }}
      >
        {/* Colored marking line */}
        <View
          className="w-2 h-full rounded-l-md"
          style={{
            backgroundColor: theme_color,
          }}
        />

        <View className="flex flex-col justify-between flex-1 pl-4">
          {/* Name */}
          <Text
            className="text-2xl font-medium text-foreground"
            numberOfLines={1}
          >
            {name}
          </Text>

          {/* Muscle group */}
          <Text className="text-muted-foreground text-md" numberOfLines={1}>
            {muscle_group.length > 0 ? muscle_group.join(" • ") : "N/A"}
          </Text>
        </View>

        {/* Ellipsis extend menu */}
        <Popover>
          {/* Show popover */}
          <PopoverTrigger asChild>
            <Button disabled={!isInteractive} variant="ghost" size="slim">
              <EllipsisVertical className="text-foreground" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            insets={contentInsets}
            className="w-48 gap-3 p-3"
          >
            {/* Edit button */}
            <PopoverTrigger asChild>
              <Button
                disabled={isPending}
                variant="secondary"
                className="gap-2"
                size="sm"
                onPress={() => router.push(`/exercises/edit/${id}`)}
              >
                <PencilLine className="text-foreground" size={16} />
                <Text className="font-semibold text-foreground">Edit</Text>
              </Button>
            </PopoverTrigger>

            {/* Delete confirmation dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/* Delete button */}
                <Button
                  disabled={isPending}
                  variant="destructive"
                  className="gap-2"
                  size="sm"
                >
                  <Trash2 className="text-white" size={16} />
                  <Text className="font-semibold text-white">Delete</Text>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your exercise. You can always add it back.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex-row gap-4">
                  {/* Cancel button */}
                  <AlertDialogCancel disabled={isPending} className="flex-grow">
                    <Text className="font-medium text-foreground">Cancel</Text>
                  </AlertDialogCancel>
                  {/* Confirm button */}
                  <AlertDialogAction
                    className="flex-grow bg-destructive"
                    onPress={handleDeleteExercise}
                    disabled={isPending}
                  >
                    <Text className="font-medium text-white">Delete</Text>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PopoverContent>
        </Popover>
      </View>
    </Link>
  );
}

export default ExercisesListItem;
