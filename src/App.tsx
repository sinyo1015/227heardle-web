import * as React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";

import "./App.css";
import Index from "./Index";

function App() {
  return (
    <ChakraProvider>
      <Index/>
    </ChakraProvider>
  );
}

export default App;
