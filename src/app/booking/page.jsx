import ConsultationBooking from "@/components/ConsultationBooking";
import Breadcrumb from "@/components/Common/Breadcrumb";
export default function BookingPage() {
  return (
    <>
      <Breadcrumb
        pageName="Consultation Booking"
        description="Our consultation booking system allows you to easily find and book an appointment with a qualified mental health professional who can provide the support and guidance you need."
      />
      <ConsultationBooking />
    </>
  );
}
