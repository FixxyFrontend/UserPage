import React from 'react';

interface ServiceType {
  title: string;
  description: string;
  image: React.ReactNode;
}

interface ServiceCardProps extends ServiceType {
  key?: React.Key;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, description }): JSX.Element => (
  <div className="rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-violet-900/50 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
    <div className="p-6">
      <div className="w-16 h-16 mb-4 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-3">
        {image}
      </div>
      <h3 className="text-2xl text-center text-white font-semibold mb-4">{title}</h3>
      <p className="text-zinc-300 text-center">{description}</p>
    </div>
  </div>
);

const About2: React.FC = (): JSX.Element => {
  const services: ServiceType[] = [
    {
      title: "Plumbing",
      description: "Expert plumbing services for all your pipe, fixture, and drainage needs",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-droplet w-full h-full">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
      )
    },
    {
      title: "Carpentry",
      description: "Professional woodwork and furniture repair services",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      title: "Electrical",
      description: "Complete electrical installation and repair services",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cable w-full h-full">
          <path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"/>
          <path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"/><path d="M21 21v-2h-4"/>
        <path d="M3 5h4V3"/><path d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3"/></svg>
      )
    },
    {
      title: "WiFi Issues",
      description: "Network troubleshooting and WiFi optimization services",
      image: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12" y2="20" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="font-semibold text-4xl sm:text-6xl text-zinc-200 text-transparent bg-clip-text mb-4">
          What <span className=' text-orange-500'>Services</span> Do We Provide<span className=' inline-block animate-bounce'>?</span>
        </h1>
        <p className="text-zinc-300 text-xl sm:text-2xl mt-10">
          Every basic maintenance service is provided
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </div>
  );
};

export default About2;