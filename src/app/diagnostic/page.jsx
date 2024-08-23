// src/app/diagnostic/page.jsx
"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import DiagnosticStepper from "@/components/Diagnostic/DiagnosticStepper";
import SectionTitle from "@/components/Common/SectionTitle";

const DiagnosticPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Diagnostic"
        description="Determine your depression level by answering a series of questions and analyzing your facial expressions and tone of voice."
      />
      <section id="diagnostic" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Diagnostic Tool"
            paragraph="Please answer the following questions to help us determine your depression level. Ensure your webcam and microphone are active to allow us to analyze your facial expressions and tone of voice."
            center
            mb="44px"
          />

          <div className="flex flex-wrap items-center justify-center">
            <DiagnosticStepper />
          </div>
        </div>




      </section>
    </>
  );
};

export default DiagnosticPage;
