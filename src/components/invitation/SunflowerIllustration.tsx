/** Decorative botanical variants have different silhouettes for each section. */
type SunflowerVariant = 'single' | 'sprig' | 'bouquet' | 'accent';

type SunflowerIllustrationProps = {
  className?: string;
  variant?: SunflowerVariant;
};

type FlowerStyle = 'soft' | 'bouquet';

/** Uneven, slightly downturned petals: softer than identical radial ellipses. */
function FlowerHead({
  x,
  y,
  scale = 1,
  rotate = 0,
  style = 'soft',
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  style?: FlowerStyle;
}) {
  const petalCount = style === 'soft' ? 14 : 12;
  const outer = style === 'soft'
    ? 'M-5 -21C-13 -30 -23 -46 -22 -58C-22 -69 -13 -79 -8 -74C-8 -63 4 -60 11 -47C16 -35 9 -26 4 -21Z'
    : 'M-5 -19C-15 -27 -20 -38 -18 -49C-17 -58 -9 -66 -5 -60C-4 -51 4 -49 9 -39C15 -28 9 -21 4 -19Z';
  const inner = 'M-3 -17C-9 -27 -13 -39 -11 -48C-10 -56 -5 -59 -2 -52C-1 -45 7 -42 9 -32C11 -25 6 -19 3 -17Z';

  return (
    <g className={`botanical-head botanical-head--${style}`} transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <g className="botanical-outer-petals">
        {Array.from({ length: petalCount }, (_, i) => (
          <path
            key={i}
            d={outer}
            transform={`rotate(${i * (360 / petalCount) + (i % 3 === 0 ? -4 : 2)}) scale(${i % 4 === 0 ? 0.94 : 1})`}
          />
        ))}
      </g>
      <g className="botanical-inner-petals">
        {Array.from({ length: petalCount }, (_, i) => (
          <path key={i} d={inner} transform={`rotate(${i * (360 / petalCount) + 360 / (petalCount * 2)})`} />
        ))}
      </g>
      <circle className="botanical-center-outer" r="29" />
      <circle className="botanical-center" r="24" />
      <g className="botanical-seeds">
        {[
          [0, -12], [12, -8], [-13, -6], [-7, 4], [7, 3],
          [15, 12], [-13, 13], [1, 16],
        ].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />)}
      </g>
    </g>
  );
}

/** Small flower without a stem, drawn separately for the event heading. */
function AccentFlower({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 130 130" aria-hidden="true" focusable="false">
      <g transform="translate(65 65) rotate(-8)">
        <g className="botanical-accent-petals">
          {Array.from({ length: 10 }, (_, i) => (
            <path
              key={i}
              d="M-5 -16C-13 -24 -17 -38 -12 -48C-9 -56 -3 -56 0 -49C7 -42 12 -29 5 -17Z"
              transform={`rotate(${i * 36})`}
            />
          ))}
        </g>
        <circle className="botanical-accent-ring" r="24" />
        <circle className="botanical-accent-center" r="19" />
        <g className="botanical-accent-seeds">
          <circle cx="-7" cy="-6" r="2" /><circle cx="5" cy="-8" r="2" />
          <circle cx="-2" cy="5" r="2" /><circle cx="9" cy="6" r="2" />
        </g>
      </g>
    </svg>
  );
}

export default function SunflowerIllustration({
  className = '',
  variant = 'single',
}: SunflowerIllustrationProps) {
  if (variant === 'accent') return <AccentFlower className={className} />;

  if (variant === 'bouquet') {
    return (
      <svg className={className} viewBox="0 0 290 265" aria-hidden="true" focusable="false">
        <g className="botanical-stems">
          <path d="M144 247C124 208 97 164 84 115" />
          <path d="M144 247c0-66 2-113 0-154" />
          <path d="M144 247c22-63 40-95 60-123" />
        </g>
        <g className="botanical-leaves">
          <path d="M129 204c-36-29-45-6-26 9 12 10 20 6 26-9Z" />
          <path d="M162 211c35-25 43-6 24 9-12 9-21 4-24-9Z" />
          <path d="M144 171c-26-23-35-4-18 8 11 7 16 4 18-8Z" />
        </g>
        <FlowerHead x={82} y={103} scale={0.54} rotate={-18} style="bouquet" />
        <FlowerHead x={144} y={81} scale={0.73} rotate={5} style="bouquet" />
        <FlowerHead x={207} y={114} scale={0.52} rotate={21} style="bouquet" />
        <path className="botanical-ribbon" d="M127 229Q144 219 161 229l-10 18-13-9-9 10Z" />
      </svg>
    );
  }

  if (variant === 'sprig') {
    return (
      <svg className={className} viewBox="0 0 225 268" aria-hidden="true" focusable="false">
        <path className="botanical-stem" d="M120 251c-17-45-21-87-7-153" />
        <path className="botanical-leaf" d="M103 202c-36-24-44-4-25 12 15 10 23 6 25-12Z" />
        <path className="botanical-leaf" d="M113 176c24-30 46-22 34-5-10 13-23 17-34 5Z" />
        <FlowerHead x={113} y={91} scale={0.83} rotate={-10} />
        <path className="botanical-detail" d="M157 205c15-15 31-11 38 2M47 160c14-13 26-9 32 4" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 225 268" aria-hidden="true" focusable="false">
      <path className="botanical-stem" d="M111 251C101 211 122 162 111 113" />
      <path className="botanical-leaf" d="M109 203c-35-26-48-12-32 7 12 14 24 11 32-7Z" />
      <path className="botanical-leaf" d="M115 222c27-31 49-22 35-4-10 13-24 15-35 4Z" />
      <FlowerHead x={111} y={94} rotate={10} style="soft" />
    </svg>
  );
}
