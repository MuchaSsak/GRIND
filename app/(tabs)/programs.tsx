import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import DraggableFlatList, {
  type RenderItemParams,
} from "react-native-draggable-flatlist";

import type { ProgramFromDB } from "@/typings/programs";
import { programsToSortingOrder, sortPrograms } from "@/lib/utils";
import useGetPrograms from "@/hooks/programs/useGetPrograms";
import useGetProgramsSortingOrder from "@/hooks/programs/useGetProgramsSortingOrder";
import useSetProgramsSortingOrder from "@/hooks/programs/useSetProgramsSortingOrder";
import { Text } from "@/components/ui/text";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import HeaderGradient from "@/components/HeaderGradient";
import ErrorInfo from "@/components/ErrorInfo";
import ProgramsListItem from "@/components/programs/ProgramsListItem";
import GetStartedInfo from "@/components/programs/GetStartedInfo";

function Programs() {
  const {
    data: programs,
    isLoading: isLoadingPrograms,
    error,
  } = useGetPrograms();
  const { data: sortingOrder, isLoading: isLoadingProgramsSortingOrder } =
    useGetProgramsSortingOrder();
  const { mutate: setProgramsSortingOrder } = useSetProgramsSortingOrder();
  const [sortedPrograms, setSortedPrograms] = useState(
    sortPrograms(programs ?? [], sortingOrder ?? [])
  );

  useEffect(() => {
    // Set programs state according to the sorting order from Async Storage
    setSortedPrograms(sortPrograms(programs ?? [], sortingOrder ?? []));
  }, [setSortedPrograms, sortPrograms, programs, sortingOrder]);

  function handleDragEnd(newPrograms: ProgramFromDB[]) {
    const newSortingOrder = programsToSortingOrder(programs!, newPrograms);

    // Save the newly sorted programs to state so that the user doesn't have to wait for the fetching to finish (optimistic update)
    setSortedPrograms([...newPrograms]);

    // Save this new sorting order to Async Storage
    setProgramsSortingOrder(newSortingOrder);
  }

  return (
    <>
      {/* Header gradient */}
      <HeaderGradient text="Programs" />

      <View className="p-4">
        <Button onPress={() => router.push("/programs/new")}>
          <Text>New program</Text>
        </Button>
      </View>

      {/* Error info */}
      {error && <ErrorInfo error={error} />}

      {/* Programs list */}
      {!error && (
        <DraggableFlatList
          data={sortedPrograms}
          renderItem={({ item, drag }: RenderItemParams<ProgramFromDB>) => (
            <ProgramsListItem program={item} handleDrag={drag} />
          )}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => handleDragEnd(data)}
          className="p-4"
          contentContainerStyle={{
            gap: 8,
            paddingBottom: 325,
          }}
          scrollEnabled={!!programs?.length}
          ListEmptyComponent={
            <>
              {isLoadingPrograms || isLoadingProgramsSortingOrder ? (
                <>
                  {/* Loading skeletons (x15 to cover the screen) */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-48" />
                  ))}
                </>
              ) : (
                <>
                  {/* No programs found info */}
                  <GetStartedInfo />
                </>
              )}
            </>
          }
        />
      )}
    </>
  );
}

export default Programs;
