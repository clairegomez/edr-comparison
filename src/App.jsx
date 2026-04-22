import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import ExecutiveSummary from './components/ExecutiveSummary'
import ArchitectureComparison from './components/ArchitectureComparison'
import FeatureAnalysis from './components/FeatureAnalysis'
import MitreAttack from './components/MitreAttack'
import PricingCalculator from './components/PricingCalculator'
import DecisionTool from './components/DecisionTool'
import AnalystRecommendation from './components/AnalystRecommendation'

export default function App() {
  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Navigation />
      <main className="flex-1 ml-64 min-h-screen">
        <Routes>
          <Route path="/" element={<ExecutiveSummary />} />
          <Route path="/architecture" element={<ArchitectureComparison />} />
          <Route path="/features" element={<FeatureAnalysis />} />
          <Route path="/mitre" element={<MitreAttack />} />
          <Route path="/pricing" element={<PricingCalculator />} />
          <Route path="/decision" element={<DecisionTool />} />
          <Route path="/recommendation" element={<AnalystRecommendation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
