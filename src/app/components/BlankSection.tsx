import './BlankSection.css';

const MARQUEE_TEXT =
  'Bengaluru ✦ Mysuru ✦ Tirupur ✦ Guangzhou, China ✦ Singapore ✦ Kuala Lumpur, Malaysia ✦ USA ✦ UAE ✦ ';

export function BlankSection() {
  return (
    <section
      className="blank-section"
      style={{ backgroundColor: '#000000' }}
      aria-label="Locations"
    >
      <div className="blank-section-marquee-track">
        <div className="blank-section-marquee-inner">
          <span className="blank-section-marquee-text" aria-hidden>
            {MARQUEE_TEXT}
          </span>
          <span className="blank-section-marquee-text" aria-hidden>
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>
    </section>
  );
}
