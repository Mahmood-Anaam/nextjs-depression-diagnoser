import AboutSectionOne from "@/components/About/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="Our Depression Diagnosis Tool leverages advanced AI technology to provide accurate assessments, helping individuals identify their mental health needs and seek appropriate care."
      />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
