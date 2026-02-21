import React from 'react';
import { useState } from 'react';
import { Activity } from 'lucide-react';
import Button from '../components/Button';
import './Onboarding.css';

const CONDITIONS = [
  'Diabetes',
  'High Cholesterol',
  'Heart Disease',
  'Kidney Disease',
  'Obesity',
];

export default function Onboarding({ onComplete }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: '',
    conditions: [],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.age || form.age < 1 || form.age > 120) e.age = 'Enter a valid age';
    if (!form.sex) e.sex = 'Please select a biological sex';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onComplete(form);
  };

  const toggleCondition = (c) => {
    setForm((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(c)
        ? prev.conditions.filter((x) => x !== c)
        : [...prev.conditions, c],
    }));
  };

  return (
    <div className="onboarding">
      <div className="onboarding__inner">
        {/* Brand */}
        <div className="onboarding__brand">
          <div className="onboarding__icon">
            <Activity size={24} strokeWidth={2.5} />
          </div>
          <h1 className="onboarding__title">CIPHER</h1>
          <p className="onboarding__tagline">
            Your cardiovascular health partner
          </p>
        </div>

        {/* Form */}
        <div className="onboarding__card">
          <div className="onboarding__form-group">
            <label className="onboarding__label" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              className={`onboarding__input ${errors.name ? 'onboarding__input--error' : ''}`}
              type="text"
              placeholder="Ada Okonkwo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoFocus
            />
            {errors.name && (
              <span className="onboarding__error">{errors.name}</span>
            )}
          </div>

          <div className="onboarding__row">
            <div className="onboarding__form-group">
              <label className="onboarding__label" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                className={`onboarding__input ${errors.age ? 'onboarding__input--error' : ''}`}
                type="number"
                placeholder="34"
                inputMode="numeric"
                min="1"
                max="120"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              {errors.age && (
                <span className="onboarding__error">{errors.age}</span>
              )}
            </div>

            <div className="onboarding__form-group">
              <label className="onboarding__label">Biological Sex</label>
              <div className="onboarding__sex-group">
                {['Male', 'Female'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`onboarding__sex-btn ${
                      form.sex === s ? 'onboarding__sex-btn--active' : ''
                    }`}
                    onClick={() => setForm({ ...form, sex: s })}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {errors.sex && (
                <span className="onboarding__error">{errors.sex}</span>
              )}
            </div>
          </div>

          <div className="onboarding__form-group">
            <label className="onboarding__label">
              Existing Conditions
              <span className="onboarding__optional">optional</span>
            </label>
            <div className="onboarding__conditions">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`onboarding__condition-pill ${
                    form.conditions.includes(c)
                      ? 'onboarding__condition-pill--active'
                      : ''
                  }`}
                  onClick={() => toggleCondition(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button fullWidth size="lg" onClick={handleSubmit}>
          Begin Tracking
        </Button>

        <p className="onboarding__privacy">
          Your data stays on your device
        </p>
      </div>
    </div>
  );
}