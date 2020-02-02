import AsyncStorage from "@react-native-community/async-storage";

// -----------------------------------------------------------------------------

const Storage = {
    read: async function<T>(key: string): Promise<T|null> {
        const data = await AsyncStorage.getItem(key);
        return JSON.parse(data || 'null');
    },

    write: async function<T>(key: string, data: T) {
        const storableData = JSON.stringify(data);
        AsyncStorage.setItem(key, storableData);
    },

    remove: async function(key: string) {
        AsyncStorage.removeItem(key);
    }
};

export default Storage;