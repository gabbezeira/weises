import React, { Suspense, lazy } from 'react';

const FinancialDashboardImpl = lazy(() => import('./FinancialDashboardImpl'));

const LoadingPlaceholder = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 400,
      color: 'var(--color-gray-500)',
      gap: '0.75rem',
      fontSize: '0.9375rem',
    }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    Carregando gráficos...
  </div>
);

const FinancialDashboard = (props) => (
  <Suspense fallback={<LoadingPlaceholder />}>
    <FinancialDashboardImpl {...props} />
  </Suspense>
);

export default FinancialDashboard;
