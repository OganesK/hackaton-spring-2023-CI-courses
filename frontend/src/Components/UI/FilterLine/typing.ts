export interface FilterLineProps {
  isCalendar?: boolean;
  isEventsPage?: boolean;
  isNewsPage?: boolean;
  isOffersPage?: boolean;
  isResourcesPage?: boolean;
  isProjectsPage?: boolean;
  isProfilePage?: boolean;
  isCompanyPage?: boolean;
  isModerationPage?: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}
