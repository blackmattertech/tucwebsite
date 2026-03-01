import React, { useState, useEffect } from 'react';
import { useContactModal } from '../context/ContactModalContext';
import { submitContactForm } from '../lib/contactSubmission';
import './ContactModal.css';

const REFERRAL_OPTIONS = [
  'Recommendation',
  'Google search',
  'Social media',
  'Referral',
  'Trade show',
  'Other',
];

const INTEREST_OPTIONS = [
  'Private Label Apparel',
  'Custom Manufacturing',
  'Bulk Orders',
  'Merchandise',
  'Uniforms / Workwear',
];

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const [referral, setReferral] = useState('');
  const [interest, setInterest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!interest) {
      alert('Please select what you are interested in.');
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      company_activity: (form.elements.namedItem('activity') as HTMLInputElement).value.trim(),
      referral,
      interest,
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      project_details: (form.elements.namedItem('details') as HTMLTextAreaElement).value.trim(),
    };
    try {
      await submitContactForm(payload);
      alert('Thank you for your enquiry! We will get back to you soon.');
      closeModal();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="contact-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="contact-modal-panel">
        <button
          type="button"
          className="contact-modal-close"
          onClick={closeModal}
          aria-label="Close"
        >
          ×
        </button>

        <h2 id="contact-modal-title" className="contact-modal-title">
          Let's work together on your apparel project!
        </h2>

        <form onSubmit={handleSubmit} className="contact-modal-form">
          <div className="contact-modal-field">
            <label className="contact-modal-label">
              Hello! My name is{' '}
              <input
                type="text"
                name="name"
                placeholder="Enter your name*"
                required
                className="contact-modal-input-underline"
              />
            </label>
          </div>

          <div className="contact-modal-field">
            <label className="contact-modal-label">
              and I work in{' '}
              <input
                type="text"
                name="activity"
                placeholder="Enter your company / business type*"
                required
                className="contact-modal-input-underline"
              />
            </label>
          </div>

          <div className="contact-modal-field">
            <span className="contact-modal-label-block">I came to you through</span>
            <div className="contact-modal-radio-group" role="group" aria-label="Referral source">
              {REFERRAL_OPTIONS.map((opt) => (
                <label key={opt} className="contact-modal-radio">
                  <input
                    type="radio"
                    name="referral"
                    value={opt}
                    checked={referral === opt}
                    onChange={() => setReferral(opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="contact-modal-field">
            <span className="contact-modal-label-block">I am interested in</span>
            <div className="contact-modal-pills" role="group" aria-label="Interest">
              {INTEREST_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`contact-modal-pill ${interest === opt ? 'contact-modal-pill--active' : ''}`}
                  onClick={() => setInterest(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <input type="hidden" name="interest" value={interest} />
          </div>

          <div className="contact-modal-field">
            <label className="contact-modal-label">
              You can contact me by email.{' '}
              <input
                type="email"
                name="email"
                placeholder="Enter your email address*"
                required
                className="contact-modal-input-underline"
              />
            </label>
          </div>

          <div className="contact-modal-field">
            <label className="contact-modal-label">
              or by phone{' '}
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number*"
                required
                className="contact-modal-input-underline"
              />
            </label>
          </div>

          <div className="contact-modal-field">
            <span className="contact-modal-label-block">
              I would like to provide more information about the project:
            </span>
            <textarea
              name="details"
              placeholder="Enter project details*"
              required
              rows={5}
              className="contact-modal-textarea"
            />
          </div>

          {submitError && (
            <p className="contact-modal-error" role="alert">
              {submitError}
            </p>
          )}
          <div className="contact-modal-footer">
            <button
              type="submit"
              className="contact-modal-submit"
              disabled={submitting}
            >
              {submitting ? 'Sending…' : 'Send request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
