import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type BadgeDataProps = {
  eventId: string;
  name: string;
  email: string;
  eventTitle: string;
  checkInUrl: string;
  image?: string;
  eventDetails: string;
};

type BadgeStateProps = {
  badgeData: BadgeDataProps | null;
  saveBadgeData: (badgeData: BadgeDataProps) => void;
  removeBadgeData: () => void;
  updateAvatar: (uri: string) => void;
};

export const useBadgeStore = create(
  persist<BadgeStateProps>(
    (set) => ({
      badgeData: null,
      saveBadgeData: (badgeData: BadgeDataProps) => {
        set({ badgeData });
      },
      removeBadgeData: () => {
        set({ badgeData: null });
      },
      updateAvatar: (uri: string) =>
        set((state) => ({
          badgeData: state.badgeData
            ? {
                ...state.badgeData,
                image: uri,
              }
            : state.badgeData,
        })),
    }),
    {
      name: 'nlw-unite:badge',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
