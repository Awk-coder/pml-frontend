import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetailsPage from "./pages/ProgramDetailsPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniversityPage from "./pages/UniversityPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/programs"
          element={
            <Layout>
              <ProgramsPage />
            </Layout>
          }
        />
        <Route
          path="/programs/:id"
          element={
            <Layout>
              <ProgramDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/universities"
          element={
            <Layout>
              <UniversitiesPage />
            </Layout>
          }
        />
        <Route
          path="/universities/:id"
          element={
            <Layout>
              <UniversityPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <UnderDevelopmentPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
