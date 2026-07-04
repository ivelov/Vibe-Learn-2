import { NDAFormData } from '@/lib/types';
import { formatDateForDisplay } from '@/lib/generate-nda';

interface Props {
  data: NDAFormData;
}

export function NDADocument({ data }: Props) {
  const mndaTerm =
    data.mndaTermType === 'expires'
      ? `${data.mndaTermYears} year(s) from Effective Date`
      : 'Continues until terminated';

  const confidentialityTerm =
    data.confidentialityTermType === 'years'
      ? `${data.confidentialityTermYears} year(s) from Effective Date (trade secrets protected until no longer a trade secret under applicable law)`
      : 'In perpetuity';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 md:p-12 font-serif text-sm leading-relaxed">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-2 font-sans">
        Mutual Non-Disclosure Agreement
      </h1>

      {/* Preamble */}
      <section className="mt-6 mb-8">
        <h2 className="text-sm font-bold font-sans uppercase tracking-wide text-gray-600 mb-3">
          Using This Mutual Non-Disclosure Agreement
        </h2>
        <p className="text-gray-700">
          This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists of: (1) this Cover
          Page (&ldquo;<strong>Cover Page</strong>&rdquo;) and (2) the Common Paper Mutual NDA
          Standard Terms Version 1.0 (&ldquo;<strong>Standard Terms</strong>&rdquo;) identical to
          those posted at{' '}
          <a
            href="https://commonpaper.com/standards/mutual-nda/1.0"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            commonpaper.com/standards/mutual-nda/1.0
          </a>
          . Any modifications of the Standard Terms should be made on the Cover Page, which will
          control over conflicts with the Standard Terms.
        </p>
      </section>

      {/* Cover Page Fields */}
      <div className="space-y-6 mb-8">
        <CoverField label="Purpose" hint="How Confidential Information may be used">
          <p className="text-gray-800">{data.purpose}</p>
        </CoverField>

        <CoverField label="Effective Date">
          <p className="text-gray-800">{formatDateForDisplay(data.effectiveDate)}</p>
        </CoverField>

        <CoverField label="MNDA Term" hint="The length of this MNDA">
          <p className="text-gray-800">{mndaTerm}</p>
        </CoverField>

        <CoverField label="Term of Confidentiality" hint="How long Confidential Information is protected">
          <p className="text-gray-800">{confidentialityTerm}</p>
        </CoverField>

        <CoverField label="Governing Law &amp; Jurisdiction">
          <p className="text-gray-800">
            <span className="font-medium">Governing Law:</span> {data.governingLaw}
          </p>
          <p className="text-gray-800 mt-1">
            <span className="font-medium">Jurisdiction:</span> {data.jurisdiction}
          </p>
        </CoverField>

        <CoverField label="MNDA Modifications">
          <p className="text-gray-800 whitespace-pre-wrap">{data.modifications || 'None'}</p>
        </CoverField>
      </div>

      {/* Signing block */}
      <p className="text-gray-700 mb-4">
        By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective
        Date.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left font-medium w-1/4"></th>
              <th className="border border-gray-300 px-3 py-2 text-center font-medium">Party 1</th>
              <th className="border border-gray-300 px-3 py-2 text-center font-medium">Party 2</th>
            </tr>
          </thead>
          <tbody>
            <SigningRow label="Signature" p1="" p2="" isSignature />
            <SigningRow label="Print Name" p1={data.party1SignerName} p2={data.party2SignerName} />
            <SigningRow label="Title" p1={data.party1Title} p2={data.party2Title} />
            <SigningRow label="Company" p1={data.party1Company} p2={data.party2Company} />
            <SigningRow label="Notice Address" p1={data.party1NoticeAddress} p2={data.party2NoticeAddress} />
            <SigningRow label="Date" p1="" p2="" />
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mb-10">
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0
        </a>
        .
      </p>

      {/* Divider */}
      <hr className="border-gray-300 mb-10" />

      {/* Standard Terms */}
      <h2 className="text-lg font-bold font-sans mb-6">Standard Terms</h2>

      <ol className="space-y-5 list-none pl-0">
        <StandardTerm number={1} heading="Introduction">
          This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover
          Page (defined below)) (&ldquo;<strong>MNDA</strong>&rdquo;) allows each party (&ldquo;
          <strong>Disclosing Party</strong>&rdquo;) to disclose or make available information in
          connection with the <em>Purpose</em> which (1) the Disclosing Party identifies to the
          receiving party (&ldquo;<strong>Receiving Party</strong>&rdquo;) as &ldquo;confidential&rdquo;,
          &ldquo;proprietary&rdquo;, or the like or (2) should be reasonably understood as
          confidential or proprietary due to its nature and the circumstances of its disclosure
          (&ldquo;<strong>Confidential Information</strong>&rdquo;). Each party&rsquo;s Confidential
          Information also includes the existence and status of the parties&rsquo; discussions and
          information on the Cover Page. Confidential Information includes technical or business
          information, product designs or roadmaps, requirements, pricing, security and compliance
          documentation, technology, inventions and know-how. To use this MNDA, the parties must
          complete and sign a cover page incorporating these Standard Terms (&ldquo;
          <strong>Cover Page</strong>&rdquo;). Each party is identified on the Cover Page and
          capitalized terms have the meanings given herein or on the Cover Page.
        </StandardTerm>

        <StandardTerm number={2} heading="Use and Protection of Confidential Information">
          The Receiving Party shall: (a) use Confidential Information solely for the{' '}
          <em>Purpose</em>; (b) not disclose Confidential Information to third parties without the
          Disclosing Party&rsquo;s prior written approval, except that the Receiving Party may
          disclose Confidential Information to its employees, agents, advisors, contractors and other
          representatives having a reasonable need to know for the <em>Purpose</em>, provided these
          representatives are bound by confidentiality obligations no less protective of the
          Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains
          responsible for their compliance with this MNDA; and (c) protect Confidential Information
          using at least the same protections the Receiving Party uses for its own similar
          information but no less than a reasonable standard of care.
        </StandardTerm>

        <StandardTerm number={3} heading="Exceptions">
          The Receiving Party&rsquo;s obligations in this MNDA do not apply to information that it
          can demonstrate: (a) is or becomes publicly available through no fault of the Receiving
          Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party
          without confidentiality restrictions; (c) it rightfully obtained from a third party without
          confidentiality restrictions; or (d) it independently developed without using or
          referencing the Confidential Information.
        </StandardTerm>

        <StandardTerm number={4} heading="Disclosures Required by Law">
          The Receiving Party may disclose Confidential Information to the extent required by law,
          regulation or regulatory authority, subpoena or court order, provided (to the extent
          legally permitted) it provides the Disclosing Party reasonable advance notice of the
          required disclosure and reasonably cooperates, at the Disclosing Party&rsquo;s expense,
          with the Disclosing Party&rsquo;s efforts to obtain confidential treatment for the
          Confidential Information.
        </StandardTerm>

        <StandardTerm number={5} heading="Term and Termination">
          This MNDA commences on the <em>Effective Date</em> and expires at the end of the{' '}
          <em>MNDA Term</em>. Either party may terminate this MNDA for any or no reason upon written
          notice to the other party. The Receiving Party&rsquo;s obligations relating to Confidential
          Information will survive for the <em>Term of Confidentiality</em>, despite any expiration
          or termination of this MNDA.
        </StandardTerm>

        <StandardTerm number={6} heading="Return or Destruction of Confidential Information">
          Upon expiration or termination of this MNDA or upon the Disclosing Party&rsquo;s earlier
          request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly
          after the Disclosing Party&rsquo;s written request, destroy all Confidential Information in
          the Receiving Party&rsquo;s possession or control or return it to the Disclosing Party; and
          (c) if requested by the Disclosing Party, confirm its compliance with these obligations in
          writing. As an exception to subsection (b), the Receiving Party may retain Confidential
          Information in accordance with its standard backup or record retention policies or as
          required by law, but the terms of this MNDA will continue to apply to the retained
          Confidential Information.
        </StandardTerm>

        <StandardTerm number={7} heading="Proprietary Rights">
          The Disclosing Party retains all of its intellectual property and other rights in its
          Confidential Information and its disclosure to the Receiving Party grants no license under
          such rights.
        </StandardTerm>

        <StandardTerm number={8} heading="Disclaimer">
          ALL CONFIDENTIAL INFORMATION IS PROVIDED &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT
          WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A
          PARTICULAR PURPOSE.
        </StandardTerm>

        <StandardTerm number={9} heading="Governing Law and Jurisdiction">
          This MNDA and all matters relating hereto are governed by, and construed in accordance
          with, the laws of the State of <em>Governing Law</em>, without regard to the conflict of
          laws provisions of such <em>Governing Law</em>. Any legal suit, action, or proceeding
          relating to this MNDA must be instituted in the federal or state courts located in{' '}
          <em>Jurisdiction</em>. Each party irrevocably submits to the exclusive jurisdiction of such{' '}
          <em>Jurisdiction</em> in any such suit, action, or proceeding.
        </StandardTerm>

        <StandardTerm number={10} heading="Equitable Relief">
          A breach of this MNDA may cause irreparable harm for which monetary damages are an
          insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek
          appropriate equitable relief, including an injunction, in addition to its other remedies.
        </StandardTerm>

        <StandardTerm number={11} heading="General">
          Neither party has an obligation under this MNDA to disclose Confidential Information to the
          other or proceed with any proposed transaction. Neither party may assign this MNDA without
          the prior written consent of the other party, except that either party may assign this MNDA
          in connection with a merger, reorganization, acquisition or other transfer of all or
          substantially all its assets or voting securities. Any assignment in violation of this
          Section is null and void. This MNDA will bind and inure to the benefit of each
          party&rsquo;s permitted successors and assigns. Waivers must be signed by the waiving
          party&rsquo;s authorized representative and cannot be implied from conduct. If any
          provision of this MNDA is held unenforceable, it will be limited to the minimum extent
          necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page)
          constitutes the entire agreement of the parties with respect to its subject matter, and
          supersedes all prior and contemporaneous understandings, agreements, representations, and
          warranties, whether written or oral, regarding such subject matter. This MNDA may only be
          amended, modified, waived, or supplemented by an agreement in writing signed by both
          parties. Notices, requests and approvals under this MNDA must be sent in writing to the
          email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA
          may be executed in counterparts, including electronic copies, each of which is deemed an
          original and which together form the same agreement.
        </StandardTerm>
      </ol>

      <p className="text-xs text-gray-500 mt-8">
        Common Paper Mutual Non-Disclosure Agreement{' '}
        <a
          href="https://commonpaper.com/standards/mutual-nda/1.0/"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Version 1.0
        </a>{' '}
        free to use under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0
        </a>
        .
      </p>
    </div>
  );
}

function CoverField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-gray-200 pl-4">
      <p className="text-xs font-bold font-sans uppercase tracking-wide text-gray-500 mb-0.5">
        {label}
      </p>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  );
}

function SigningRow({
  label,
  p1,
  p2,
  isSignature,
}: {
  label: string;
  p1: string;
  p2: string;
  isSignature?: boolean;
}) {
  const cellClass = 'border border-gray-300 px-3 py-2 text-center';
  const height = isSignature ? 'h-14' : 'h-8';
  return (
    <tr>
      <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">{label}</td>
      <td className={`${cellClass} ${height}`}>{p1}</td>
      <td className={`${cellClass} ${height}`}>{p2}</td>
    </tr>
  );
}

function StandardTerm({
  number,
  heading,
  children,
}: {
  number: number;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="font-bold shrink-0 font-sans">{number}.</span>
      <p className="text-gray-800">
        <strong>{heading}.</strong> {children}
      </p>
    </li>
  );
}
