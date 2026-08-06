import { Routes, Route } from "react-router-dom";

import HomePage from "../app/page";
import AboutPage from "../app/about/page";
import ProjectsPage from "../app/projects/page";
import ServicesPage from "../app/services/page";
import BlogPage from "../app/blog/page";
import ContactPage from "../app/contact/page";
import ResumePage from "../app/resume/page";
import GoPremierePage from "../app/gopremiere/page";
import ProjectDetailPage from "../app/projects/[slug]/page";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/gopremiere" element={<GoPremierePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
    </Routes>
  );
}