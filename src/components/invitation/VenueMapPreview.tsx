import { siteContent } from '@/data/content';

function isGoogleMapsEmbed(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return (
      url.protocol === 'https:' &&
      url.hostname === 'www.google.com' &&
      url.pathname === '/maps/embed'
    );
  } catch {
    return false;
  }
}

export default function VenueMapPreview({
  embedUrl,
  directionsUrl,
  venueName,
}: {
  embedUrl: string;
  directionsUrl: string;
  venueName: string;
}) {
  if (!isGoogleMapsEmbed(embedUrl)) {
    return (
      <div className="map-preview map-pending" role="group" aria-label={`Bản đồ ${venueName}`}>
        <span className="map-sun" aria-hidden="true">
          ✿
        </span>
        <p>{siteContent.mapPending}</p>
        <a className="directions-link" href={directionsUrl} target="_blank" rel="noreferrer">
          {siteContent.mapDirections}
        </a>
      </div>
    );
  }

  return (
    <div className="map-preview" role="group" aria-label={`Bản đồ ${venueName}`}>
      <iframe
        className="map-embed"
        title={`Bản đồ Google Maps: ${venueName}`}
        src={embedUrl.trim()}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
