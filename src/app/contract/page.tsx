'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContractPage() {
  const [agreed, setAgreed] = useState(false);

  const handleSignContract = () => {
    if (!agreed) return alert('You must agree to the terms to proceed.');
    alert('Contract signed successfully! Redirecting to dashboard...');
    // Add your routing or API call here
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/projects">Thinkshare</Link></li>
            <li>Contract</li>
          </ul>
        </div>

        {/* Contract Container */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-8 sm:p-12">
            
            {/* Header */}
            <div className="text-center pb-8 border-b border-base-200">
              <h1 className="text-3xl font-bold text-primary">Thinkshare Project Agreement</h1>
              <p className="text-sm text-base-content/60 mt-2">
                Effective Date: July 15, 2026
              </p>
            </div>

            {/* Content Sections */}
            <div className="py-6 space-y-6 text-base-content/80 leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-base-content mb-2">1. Introduction</h2>
                <p>
                  This Project Agreement (the "Agreement") constitutes a binding legal agreement between 
                  <strong> Thinkshare</strong> ("Company") and the undersigned party ("Client" or "You"). 
                  By accepting these terms, you agree to the scope, deliverables, and payment terms for your project.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-base-content mb-2">2. Scope of Work</h2>
                <p>
                  Thinkshare agrees to provide development and strategic consulting services as outlined in the 
                  mutually agreed-upon project brief. Any modifications to this scope must be submitted in writing 
                  and may result in additional charges.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-base-content mb-2">3. Payment Terms</h2>
                <p>
                  The Client agrees to pay the total project fee in accordance with the milestones established 
                  prior to project initiation. Failure to meet payment deadlines may result in the suspension of services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-base-content mb-2">4. Confidentiality</h2>
                <p>
                  Both parties agree to protect and keep confidential any proprietary or sensitive information 
                  exchanged during the duration of the Thinkshare project.
                </p>
              </div>
            </div>

            {/* Signature & Agreement Section */}
            <div className="mt-8 pt-6 border-t border-base-200">
              <div className="form-control mb-6">
                <label className="label cursor-pointer justify-start gap-4">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="checkbox checkbox-primary" 
                  />
                  <span className="label-text text-base">
                    I have read, understood, and agree to the Thinkshare Project Agreement terms.
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
                <Link href="/" className="btn btn-ghost w-full sm:w-auto">
                  Decline
                </Link>
                <button 
                  onClick={handleSignContract}
                  disabled={!agreed}
                  className={`btn btn-primary w-full sm:w-auto ${agreed ? '' : 'btn-disabled'}`}
                >
                  Sign and Accept Contract
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
