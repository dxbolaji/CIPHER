import React from 'react';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputField from './Inputfield';
import PillToggle from './Pilltoggle';
import Button from './Button';
import Card from './Card';
import './BPInputForm.css';

const SALT_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
];

const STRESS_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'high', label: 'High' },
];

const EXERCISE_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export default function BPInputForm({ onSubmit, isLoading = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    systolic: '',
    diastolic: '',
    pulse: '',
    salt: '',
    stress: '',
    exercise: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.systolic || form.systolic < 50 || form.systolic > 300)
      e.systolic = 'Enter a valid reading (50–300)';
    if (!form.diastolic || form.diastolic < 30 || form.diastolic > 200)
      e.diastolic = 'Enter a valid reading (30–200)';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSubmit?.(form);
  };

  const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bp-form-page">
      <div className="bp-form-page__inner">
        {/* Header */}
        <div className="bp-form-page__header">
          <button
            className="bp-form-page__back"
            onClick={() => navigate('/')}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="bp-form-page__title">Log New Reading</h1>
        </div>

        <Card>
          {/* BP Inputs */}
          <div className="bp-form__readings">
            <InputField
              label="Systolic"
              id="systolic"
              type="number"
              inputMode="numeric"
              placeholder="120"
              unit="mmHg"
              min={50}
              max={300}
              value={form.systolic}
              onChange={(e) => setForm({ ...form, systolic: e.target.value })}
              error={errors.systolic}
            />
            <InputField
              label="Diastolic"
              id="diastolic"
              type="number"
              inputMode="numeric"
              placeholder="80"
              unit="mmHg"
              min={30}
              max={200}
              value={form.diastolic}
              onChange={(e) => setForm({ ...form, diastolic: e.target.value })}
              error={errors.diastolic}
            />
          </div>

          <InputField
            label="Pulse"
            id="pulse"
            type="number"
            inputMode="numeric"
            placeholder="72"
            unit="bpm"
            min={30}
            max={220}
            optional
            value={form.pulse}
            onChange={(e) => setForm({ ...form, pulse: e.target.value })}
          />

          <div className="bp-form__divider" />

          {/* Lifestyle */}
          <div className="bp-form__lifestyle">
            <p className="bp-form__lifestyle-title">How's your day been?</p>

            <PillToggle
              label="Salt intake today"
              options={SALT_OPTIONS}
              value={form.salt}
              onChange={set('salt')}
            />
            <PillToggle
              label="Stress level"
              options={STRESS_OPTIONS}
              value={form.stress}
              onChange={set('stress')}
            />
            <PillToggle
              label="Did you exercise?"
              options={EXERCISE_OPTIONS}
              value={form.exercise}
              onChange={set('exercise')}
            />
          </div>
        </Card>

        <div className="bp-form__actions">
          <Button
            fullWidth
            size="lg"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Analyse My Reading
          </Button>
          <Button
            fullWidth
            variant="ghost"
            size="md"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}