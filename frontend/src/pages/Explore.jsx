import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DESTINATIONS, useWikiImage } from "../lib/destinations";

function DestCard({ d }) {
  const img = useWikiImage(d.wiki, 800);
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

export default function Explore() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");
  const heroImg = useWikiImage("Oia,_Greece", 1600);

  const go = (e) => {
    e.preventDefault();
    navigate(`/new${q.trim() ? `?dest=${encodeURIComponent(q.trim())}` : ""}`);
  };

  const list = DESTINATIONS.filter((d) => region === "All" || d.region === region);

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

      <div className="dest-grid">
        {list.map((d) => (
          <DestCard key={d.name} d={d} />
        ))}
      </div>
    </>
  );
}
