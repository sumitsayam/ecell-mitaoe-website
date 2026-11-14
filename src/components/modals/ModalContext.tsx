'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventItem } from '@/data/events';
import EventModal from '@/components/EventModal';
import JoinModal from '@/components/JoinModal';
import SearchModal from '@/components/SearchModal';

interface ModalContextType {
  selectedEvent: EventItem | null;
  openEvent: (event: EventItem) => void;
  closeEvent: () => void;
  isJoinOpen: boolean;
  openJoin: () => void;
  closeJoin: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        selectedEvent,
        openEvent: (event) => setSelectedEvent(event),
        closeEvent: () => setSelectedEvent(null),
        isJoinOpen,
        openJoin: () => setIsJoinOpen(true),
        closeJoin: () => setIsJoinOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
      }}
    >
      {children}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    // Return safe fallbacks if used outside provider
    return {
      selectedEvent: null,
      openEvent: () => {},
      closeEvent: () => {},
      isJoinOpen: false,
      openJoin: () => {},
      closeJoin: () => {},
      isSearchOpen: false,
      openSearch: () => {},
      closeSearch: () => {},
    };
  }
  return context;
}
