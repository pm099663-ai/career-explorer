import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollegeDataProvider } from "./context/CollegeDataContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { CollegesPage } from "./pages/CollegesPage";
import { BranchesPage } from "./pages/BranchesPage";
import { CollegeDetailPage } from "./pages/CollegeDetailPage";
import { ComparePage } from "./pages/ComparePage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  return (
    <CollegeDataProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/college/:id" element={<CollegeDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CollegeDataProvider>
  );
}
