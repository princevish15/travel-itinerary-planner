import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DESTINATIONS, useWikiImage } from "../lib/destinations";

function DestCard({ d }) {
  const img = useWikiImage(d.wiki, 960);
  return (
    <Link
      className="dest"
      to={`/new?dest=${encodeURIComponent(d.query)}&cur=${d.currency}&budget=${d.budget}`}
      style={img ? { backgroundImage: `url(${img})` } : undefined}
    >
      <div className="dest-info">
        <span className="dest-region">{d.region}</span>
        <h3>{d.name}</h3>
        <p>{d.tag}</p>
      </div>
    </Link>
  );
}

const LIMIT = 6;

function Section({ region }) {
  const [all, setAll] = useState(false);
  const list = DESTINATIONS.filter((d) => d.region === region);
  const shown = all ? list : list.slice(0, LIMIT);
  return (
    <section className="dest-section">
      <h3 className="dest-section-title">{region === "India" ? "Incredible India" : "Around the world"}</h3>
      <div className="dest-grid">
        {shown.map((d) => (
          <DestCard key={d.name} d={d} />
        ))}
      </div>
      {list.length > LIMIT && (
        <div className="see-all">
          <button className="btn btn-ghost" onClick={() => setAll(!all)}>
            {all ? "Show less" : `See all ${list.length} places`}
          </button>
        </div>
      )}
    </section>
  );
}

export default function Explore() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");
  const heroImg = useWikiImage("Oia,_Greece", 1280);

  const go = (e) => {
    e.preventDefault();
    navigate(`/new${q.trim() ? `?dest=${encodeURIComponent(q.trim())}` : ""}`);
  };

  const sections = ["India", "International"].filter((r) => region === "All" || region === r);

  return (
    <>
      <section className="explore-hero" style={heroImg ? { backgroundImage: `url(${heroImg})` } : undefined}>
        <div className="explore-hero-in">
          <h1>Where to next?</h1>
          <p>Pick a place, tell us your style, and get a day-by-day plan with photos, costs and map links.</p>
          <form className="hero-search" onSubmit={go}>
            <input placeholder="Search any city or country..." value={q} onChange={(e) => setQ(e.target.value)} />
            <button className="btn btn-primary">Plan trip</button>
          </form>
        </div>
      </section>

      <div className="page-head">
        <div>
          <h2>Popular destinations</h2>
          <p className="muted">Tap a place to start planning. Or search any destination above.</p>
        </div>
        <div className="chips">
          {["All", "India", "International"].map((r) => (
            <button key={r} className={`chip ${region === r ? "on" : ""}`} onClick={() => setRegion(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {sections.map((r) => (
        <Section key={r} region={r} />
      ))}
    </>
  );
}
