import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Splash } from './components/Splash';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { ServiceDetailSheet } from './components/ServiceDetailSheet';
import { RequireAuth } from './components/RequireAuth';
import { useApp } from './context/AppContext';
import { useAuth } from './context/AuthContext';
import { PublicPrices } from './pages/PublicPrices';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PricesEditable } from './pages/PricesEditable';
import { History } from './pages/History';
import { QuoteWizard } from './pages/QuoteWizard';
import { QuotePreview } from './pages/QuotePreview';
import type { DetailContext } from './lib/detailContext';

function Shell() {
  const { pathname } = useLocation();
  const { catalog } = useApp();
  const { user } = useAuth();
  const [detailProductId, setDetailProductId] = useState<number | null>(null);
  const detailItem = detailProductId != null ? catalog.find(p => p.id === detailProductId) ?? null : null;

  const showBottomNav = !!user && pathname !== '/quote' && pathname !== '/preview' && pathname !== '/about';
  const outletCtx: DetailContext = { openDetail: setDetailProductId };

  return (
    <div className="app-shell relative h-dvh bg-shell flex flex-col mx-auto w-full max-w-[480px] overflow-hidden">
      <Splash />
      <TopBar />
      <div className="scrollarea flex-1 overflow-y-auto flex flex-col relative">
        <Outlet context={outletCtx} />
      </div>
      {showBottomNav && <BottomNav />}
      <ServiceDetailSheet item={detailItem} onClose={() => setDetailProductId(null)} />
    </div>
  );
}

function App() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: '#0b0b0d' });
  }, []);

  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<PublicPrices />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/prices" element={<RequireAuth><PricesEditable /></RequireAuth>} />
        <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
        <Route path="/quote" element={<RequireAuth><QuoteWizard /></RequireAuth>} />
        <Route path="/preview" element={<RequireAuth><QuotePreview /></RequireAuth>} />
      </Route>
    </Routes>
  );
}

export default App;
