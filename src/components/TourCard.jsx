import React from "react";

export default function TourCard({ tour, onAdd }) {
  return (
    <div className="card h-100 card-hover border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-1">{tour.title}</h5>
            <div className="text-muted small">{tour.country} • {tour.days} days</div>
          </div>
          <span className="badge text-bg-primary">{tour.badge}</span>
        </div>

        <p className="mt-3 mb-3 text-secondary">{tour.desc}</p>

        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-5 fw-bold">
            €{tour.price}
            <span className="text-muted fw-normal fs-6"> / person</span>
          </div>
          <button className="btn btn-success" onClick={() => onAdd(tour)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
