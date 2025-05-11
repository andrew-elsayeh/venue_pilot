
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import BookingCard from '@/components/BookingCard';
import BookingSummary from '@/components/BookingSummary';
import { useToast } from '@/hooks/use-toast';

interface BookingInfo {
  eventName: string;
  budget: string;
  location: string;
  attendees: string;
  dateTime: string;
}

const Index = () => {
  const { toast } = useToast();
  // Hardcoded agent ID
  const agentId = "F3WlJYKgyAoLWpo9V1Cw";
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    eventName: '',
    budget: '',
    location: '',
    attendees: '',
    dateTime: '',
  });

  const handleBookingInfoUpdate = (newInfo: BookingInfo) => {
    setBookingInfo(newInfo);
  };

  const handleRestart = () => {
    setBookingInfo({
      eventName: '',
      budget: '',
      location: '',
      attendees: '',
      dateTime: ''
    });
    
    toast({
      title: "Booking Reset",
      description: "Your booking information has been cleared.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 relative overflow-hidden">
      {/* Background map pattern */}
      <div 
        className="absolute inset-0 opacity-10 z-0" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <NavBar />
      
      <div className="container relative z-10 pt-24 pb-12 flex flex-col md:flex-row items-center justify-center gap-8 min-h-screen">
        <>
          <BookingCard agentId={agentId} onBookingInfoUpdate={handleBookingInfoUpdate} />
          <BookingSummary bookingInfo={bookingInfo} onRestart={handleRestart} />
        </>
      </div>
    </div>
  );
};

export default Index;
