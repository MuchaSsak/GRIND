import AsyncStorage from "@react-native-async-storage/async-storage";

async function getProgramsSortingOrder(): Promise<number[] | null> {
  try {
    const sortingOrder = await AsyncStorage.getItem("programsSortingOrder");

    return sortingOrder ? JSON.parse(sortingOrder) : null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getProgramsSortingOrder;
