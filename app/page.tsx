"use client";

import { useState, useEffect } from "react";
import "./globals.css";

export default function BettingForm() {
  const [showModal, setShowModal] = useState(false);

  const submitted = true;
  const selectedColor = "Red";
  const selectedNumber = 5;
  const amount = 100;
  const winningColor = "Green";
  const winningNumber = 3;
  const reward = 0;

  useEffect(() => {
    if (submitted) {
      setShowModal(true);
    }
  }, [submitted]);

  return (
    <div className="main-wrapper">
      <div className="form-section">
        <h3>📝 Place Your Bet</h3>
        <form method="POST">
          <p><strong>Select a Color:</strong></p>
          <div className="option-group">
            {["Red", "Green", "Violet"].map((color) => (
              <label key={color}>
                <input type="radio" name="color" value={color} hidden required />
                <div className="option-button color-box" style={{ backgroundColor: color.toLowerCase() }}>
                  {color}
                </div>
              </label>
            ))}
          </div>

          <p><strong>Select a Number (0–9):</strong></p>
          <div className="number-grid">
            {Array.from({ length: 10 }, (_, i) => (
              <label key={i}>
                <input type="radio" name="number" value={i} hidden required />
                <div className="option-button number-box">{i}</div>
              </label>
            ))}
          </div>

          <p><strong>Select Amount:</strong></p>
          <div className="option-group">
            {[10, 100, 1000].map((amt) => (
              <label key={amt}>
                <input type="radio" name="amount" value={amt} hidden />
                <div className="option-button amount-box">₹{amt}</div>
              </label>
            ))}
            <input
              type="number"
              name="amount"
              placeholder="Other"
              min={10}
              max={1000}
              style={{ width: 100, height: 48, padding: 6, border: "2px solid #ccc", borderRadius: 6 }}
            />
          </div>

          <button type="submit">Submit Bet</button>
        </form>
      </div>

      <div className="container">
        <h3>🎮 Game Rules & Logic</h3>
        <ul>
          <li><strong>Colors:</strong> Red, Green, Violet</li>
          <li><strong>Color bet:</strong> 2x rewards</li>
          <li><strong>Number bet:</strong> 5x rewards</li>
          <li><strong>Amount Range:</strong> ₹10 - ₹1000</li>
        </ul>
      </div>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <h3>🎉 Result</h3>
            <p><strong>Your Bet:</strong></p>
            <p>Color: {selectedColor}</p>
            <p>Number: {selectedNumber}</p>
            <p>Amount: ₹{amount}</p>
            <hr />
            <p><strong>Winning Outcome:</strong></p>
            <p>Winning Color: {winningColor}</p>
            <p>Winning Number: {winningNumber}</p>
            <p><strong>Total Reward: ₹{reward}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
