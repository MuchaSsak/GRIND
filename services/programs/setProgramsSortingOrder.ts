import AsyncStorage from "@react-native-async-storage/async-storage";

async function setProgramsSortingOrder(newSortingOrder: number[]) {
  try {
    await AsyncStorage.setItem(
      "programsSortingOrder",
      JSON.stringify(newSortingOrder)
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default setProgramsSortingOrder;
