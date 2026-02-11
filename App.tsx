import AppNavigator from "@navigation/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { store } from "@store/index";
import { Provider } from "node_modules/react-redux/dist/react-redux";
import { BG } from "src/constants";
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
        <StatusBar style="auto" backgroundColor={BG} />
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
