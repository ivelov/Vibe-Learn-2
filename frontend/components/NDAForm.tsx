'use client';

import { useState } from 'react';
import { NDAFormData } from '@/lib/types';

const DEFAULT_PURPOSE =
  'Evaluating whether to enter into a business relationship with the other party.';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

const INITIAL: NDAFormData = {
  party1Company: '',
  party1SignerName: '',
  party1Title: '',
  party1NoticeAddress: '',
  party2Company: '',
  party2SignerName: '',
  party2Title: '',
  party2NoticeAddress: '',
  purpose: DEFAULT_PURPOSE,
  effectiveDate: today(),
  mndaTermType: 'expires',
  mndaTermYears: 1,
  confidentialityTermType: 'years',
  confidentialityTermYears: 1,
  governingLaw: '',
  jurisdiction: '',
  modifications: '',
};

interface Props {
  onSubmit: (data: NDAFormData) => void;
}

export function NDAForm({ onSubmit }: Props) {
  const [form, setForm] = useState<NDAFormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof NDAFormData, string>>>({});

  function set<K extends keyof NDAFormData>(key: K, value: NDAFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const required: (keyof NDAFormData)[] = [
      'party1Company',
      'party1SignerName',
      'party1Title',
      'party1NoticeAddress',
      'party2Company',
      'party2SignerName',
      'party2Title',
      'party2NoticeAddress',
      'purpose',
      'effectiveDate',
      'governingLaw',
      'jurisdiction',
    ];
    const next: Partial<Record<keyof NDAFormData, string>> = {};
    for (const field of required) {
      if (!String(form[field]).trim()) {
        next[field] = 'This field is required.';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* Party Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Party Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PartyFields
            label="Party 1"
            prefix="party1"
            form={form}
            errors={errors}
            set={set}
          />
          <PartyFields
            label="Party 2"
            prefix="party2"
            form={form}
            errors={errors}
            set={set}
          />
        </div>
      </section>

      {/* Agreement Terms */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Agreement Terms
        </h2>
        <div className="space-y-6">
          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose <span className="text-gray-400 font-normal">(how Confidential Information may be used)</span>
            </label>
            <textarea
              rows={3}
              value={form.purpose}
              onChange={(e) => set('purpose', e.target.value)}
              className={fieldClass(!!errors.purpose)}
            />
            {errors.purpose && <FieldError msg={errors.purpose} />}
          </div>

          {/* Effective Date */}
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Effective Date
            </label>
            <input
              type="date"
              value={form.effectiveDate}
              onChange={(e) => set('effectiveDate', e.target.value)}
              className={fieldClass(!!errors.effectiveDate)}
            />
            {errors.effectiveDate && <FieldError msg={errors.effectiveDate} />}
          </div>

          {/* MNDA Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MNDA Term <span className="text-gray-400 font-normal">(length of this agreement)</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={form.mndaTermType === 'expires'}
                  onChange={() => set('mndaTermType', 'expires')}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">Expires after</span>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={form.mndaTermYears}
                  onChange={(e) => set('mndaTermYears', Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={form.mndaTermType !== 'expires'}
                  className="w-16 text-sm border border-gray-300 rounded px-2 py-1 disabled:opacity-40"
                />
                <span className="text-sm text-gray-700">year(s) from Effective Date</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={form.mndaTermType === 'until_terminated'}
                  onChange={() => set('mndaTermType', 'until_terminated')}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Continues until terminated in accordance with the terms of the MNDA
                </span>
              </label>
            </div>
          </div>

          {/* Term of Confidentiality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Term of Confidentiality <span className="text-gray-400 font-normal">(how long information is protected)</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={form.confidentialityTermType === 'years'}
                  onChange={() => set('confidentialityTermType', 'years')}
                  className="text-blue-600"
                />
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={form.confidentialityTermYears}
                  onChange={(e) =>
                    set('confidentialityTermYears', Math.max(1, parseInt(e.target.value) || 1))
                  }
                  disabled={form.confidentialityTermType !== 'years'}
                  className="w-16 text-sm border border-gray-300 rounded px-2 py-1 disabled:opacity-40"
                />
                <span className="text-sm text-gray-700">
                  year(s) from Effective Date (trade secrets protected until no longer a trade secret)
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={form.confidentialityTermType === 'perpetuity'}
                  onChange={() => set('confidentialityTermType', 'perpetuity')}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">In perpetuity</span>
              </label>
            </div>
          </div>

          {/* Governing Law */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Governing Law <span className="text-gray-400 font-normal">(state)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. California"
                value={form.governingLaw}
                onChange={(e) => set('governingLaw', e.target.value)}
                className={fieldClass(!!errors.governingLaw)}
              />
              {errors.governingLaw && <FieldError msg={errors.governingLaw} />}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jurisdiction
              </label>
              <input
                type="text"
                placeholder="e.g. courts located in San Francisco, CA"
                value={form.jurisdiction}
                onChange={(e) => set('jurisdiction', e.target.value)}
                className={fieldClass(!!errors.jurisdiction)}
              />
              {errors.jurisdiction && <FieldError msg={errors.jurisdiction} />}
            </div>
          </div>

          {/* Modifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MNDA Modifications{' '}
              <span className="text-gray-400 font-normal">(optional — list any modifications to the standard terms)</span>
            </label>
            <textarea
              rows={3}
              placeholder="None"
              value={form.modifications}
              onChange={(e) => set('modifications', e.target.value)}
              className={fieldClass(false)}
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Generate NDA →
      </button>
    </form>
  );
}

interface PartyFieldsProps {
  label: string;
  prefix: 'party1' | 'party2';
  form: NDAFormData;
  errors: Partial<Record<keyof NDAFormData, string>>;
  set: <K extends keyof NDAFormData>(key: K, value: NDAFormData[K]) => void;
}

function PartyFields({ label, prefix, form, errors, set }: PartyFieldsProps) {
  const companyKey = `${prefix}Company` as keyof NDAFormData;
  const nameKey = `${prefix}SignerName` as keyof NDAFormData;
  const titleKey = `${prefix}Title` as keyof NDAFormData;
  const addressKey = `${prefix}NoticeAddress` as keyof NDAFormData;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      <h3 className="font-medium text-gray-800">{label}</h3>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Company Name</label>
        <input
          type="text"
          value={form[companyKey] as string}
          onChange={(e) => set(companyKey, e.target.value as NDAFormData[typeof companyKey])}
          className={fieldClass(!!errors[companyKey])}
        />
        {errors[companyKey] && <FieldError msg={errors[companyKey]!} />}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Signer Name</label>
        <input
          type="text"
          value={form[nameKey] as string}
          onChange={(e) => set(nameKey, e.target.value as NDAFormData[typeof nameKey])}
          className={fieldClass(!!errors[nameKey])}
        />
        {errors[nameKey] && <FieldError msg={errors[nameKey]!} />}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
        <input
          type="text"
          value={form[titleKey] as string}
          onChange={(e) => set(titleKey, e.target.value as NDAFormData[typeof titleKey])}
          className={fieldClass(!!errors[titleKey])}
        />
        {errors[titleKey] && <FieldError msg={errors[titleKey]!} />}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Notice Address <span className="text-gray-400">(email or postal)</span>
        </label>
        <input
          type="text"
          value={form[addressKey] as string}
          onChange={(e) => set(addressKey, e.target.value as NDAFormData[typeof addressKey])}
          className={fieldClass(!!errors[addressKey])}
        />
        {errors[addressKey] && <FieldError msg={errors[addressKey]!} />}
      </div>
    </div>
  );
}

function fieldClass(hasError: boolean) {
  return [
    'w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white',
  ].join(' ');
}

function FieldError({ msg }: { msg: string }) {
  return <p className="text-xs text-red-600 mt-1">{msg}</p>;
}
