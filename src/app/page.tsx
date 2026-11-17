import InvitationExperience from '@/components/invitation/InvitationExperience';
import {
  ClosingSection,
  EventDetails,
  HeroSection,
  InvitationSection,
} from '@/components/invitation/InvitationSections';

export default function Home() {
  return (
    <InvitationExperience>
      <HeroSection />
      <InvitationSection />
      <EventDetails />
      <ClosingSection />
    </InvitationExperience>
  );
}
