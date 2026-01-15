import React, { useContext, useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import TourCard from "../components/TourCard.jsx";
import { tours } from "../data/tours.js";
import { CartContext } from "../contexts/CartContext.jsx";
import { toast } from "react-toastify";

export default function HomePage() {
  const { addToCart } = useContext(CartContext);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return tours;
    return tours.filter((t) => (t.title + " " + t.country).toLowerCase().includes(s));
  }, [q]);

  const onAdd = (tour) => {
    addToCart(tour);
    toast.success(`Added to cart: ${tour.title}`);
  };

  return (
    <>
      <Header onSearch={setQ} />

      <div className="container py-4">
        <div className="p-4 hero shadow-sm">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h2 className="fw-bold mb-1">Journeys you'll want to repeat ✈️</h2>
              <div className="text-muted">
                Choose a tour, add to cart and "pay" on the next page.
              </div>
            </div>
            <div className="text-md-end">
              <span className="badge text-bg-success me-2">Bootstrap UI</span>
              <span className="badge text-bg-primary me-2">Toastify</span>
              <span className="badge text-bg-warning text-dark">Idle Timer</span>
            </div>
          </div>
        </div>

        <div className="d-md-none mt-3">
          <input
            className="form-control"
            placeholder="Find tour..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="row g-3 mt-1">
          {filtered.map((tour) => (
            <div className="col-12 col-md-6 col-lg-3" key={tour.id}>
              <TourCard tour={tour} onAdd={onAdd} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="alert alert-warning mt-3">Nothing found for your search.</div>
        )}
      </div>
    </>
  );
}
