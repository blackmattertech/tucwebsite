import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { submitContactForm } from '../lib/contactSubmission';
import './ContactModal.css';

const CATALOGUE_PDF = '/tshirt%20manufacturing%20hoodies%20manufacturing%20catalogue.pdf';

type CatalogueSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CatalogueSidebar({ isOpen, onClose }: CatalogueSidebarProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    try {
      document.body.style.overflow = 'hidden';
    } catch {}
    return () => {
      try {
        document.body.style.overflow = '';
      } catch {}
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;

    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value.trim() ?? '';

    const payload = {
      name: get('name'),
      company_activity: get('company'),
      referral: '',
      interest: 'Catalogue download',
      email: get('email'),
      phone: get('phone'),
      project_details: '',
      source: 'catalogue_form',
    };

    try {
      await submitContactForm(payload);
      // trigger PDF download
      const a = document.createElement('a');
      a.href = CATALOGUE_PDF;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const overlay = (
    <div
      className="contact-modal-overlay catalogue-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-sidebar-title"
    >
      <div ref={panelRef} className="contact-modal-panel catalogue-sidebar-panel">
        <button
          type="button"
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 id="catalogue-sidebar-title" className="contact-modal-title">
          Download the product catalogue
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
                name="company"
                placeholder="Enter your company / business type*"
                required
                className="contact-modal-input-underline"
              />
            </label>
          </div>

          <div className="contact-modal-field">
            <label className="contact-modal-label">
              You can contact me by email{' '}
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

          {error && (
            <p className="contact-modal-error" role="alert">
              {error}
            </p>
          )}

          <div className="contact-modal-footer">
            <button
              type="submit"
              className="contact-modal-submit catalogue-submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting…' : 'Download catalogue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

