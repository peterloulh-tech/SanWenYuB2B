import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProcurementPage from './pages/ProcurementPage'
import MarketPage from './pages/MarketPage'
import OrdersPage from './pages/OrdersPage'
import SuppliersPage from './pages/SuppliersPage'
import FinancePage from './pages/FinancePage'
import HelpPage from './pages/HelpPage'
import OperationsPage from './pages/OperationsPage'
import DataScreenPage from './pages/DataScreenPage'
import ActionPage from './pages/ActionPage'
import ProcurementDetailPage from './pages/ProcurementDetailPage'
import OrderConfirmPage from './pages/OrderConfirmPage'
import OrderDetailPage from './pages/OrderDetailPage'
import MobileHomePage from './pages/MobileHomePage'
import MobileTradePage from './pages/MobileTradePage'
import RetailHomePage from './pages/RetailHomePage'
import RetailProductPage from './pages/RetailProductPage'
import RetailCartPage from './pages/RetailCartPage'
import RetailCheckoutPage from './pages/RetailCheckoutPage'
import RetailOrderSuccessPage from './pages/RetailOrderSuccessPage'
import IndustryServicesPage from './pages/IndustryServicesPage'
import IndustryProductsPage from './pages/IndustryProductsPage'
import LegacyIndustryProductsRedirect from './pages/LegacyIndustryProductsRedirect'
import IndustryServiceDetailPage from './pages/IndustryServiceDetailPage'
import ServiceRequestSuccessPage from './pages/ServiceRequestSuccessPage'
import NewsCenterPage from './pages/NewsCenterPage'
import NewsDetailPage from './pages/NewsDetailPage'
import ProcurementPublishPage from './pages/ProcurementPublishPage'
import TraceabilityPage from './pages/TraceabilityPage'
import SupplierDetailPage from './pages/SupplierDetailPage'
import RizhaoIndustryPage from './pages/RizhaoIndustryPage'
import SalmonEncyclopediaPage from './pages/SalmonEncyclopediaPage'
import SalmonKitchenPage from './pages/SalmonKitchenPage'
import SalmonKitchenDetailPage from './pages/SalmonKitchenDetailPage'
import PatentsPage from './pages/PatentsPage'
import PatentDetailPage from './pages/PatentDetailPage'
import PatentInquiryPage from './pages/PatentInquiryPage'
import PatentSuccessPage from './pages/PatentSuccessPage'

export default function App() {
  return <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="retail" element={<RetailHomePage />} />
      <Route path="retail/products/:id" element={<RetailProductPage />} />
      <Route path="retail/cart" element={<RetailCartPage />} />
      <Route path="retail/checkout" element={<RetailCheckoutPage />} />
      <Route path="retail/order-success" element={<RetailOrderSuccessPage />} />
      <Route path="products" element={<IndustryProductsPage />} />
      <Route path="products/:id" element={<ProductDetailPage />} />
      <Route path="procurement" element={<ProcurementPage />} />
      <Route path="procurement/:id" element={<ProcurementDetailPage />} />
      <Route path="procurement/:id/confirm" element={<OrderConfirmPage />} />
      <Route path="market" element={<MarketPage />} />
      <Route path="news" element={<NewsCenterPage />} />
      <Route path="news/:id" element={<NewsDetailPage />} />
      <Route path="suppliers" element={<SuppliersPage />} />
      <Route path="suppliers/:id" element={<SupplierDetailPage />} />
      <Route path="traceability" element={<TraceabilityPage />} />
      <Route path="rizhao-industry" element={<RizhaoIndustryPage />} />
      <Route path="salmon-encyclopedia" element={<SalmonEncyclopediaPage />} />
      <Route path="salmon-kitchen" element={<SalmonKitchenPage />} />
      <Route path="salmon-kitchen/:id" element={<SalmonKitchenDetailPage />} />
      <Route path="patents" element={<PatentsPage />} />
      <Route path="patents/request/success" element={<PatentSuccessPage />} />
      <Route path="patents/:id" element={<PatentDetailPage />} />
      <Route path="patents/:id/inquiry" element={<PatentInquiryPage />} />
      <Route path="services" element={<IndustryServicesPage />} />
      <Route path="industry-products" element={<LegacyIndustryProductsRedirect />} />
      <Route path="services/request/success" element={<ServiceRequestSuccessPage />} />
      <Route path="services/:id" element={<IndustryServiceDetailPage />} />
      <Route path="services/orders" element={<OrdersPage />} />
      <Route path="services/orders/:id" element={<OrderDetailPage />} />
      <Route path="finance" element={<FinancePage />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="login" element={<ActionPage type="login" />} />
      <Route path="register" element={<ActionPage type="register" />} />
      <Route path="procurement/new" element={<ProcurementPublishPage />} />
      <Route path="procurement/:id/quote" element={<ActionPage type="quote" />} />
      <Route path="orders/:id" element={<ActionPage type="order" />} />
      <Route path="finance/apply" element={<ActionPage type="finance" />} />
    </Route>
    <Route path="operations" element={<OperationsPage />} />
    <Route path="data-screen" element={<DataScreenPage />} />
    <Route path="mobile" element={<MobileHomePage />} />
    <Route path="mobile/trade" element={<MobileTradePage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
