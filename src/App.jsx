import React from "react";
import { Route, Routes } from "react-router-dom";
import ComponentOne from "./Components/Pages/ComponentOne";
import ComponentTwo from "./Components/Pages/ComponentTwo";
import ComponentThree from "./Components/Pages/ComponentThree";
import { IntervalProvider } from "./Components/Hooks/IntervalContext";
import Layout from "./Components/Atoms/Molecules/Layout";

function App() {
  return (
    <IntervalProvider>
      <AppContent />
    </IntervalProvider>
  );
}

function AppContent() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<ComponentOne />} />
          <Route path="/second" element={<ComponentTwo />} />
          <Route path="/three" element={<ComponentThree />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
