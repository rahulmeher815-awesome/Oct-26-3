import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HomePage } from './components/home/HomePage';
import { HowItWorksPage } from './components/home/HowItWorksPage';
import { FarmerAuthModal } from './components/auth/FarmerAuthModal';
import { ExpertAuthModal } from './components/auth/ExpertAuthModal';
import { ExpertDirectory } from './components/expert/ExpertDirectory';
import { ExpertProfileModal } from './components/expert/ExpertProfileModal';
import { ExpertDashboard } from './components/expert/ExpertDashboard';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { FarmerAppointments } from './components/farmer/FarmerAppointments';
import { FarmerProfileView } from './components/farmer/FarmerProfileView';
import { AskQuestionModal } from './components/farmer/AskQuestionModal';
import { BookingModal } from './components/consultation/BookingModal';
import { ConsultationChatModal } from './components/consultation/ConsultationChatModal';

const MainApp: React.FC = () => {
  const {
    role,
    activeView,
    setActiveView,
    selectedExpertForView,
    setSelectedExpertForView,
    selectedExpertForBooking,
    setSelectedExpertForBooking,
    activeChatBooking,
    setActiveChatBooking,
    isAskQuestionModalOpen,
    setIsAskQuestionModalOpen,
    setFilterByCrop
  } = useApp();

  const [isFarmerAuthOpen, setIsFarmerAuthOpen] = useState(false);
  const [isExpertAuthOpen, setIsExpertAuthOpen] = useState(false);

  // When farmer finishes booking, redirect them to appointments
  const handleBookingSuccess = () => {
    // modal handles confirmation screen
  };

  // Render role-specific and active view
  const renderCurrentView = () => {
    // 1. Role = Guest
    if (role === 'guest') {
      if (activeView === 'experts') {
        return <ExpertDirectory onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)} />;
      }
      if (activeView === 'how-it-works') {
        return (
          <HowItWorksPage
            onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)}
            onOpenExpertAuth={() => setIsExpertAuthOpen(true)}
          />
        );
      }
      return (
        <HomePage
          onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)}
          onOpenExpertAuth={() => setIsExpertAuthOpen(true)}
        />
      );
    }

    // 2. Role = Farmer
    if (role === 'farmer') {
      if (activeView === 'experts') {
        return <ExpertDirectory onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)} />;
      }
      if (activeView === 'appointments') {
        return <FarmerAppointments />;
      }
      if (activeView === 'profile') {
        return <FarmerProfileView />;
      }
      if (activeView === 'how-it-works') {
        return (
          <HowItWorksPage
            onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)}
            onOpenExpertAuth={() => setIsExpertAuthOpen(true)}
          />
        );
      }
      return (
        <FarmerDashboard
          onOpenAskQuestion={() => setIsAskQuestionModalOpen(true)}
        />
      );
    }

    // 3. Role = Expert
    if (role === 'expert') {
      return <ExpertDashboard />;
    }

    return (
      <HomePage
        onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)}
        onOpenExpertAuth={() => setIsExpertAuthOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Top Navbar */}
      <Navbar
        onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)}
        onOpenExpertAuth={() => setIsExpertAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Modals */}
      <FarmerAuthModal
        isOpen={isFarmerAuthOpen}
        onClose={() => setIsFarmerAuthOpen(false)}
      />

      <ExpertAuthModal
        isOpen={isExpertAuthOpen}
        onClose={() => setIsExpertAuthOpen(false)}
      />

      <ExpertProfileModal
        expert={selectedExpertForView}
        onClose={() => setSelectedExpertForView(null)}
        onBook={(exp) => {
          setSelectedExpertForView(null);
          if (role !== 'farmer') {
            setIsFarmerAuthOpen(true);
          } else {
            setSelectedExpertForBooking(exp);
          }
        }}
      />

      <BookingModal
        expert={selectedExpertForBooking}
        onClose={() => setSelectedExpertForBooking(null)}
        onSuccess={handleBookingSuccess}
      />

      <AskQuestionModal
        isOpen={isAskQuestionModalOpen}
        onClose={() => setIsAskQuestionModalOpen(false)}
        onSuccessNavigateToExperts={(crop) => {
          setFilterByCrop(crop);
          setActiveView('experts');
        }}
      />

      <ConsultationChatModal
        booking={activeChatBooking}
        onClose={() => setActiveChatBooking(null)}
      />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
