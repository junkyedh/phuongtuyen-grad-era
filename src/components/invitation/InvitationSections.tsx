import Image from 'next/image';
import { event } from '@/data/event';
import { siteContent } from '@/data/content';
import VenueMapPreview from './VenueMapPreview';
import SunflowerIllustration from './SunflowerIllustration';

export function HeroSection() {
  const graduateName = event.graduate.toLocaleUpperCase('vi-VN').split(' ');
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow hero-eyebrow">{siteContent.heroEyebrow}</p>
        <h1 id="hero-title" className="hero-title">
          {siteContent.heroTitle}
        </h1>
        <p className="hero-name" aria-label={graduateName.join(' ')}>
          <span>{graduateName.slice(0, 2).join(' ')}</span>
          <span>{graduateName.slice(2).join(' ')}</span>
        </p>
        <p className="hero-program">
          {event.class} <span aria-hidden="true">–</span> {event.program}
        </p>
        <p className="hero-university">{event.university}</p>
      </div>
      <figure className="portrait-frame" data-reveal data-reveal-motion="zoom">
        <div className="portrait-media">
          {event.portraitSrc ? (
            <Image
              src={event.portraitSrc}
              alt={`Chân dung tốt nghiệp của ${event.graduate}`}
              fill
              priority
              sizes="(max-width: 767px) 86vw, 43vw"
              className="portrait-image"
            />
          ) : (
            <div
              className="portrait-placeholder"
              role="img"
              aria-label={siteContent.portraitPlaceholder}
            >
              <svg viewBox="0 0 120 140" aria-hidden="true">
                <path d="M18 128c3-28 18-42 42-42s39 14 42 42" />
                <circle cx="60" cy="47" r="24" />
                <path d="M35 34 60 13l25 21M42 32h36" />
                <path d="m60 12 12 10H48Z" />
              </svg>
              <span>{siteContent.portraitPlaceholder}</span>
            </div>
          )}
        </div>
        <figcaption>CLASS OF 2026</figcaption>
        <SunflowerIllustration className="hero-flower" variant="sprig" />
      </figure>
    </section>
  );
}

export function InvitationSection() {
  return (
    <section className="invitation-note section-wrap" aria-labelledby="invitation-title">
      <div className="invitation-editorial" data-reveal>
        <h2 id="invitation-title" className="visually-hidden">
          Lời mời tốt nghiệp
        </h2>
        <div className="invitation-art" aria-hidden="true">
          <SunflowerIllustration className="invitation-flower" variant="single" />
        </div>
        <div className="invitation-copy">
          <p className="invitation-supporting">{siteContent.invitationSupporting}</p>
          <div className="invitation-message">
            <p className="invitation-opening">{siteContent.invitationOpening}</p>
            <p className="invitation-details">{siteContent.invitationDetails}</p>
            <p className="invitation-closing">{siteContent.invitationClosing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EventDetails() {
  return (
    <section className="event-details section-wrap" aria-labelledby="event-title">
      <div className="event-copy" data-reveal>
        <h2 id="event-title">
          <SunflowerIllustration className="event-flower" variant="accent" />
          {siteContent.eventHeading}
        </h2>
        <time dateTime={`${event.date}T15:00:00+07:00`} className="event-date">
          {event.dateLabel}
        </time>
        <p className="event-time">{event.time}</p>
        <div className="venue-address">
          <h3>{event.venue}</h3>
          <p>{event.address}</p>
          <a
            className="contact-link"
            href={event.contact.tel}
            aria-label={`Gọi ${event.contact.name}: ${event.contact.phone}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72l.47 3a2 2 0 0 1-.57 1.7L8.1 11.3a16 16 0 0 0 4.6 4.6l1.88-1.88a2 2 0 0 1 1.7-.57l3 .47A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span>
              {event.contact.name} · {event.contact.phone}
            </span>
          </a>
        </div>
      </div>
      <div className="map-reveal" data-reveal data-reveal-motion="fade">
        <VenueMapPreview
          embedUrl={event.mapEmbedUrl}
          directionsUrl={event.directionsUrl}
          venueName={event.venue}
        />
      </div>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section className="closing-section section-wrap" aria-label="Lời kết" data-reveal>
      <SunflowerIllustration className="closing-bouquet" variant="bouquet" />
      <p>{siteContent.closingMessage}</p>
      <p className="closing-english">{siteContent.closingEnglish}</p>
    </section>
  );
}
