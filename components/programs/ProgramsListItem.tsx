import React from "react";
import { Pressable, View } from "react-native";
import { Link, router } from "expo-router";

import type { ProgramFromDB } from "@/typings/programs";
import { COLORS, PROGRAMS_MAX_WEEKS_TO_DO_CHECKBOXES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import useColorScheme from "@/hooks/useColorScheme";
import useDeleteProgram from "@/hooks/programs/useDeleteProgram";
import { GripVertical, PencilLine, Trash2 } from "@/components/icons";
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
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

type ProgramsListItemProps = {
  program: ProgramFromDB;
  handleDrag?: () => void;
  isInteractive?: boolean;
};

function ProgramsListItem({
  program: { id, created_at, name, theme_color, weeks_to_do, weeks_done },
  handleDrag,
  isInteractive = true,
}: ProgramsListItemProps) {
  const { colorScheme } = useColorScheme();
  const { mutate: deleteProgram, isPending: isPendingDeleteProgram } =
    useDeleteProgram();

  return (
    <Link href={`/programs/${id}`} disabled={!isInteractive}>
      <View
        className="flex-row h-48 border rounded-md bg-background"
        style={{ borderColor: theme_color }}
      >
        {/* Colored marking line */}
        <Pressable
          onLongPress={handleDrag}
          disabled={!isInteractive}
          className="items-center justify-center w-10 h-full rounded-l-md"
          style={{
            backgroundColor: theme_color ?? COLORS[colorScheme].primary,
          }}
        >
          <GripVertical color={COLORS[colorScheme].background} size={28} />
        </Pressable>

        <View className="justify-between flex-grow h-full p-4">
          <View className="flex-row justify-between gap-4">
            <View className="flex-grow w-0">
              {/* Name */}
              <Text className="text-3xl font-medium" numberOfLines={2}>
                {name}
              </Text>
              {/* Date added */}
              <Text className="text-muted-foreground">
                Created in {formatDate(new Date(created_at))}
              </Text>
            </View>

            <View className="flex-row gap-2">
              {/* Edit button */}
              <Button
                disabled={isPendingDeleteProgram || !isInteractive}
                variant="secondary"
                className="w-8 h-8"
                size="icon"
                onPress={() => router.push(`/programs/edit/${id}`)}
              >
                <PencilLine className="text-foreground" size={16} />
              </Button>

              {/* Delete confirmation dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {/* Delete button */}
                  <Button
                    disabled={isPendingDeleteProgram || !isInteractive}
                    variant="destructive"
                    className="w-8 h-8"
                    size="icon"
                  >
                    <Trash2 className="text-white" size={16} />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your entire program. You can always add more.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="flex-row gap-4">
                    {/* Cancel button */}
                    <AlertDialogCancel
                      disabled={isPendingDeleteProgram}
                      className="flex-grow"
                    >
                      <Text className="font-medium text-center text-foreground">
                        Cancel
                      </Text>
                    </AlertDialogCancel>
                    {/* Confirm button */}
                    <AlertDialogAction
                      className="flex-grow bg-destructive"
                      onPress={() => deleteProgram(id)}
                      disabled={isPendingDeleteProgram}
                    >
                      <Text className="font-medium text-center text-white">
                        Delete
                      </Text>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </View>
          </View>

          <View className="flex-row items-end justify-between">
            <View className="flex-row flex-wrap items-center flex-1 w-1/2 gap-1">
              {weeks_to_do ? (
                Number(weeks_to_do) <= PROGRAMS_MAX_WEEKS_TO_DO_CHECKBOXES ? (
                  <>
                    {/* Weeks to do/done checkboxes */}
                    {Array.from({ length: Number(weeks_to_do) })
                      .slice(
                        Number(weeks_to_do) -
                          PROGRAMS_MAX_WEEKS_TO_DO_CHECKBOXES
                      )
                      .map((_, i) => (
                        <Checkbox
                          checked={false}
                          onCheckedChange={() => {}}
                          key={i}
                          className="native:w-5 native:h-5"
                          style={{
                            backgroundColor: theme_color + "3c", // Low opacity
                            borderColor: theme_color,
                          }}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    {/* Weeks to do/done percentage slider */}
                    <Text className="pr-1.5 font-medium">
                      {(Number(weeks_done) / Number(weeks_to_do)) * 100}%
                    </Text>
                    <Progress
                      className="flex-1"
                      max={Number(weeks_to_do)}
                      value={Number(weeks_done)}
                      indicatorColor={theme_color}
                    />
                  </>
                )
              ) : (
                <Text className="text-muted-foreground">N/A</Text>
              )}
            </View>

            {/* Aliasses?? ? ? ? */}
            <View className="flex-1">
              <Text
                className="text-right text-muted-foreground"
                numberOfLines={1}
              >
                A1 - B1 - A2 - B2 - A3
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );
}

export default ProgramsListItem;
