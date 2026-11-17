'use client';

import { siteContent } from '@/data/content';

export type RevealPhase = 'closed' | 'blooming' | 'open';

/** The entire postcard is the trigger; its illustration is decorative. */
export default function SunflowerReveal({
  phase,
  onBloom,
}: {
  phase: RevealPhase;
  onBloom: () => void;
}) {
  return (
    <div className={`sunflower-reveal sunflower-reveal--${phase}`}>
      <button
        className="sunflower-button"
        type="button"
        aria-label={siteContent.revealAccessibleLabel}
        onClick={onBloom}
        disabled={phase !== 'closed'}
      >
        <span className="sunflower-sender">{siteContent.revealSender}</span>
        <svg className="sunflower-art" viewBox="0 0 260 350" aria-hidden="true" focusable="false">
          {/* The plant is anchored at the pot's rim and grows before it flowers. */}
          <g className="sunflower-growth">
            <path className="sunflower-stem" d="M130 285 C125 243 136 186 130 141" />
            <path className="sunflower-leaf" d="M129 237C111 207 89 207 89 225c3 20 22 27 40 12Z" />
            <path className="sunflower-leaf sunflower-leaf--right" d="M131 222c23-30 45-25 42-7-3 18-24 23-42 7Z" />
            <path className="sunflower-leaf" d="M130 267c-17-21-33-20-31-7 2 14 17 17 31 7Z" />

            {/* A compact closed bud, cradled by sepals instead of loose pointed petals. */}
            <g className="sunflower-bud-head">
              <path
                className="sunflower-bud-core"
                d="M130 149C116 139 118 121 124 111C127 105 133 102 136 109C145 122 145 139 130 149Z"
              />
              <path className="sunflower-bud-sheen" d="M128 138C124 129 125 118 130 114" />
              <path
                className="sunflower-bud-sepal"
                d="M130 153C116 148 110 138 113 125C120 131 126 136 130 140C135 135 142 130 149 125C151 138 144 149 130 153Z"
              />
              <path className="sunflower-bud-vein" d="M130 139v13" />
            </g>

            {/* Two irregular petal layers avoid the stiff, repeated ellipse look. */}
            <g className="sunflower-open-head">
              <g className="sunflower-outer-petals">
                {Array.from({ length: 16 }, (_, index) => (
                  <path
                    key={index}
                    d="M0 -22 C-13 -39 -17 -62 -3 -85 Q1 -89 5 -83 C19 -60 13 -38 0 -22Z"
                    transform={`translate(130 109) rotate(${index * 22.5})`}
                  />
                ))}
              </g>
              <g className="sunflower-inner-petals">
                {Array.from({ length: 16 }, (_, index) => (
                  <path
                    key={index}
                    d="M0 -19 C-10 -34 -11 -52 -2 -67 Q1 -70 4 -64 C13 -48 9 -33 0 -19Z"
                    transform={`translate(130 109) rotate(${index * 22.5 + 11.25})`}
                  />
                ))}
              </g>
              <circle className="sunflower-center-outer" cx="130" cy="109" r="33" />
              <circle className="sunflower-center" cx="130" cy="109" r="29" />
              <g className="sunflower-seeds">
                {[
                  [120, 96], [132, 94], [143, 99], [112, 107], [125, 106],
                  [138, 110], [149, 114], [116, 120], [130, 120], [142, 125], [125, 133],
                ].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" />)}
              </g>
            </g>
          </g>
          {/* A proper flowerpot stays grounded while the plant grows. */}
          <ellipse className="sunflower-pot-shadow" cx="130" cy="330" rx="76" ry="10" />
          <path className="sunflower-pot-body" d="M67 280H193L177 328Q130 347 83 328Z" />
          <path className="sunflower-pot-shade" d="M153 284h36l-12 44q-14 7-28 10Z" />
          <rect className="sunflower-pot-rim" x="61" y="269" width="138" height="23" rx="8" />
          <path className="sunflower-pot-detail" d="M95 308c24 10 45 10 70 0" />
          <path className="sunflower-pot-heart" d="M130 318c-9-6-12-11-7-14 3-2 6 0 7 3 2-4 6-5 8-2 4 5-2 9-8 13Z" />
        </svg>
        <span className="sunflower-label">{siteContent.revealLabel}</span>
      </button>
    </div>
  );
}
