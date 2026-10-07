import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RailwayServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Live Train Status",
      desc: "Know the whereabouts of your train easily",
      color: "bg-orange-500",
      iconColor: "bg-blue-500",
      route: "/train-running-status"
    },
    {
      title: "Coach & Seat Position",
      desc: "View coach & seat layout of the train you wish to",
      color: "bg-orange-500",
      iconColor: "bg-blue-500",
      route: "/coach-seat-position"
    },
    {
      title: "PNR Status",
      desc: "Check PNR Status effortlessly",
      color: "bg-orange-500",
      iconColor: "bg-blue-500",
      route: "/check-pnr-status"
    },
    {
      title: "Platform Locator",
      desc: "Know the platform for your train",
      color: "bg-orange-500",
      iconColor: "bg-blue-500",
      route: "/platform-locator"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#e6f0fa] to-[#d4e6f9] rounded-2xl p-8 sm:p-10 mb-8 overflow-hidden relative shadow-sm border border-blue-100">
      {/* Decorative background glassmorphic elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-[Unbounded] font-extrabold text-[#112233] text-center mb-10 tracking-tight drop-shadow-sm">
          Railways inquiry just a <span className="text-blue-600">click away!</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={() => {
                if (service.route) navigate(service.route);
              }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,100,255,0.15)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer border border-white/50 flex flex-col justify-between h-full min-h-[170px] relative overflow-hidden"
            >
              {/* Subtle top border highlight on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-gray-800 mb-2.5 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                
                {/* Decorative Dash */}
                <div className="flex gap-1.5 mb-3.5 items-center">
                  <span className={`w-3 h-1 ${service.color} rounded-full`}></span>
                  <span className={`w-1.5 h-1 ${service.iconColor} rounded-full opacity-80`}></span>
                </div>
                
                <p className="text-[12px] sm:text-[13px] text-gray-500 font-semibold leading-relaxed group-hover:text-gray-700 transition-colors">
                  {service.desc}
                </p>
              </div>
              
              <div className="mt-5 flex justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-[#f15a22] group-hover:scale-110 transition-all duration-300 shadow-md shadow-blue-500/20 group-hover:shadow-orange-500/30">
                  <ArrowRight size={15} className="text-white transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RailwayServices;
