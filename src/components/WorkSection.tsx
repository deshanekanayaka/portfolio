export default function WorkSection() {
  return (
    <section id="work" >
      <div className="page-container">
        <h2 style={{
          fontSize: 36, fontWeight: 700, color: 'var(--text-bold)',
          letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 24,
        }}>work.</h2>

        <article className="work-card" aria-labelledby="ferro-maps-title">
          <div className="work-logo-column" aria-hidden="true">
            <div className="work-logo">
              <img src="/ferro-maps-bird.webp" alt="" width={48} height={48} />
            </div>
          </div>
          <div className="work-details">
            <h3 id="ferro-maps-title" className="work-company">
              <a href="https://www.ferromaps.com/" target="_blank" rel="noopener noreferrer">Ferro Maps</a>
            </h3>
            <div className="work-role-row">
              <p className="work-role">Founding Contributor</p>
              <p className="work-dates"><time dateTime="2026-10">Oct 2026</time> – Present</p>
            </div>
            <p className="work-location">London Area, United Kingdom · Hybrid</p>
          </div>
        </article>
      </div>

      <style>{`
        .work-card {
          display: grid;
          grid-template-columns: 100px minmax(0, 1fr);
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--surface);
          overflow: hidden;
        }
        .work-logo-column { display: flex; justify-content: center; padding-top: 24px; }
        .work-logo {
          width: 80px; height: 64px; border-radius: 12px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border);
        }
        .work-logo img { width: 48px; height: 48px; object-fit: contain; }
        .work-details { padding: 24px 24px 24px 0; min-width: 0; }
        .work-company { font-size: 22px; font-weight: 600; line-height: 1.3; color: var(--text-bold); margin-bottom: 8px; }
        .work-company a:hover { color: var(--accent-text); }
        .work-role-row { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; }
        .work-role { font-size: 18px; line-height: 1.6; color: var(--text-muted); }
        .work-dates { font-size: 16px; line-height: 1.6; color: var(--text-muted); white-space: nowrap; }
        .work-location { margin-top: 8px; font-size: 16px; line-height: 1.6; color: var(--text-muted); }
        @media (max-width: 640px) {
          .work-card { grid-template-columns: 76px minmax(0, 1fr); border-radius: 16px; }
          .work-logo-column { padding-top: 24px; }
          .work-logo { width: 56px; height: 48px; border-radius: 10px; }
          .work-logo img { width: 36px; height: 36px; }
          .work-details { padding: 24px 20px 24px 0; }
          .work-company { font-size: 21px; }
          .work-role-row { flex-direction: column; gap: 4px; }
          .work-role { font-size: 16px; }
          .work-dates, .work-location { font-size: 14px; }
        }
      `}</style>
    </section>
  )
}
