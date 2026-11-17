/** Subtle continuous petals across every invitation section; no JS timers or scroll listeners. */
export default function FloatingPetals() {
  return (
    <div className="floating-petals" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => <span key={index} />)}
    </div>
  );
}
