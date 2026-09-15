import React from 'react';
import ContributionActivity from './ContributionActivity';

export default function ContributionActivityShowcase() {
  return (
    <div className="w-full min-h-[560px] bg-[#FAF6ED] rounded-2xl p-4 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background blur rings */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-violet-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-fuchsia-200/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full flex items-center justify-center">
        <ContributionActivity />
      </div>
    </div>
  );
}

ContributionActivityShowcase.customSlug = 'contribution-activity';
