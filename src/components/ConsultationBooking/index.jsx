"use client";
import doctors from "./doctors";
import SectionTitle from "@/components/Common/SectionTitle";
const ConsultationBooking = () => {
  return (
    <section className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
      <div className="container">
        <SectionTitle
          title="Book Your Consultation"
          paragraph="Select from our highly-rated doctors to start your journey toward better mental health. Each specialist is experienced in addressing various aspects of depression and anxiety."
          center
          mb="44px"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {doctor.name}
              </h3>
              <p className="text-body-color dark:text-body-color-dark mt-2">
                {doctor.description}
              </p>
              <p className="text-yellow-500 mt-2">
                Rating: {doctor.rating} / 5
              </p>
              <p className="text-body-color dark:text-body-color-dark mt-2">
                Duration: {doctor.duration}
              </p>
              <p className="text-body-color dark:text-body-color-dark mt-2">
                Date: {doctor.date}
              </p>
              <p className="font-semibold mt-2">
                Price: <span className="text-scondery ">{doctor.price}</span>
              </p>
              <button className="mt-4 w-full bg-primary text-white py-3 rounded-lg  hover:bg-blue-900 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationBooking;
