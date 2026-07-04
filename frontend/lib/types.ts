export interface NDAFormData {
  // Party 1
  party1Company: string;
  party1SignerName: string;
  party1Title: string;
  party1NoticeAddress: string;

  // Party 2
  party2Company: string;
  party2SignerName: string;
  party2Title: string;
  party2NoticeAddress: string;

  // Agreement terms
  purpose: string;
  effectiveDate: string; // YYYY-MM-DD
  mndaTermType: 'expires' | 'until_terminated';
  mndaTermYears: number;
  confidentialityTermType: 'years' | 'perpetuity';
  confidentialityTermYears: number;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
}
