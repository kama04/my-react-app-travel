import React, { useContext, useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import { CartContext } from "../contexts/CartContext.jsx";
import Cards from "react-credit-cards-2";
import { toast } from "react-toastify";

export default function CartPage() {
  const { items, inc, dec, removeFromCart, clear, total } = useContext(CartContext);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const canPay = useMemo(() => {
    if (items.length === 0) return false;
    // Super simple validation check
    return card.number.length >= 12 && card.name && card.expiry.length >= 4 && card.cvc.length >= 3;
  }, [items.length, card]);

  const onPay = (e) => {
    e.preventDefault();
    if (!items.length) {
      toast.warning("Cart is empty — choose a tour on the home page.");
      return;
    }
    if (!canPay) {
      toast.error("Fill in card details (educational form).");
      return;
    }

    toast.success("Payment successful! (demo)");
    clear();

    // Clear form
    setCard({ number: "", name: "", expiry: "", cvc: "", focus: "" });
  };

  return (
    <>
      <Header />

      <div className="container py-4">
        <h2 className="fw-bold mb-3">Cart</h2>

        <div className="row g-3">
          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                {items.length === 0 ? (
                  <div className="alert alert-warning mb-0">
                    Cart is empty. Add a tour on the home page.
                  </div>
                ) : (
                  <>
                    {items.map((x) => (
                      <div
                        key={x.id}
                        className="d-flex align-items-center justify-content-between border-bottom py-3"
                      >
                        <div>
                          <div className="fw-semibold">{x.title}</div>
                          <div className="text-muted small">
                            €{x.price} / person
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => dec(x.id)}>
                            -
                          </button>
                          <span className="fw-semibold" style={{ width: 24, textAlign: "center" }}>
                            {x.qty}
                          </span>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => inc(x.id)}>
                            +
                          </button>

                          <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(x.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="d-flex justify-content-between align-items-center pt-3">
                      <button className="btn btn-outline-danger" onClick={() => { clear(); toast.warning("Cart cleared."); }}>
                        Clear
                      </button>
                      <div className="fs-4 fw-bold">Total: €{total}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Payment (react-credit-cards-2)</h5>

                <div className="mb-3">
                  <Cards
                    number={card.number}
                    name={card.name}
                    expiry={card.expiry}
                    cvc={card.cvc}
                    focused={card.focus}
                  />
                </div>

                <form onSubmit={onPay}>
                  <div className="mb-2">
                    <label className="form-label">Card Number</label>
                    <input
                      className="form-control"
                      value={card.number}
                      onChange={(e) => setCard((p) => ({ ...p, number: e.target.value.replace(/\D/g, "") }))}
                      onFocus={() => setCard((p) => ({ ...p, focus: "number" }))}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      value={card.name}
                      onChange={(e) => setCard((p) => ({ ...p, name: e.target.value }))}
                      onFocus={() => setCard((p) => ({ ...p, focus: "name" }))}
                      placeholder="JOHN DOE"
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Expiry</label>
                      <input
                        className="form-control"
                        value={card.expiry}
                        onChange={(e) => setCard((p) => ({ ...p, expiry: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                        onFocus={() => setCard((p) => ({ ...p, focus: "expiry" }))}
                        placeholder="MMYY"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">CVC</label>
                      <input
                        className="form-control"
                        value={card.cvc}
                        onChange={(e) => setCard((p) => ({ ...p, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                        onFocus={() => setCard((p) => ({ ...p, focus: "cvc" }))}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary w-100 mt-3" disabled={!canPay}>
                    Pay €{total}
                  </button>

                  <div className="small text-muted mt-2">
                    This is an educational payment: nothing is actually charged.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
