import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const overallRadar = [
  { subject: 'Detection', cs: 94, s1: 99 },
  { subject: 'Response', cs: 82, s1: 96 },
  { subject: 'AI/ML', cs: 90, s1: 88 },
  { subject: 'Integrations', cs: 95, s1: 82 },
  { subject: 'Management', cs: 80, s1: 93 },
  { subject: 'Price/Value', cs: 65, s1: 88 },
  { subject: 'Offline', cs: 38, s1: 97 },
  { subject: 'Intel Scale', cs: 98, s1: 78 },
]

const useCaseMatrix = [
  {
    useCase: 'Air-Gapped / OT / ICS Environments',
    winner: 's1',
    confidence: 'Very High',
    rationale: 'SentinelOne\'s on-device AI is the only choice providing full EDR capability without cloud connectivity. There is no competitive alternative here.',
    considerations: 'Review Singularity Complete + Ranger for asset discovery in OT networks.',
  },
  {
    useCase: 'Large Enterprise with Mature SOC',
    winner: 'cs',
    confidence: 'High',
    rationale: 'CrowdStrike\'s Threat Graph, Charlotte AI for threat hunting, and 200+ integrations unlock the most value when you have analysts who can operate the platform deeply.',
    considerations: 'Budget for Falcon Elite; ROI requires trained threat hunters to leverage Charlotte AI.',
  },
  {
    useCase: 'Mid-Market Business (100–500 endpoints)',
    winner: 's1',
    confidence: 'High',
    rationale: 'SentinelOne offers excellent detection, simpler management, and lower TCO. Purple AI automates alert triage, reducing analyst hours.',
    considerations: 'Singularity Control or Complete provides most needed capabilities at a fair price point.',
  },
  {
    useCase: 'MSSP / Multi-Tenant Operations',
    winner: 'cs',
    confidence: 'Moderate',
    rationale: 'CrowdStrike\'s Falcon Platform is the industry-standard for MSSPs due to ecosystem depth, Falcon Complete services, and integrations with major SIEM/SOAR tools.',
    considerations: 'SentinelOne MSSP is growing; evaluate based on customer mix and required integrations.',
  },
  {
    useCase: 'SMB with No Internal SOC',
    winner: 's1',
    confidence: 'High',
    rationale: 'SentinelOne\'s autonomous AI remediation means the platform defends itself without requiring an analyst to act. 1-Click Remediation is transformative for resource-constrained teams.',
    considerations: 'Pair with SentinelOne Vigilance MDR for managed detection and response coverage.',
  },
  {
    useCase: 'Cloud-Native / DevSecOps Environment',
    winner: 'tie',
    confidence: 'Moderate',
    rationale: 'Both platforms have strong Kubernetes and container security capabilities. SentinelOne\'s Singularity Cloud has momentum in cloud-native; CrowdStrike Cloud Security is more mature.',
    considerations: 'Run a POC focused on K8s runtime detection, container image scanning, and CI/CD pipeline integration.',
  },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-lg p-3">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-text-secondary">{p.name}:</span>
            <span className="font-bold text-text-primary">{p.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalystRecommendation() {
  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <p className="section-label">Section 07 · Final Analysis</p>
        <h2 className="section-title">Analyst Recommendation</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-text-muted">By</span>
          <span className="text-xs font-semibold text-accent-blue">Claire Gomez</span>
          <span className="text-xs text-text-muted">· CIS Student, JMU · April 2024</span>
        </div>
      </div>

      {/* Overall Verdict */}
      <div className="card mb-8 bg-gradient-to-br from-dark-card to-dark-surface border-accent-blue/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-s1-purple/20 border border-dark-border flex items-center justify-center text-xl font-bold text-accent-blue flex-shrink-0">
            CG
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary mb-0.5">Claire's Overall Verdict</h3>
            <p className="text-xs text-text-muted">Independent analysis · Not affiliated with either vendor</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <p>
            After comprehensive analysis of architecture, MITRE ATT&amp;CK performance, feature depth,
            pricing, and real-world practitioner feedback, my conclusion is that{' '}
            <span className="text-s1-purple font-semibold">SentinelOne Singularity wins on pure technical merit</span>{' '}
            for the majority of organizations in 2024—particularly those that prioritize autonomous response,
            offline resilience, and operational simplicity.
          </p>

          <p>
            However,{' '}
            <span className="text-cs-red font-semibold">CrowdStrike Falcon remains the enterprise standard</span>{' '}
            and the right choice for large organizations with mature SOC teams who can leverage the breadth
            of its ecosystem, threat intelligence graph, and advanced hunting capabilities through Charlotte AI.
            The platform's 29,000+ customer base creates a network effect in threat intelligence that
            SentinelOne has not yet replicated.
          </p>

          <p>
            The most important insight from this analysis is the{' '}
            <span className="text-accent-yellow font-semibold">architectural divide</span>: where SentinelOne
            runs complete AI models on the endpoint, CrowdStrike streams telemetry to the cloud. This isn't
            better or worse universally—it depends entirely on your connectivity requirements, data sovereignty
            needs, and response time tolerance. For any organization with offline endpoints, SentinelOne is
            the only realistic choice.
          </p>

          <p>
            From a sales engineering perspective, the CrowdStrike sales motion emphasizes ecosystem depth
            and threat intelligence scale—particularly compelling for financial services, government, and
            large healthcare organizations. SentinelOne's motion emphasizes simplicity, automation, and
            cost-effectiveness—resonating strongly with DevOps-forward companies and resource-constrained teams.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Overall Spider Chart */}
        <div className="card">
          <h3 className="text-sm font-bold text-text-primary mb-1">Overall Platform Comparison</h3>
          <p className="text-xs text-text-muted mb-3">Analyst-derived composite scores (0–100)</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={overallRadar}>
              <PolarGrid stroke="#30363d" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8b949e', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#484f58', fontSize: 9 }} />
              <Radar name="CrowdStrike" dataKey="cs" stroke="#e6182c" fill="#e6182c" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="SentinelOne" dataKey="s1" stroke="#7b2fff" fill="#7b2fff" fillOpacity={0.15} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#8b949e' }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weighted Score Summary */}
        <div className="card">
          <h3 className="text-sm font-bold text-text-primary mb-4">Weighted Category Scores</h3>
          <div className="space-y-3">
            {[
              { cat: 'Detection & Prevention', cs: 94, s1: 99, weight: '25%' },
              { cat: 'Automated Response', cs: 82, s1: 96, weight: '20%' },
              { cat: 'AI & Gen-AI Capabilities', cs: 90, s1: 88, weight: '15%' },
              { cat: 'Platform Integrations', cs: 95, s1: 82, weight: '15%' },
              { cat: 'Ease of Management', cs: 80, s1: 93, weight: '10%' },
              { cat: 'Price / Value Ratio', cs: 65, s1: 88, weight: '10%' },
              { cat: 'Offline Capability', cs: 38, s1: 97, weight: '5%' },
            ].map((row) => (
              <div key={row.cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-secondary">{row.cat}</span>
                  <span className="text-text-muted font-mono">{row.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-dark-border rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-cs-red opacity-80"
                      style={{ width: `${row.cs}%` }}
                    />
                  </div>
                  <span className="text-cs-red text-xs font-mono w-6 text-right">{row.cs}</span>
                  <div className="flex-1 bg-dark-border rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-s1-purple opacity-80"
                      style={{ width: `${row.s1}%` }}
                    />
                  </div>
                  <span className="text-s1-purple text-xs font-mono w-6 text-right">{row.s1}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-dark-border flex justify-between items-center">
            <span className="text-xs text-text-muted font-mono">Weighted Total</span>
            <div className="flex gap-4">
              <span className="text-cs-red font-bold text-sm">CS: 83.1</span>
              <span className="text-s1-purple font-bold text-sm">S1: 91.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Use Case Matrix */}
      <div className="card mb-6">
        <h3 className="text-base font-bold text-text-primary mb-4">Use Case Recommendation Matrix</h3>
        <div className="space-y-3">
          {useCaseMatrix.map((uc) => (
            <div
              key={uc.useCase}
              className={`rounded-xl border p-4 ${
                uc.winner === 'cs' ? 'border-cs-red/20 bg-cs-red/3' :
                uc.winner === 's1' ? 'border-s1-purple/20 bg-s1-purple/3' :
                'border-accent-yellow/20'
              }`}
              style={{ background: uc.winner === 'cs' ? 'rgba(230,24,44,0.03)' : uc.winner === 's1' ? 'rgba(123,47,255,0.03)' : 'transparent' }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    uc.winner === 'cs' ? 'bg-cs-red/20 text-cs-red' :
                    uc.winner === 's1' ? 'bg-s1-purple/20 text-s1-purple' :
                    'bg-accent-yellow/20 text-accent-yellow'
                  }`}>
                    {uc.winner === 'cs' ? 'CS' : uc.winner === 's1' ? 'S1' : 'TIE'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-text-primary">{uc.useCase}</h4>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                      uc.confidence === 'Very High' ? 'bg-accent-green/15 text-accent-green' :
                      uc.confidence === 'High' ? 'bg-accent-blue/15 text-accent-blue' :
                      'bg-accent-yellow/15 text-accent-yellow'
                    }`}>{uc.confidence} confidence</span>
                  </div>
                  <p className="text-xs text-text-secondary mb-1.5">{uc.rationale}</p>
                  <div className="flex items-start gap-1.5">
                    <span className="text-accent-blue text-xs flex-shrink-0">→</span>
                    <p className="text-xs text-text-muted italic">{uc.considerations}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Summary Cards */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-cs-red/30 bg-gradient-to-br from-cs-red/5 to-transparent p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-6 rounded-full bg-cs-red" />
            <h3 className="text-sm font-bold text-text-primary">Choose CrowdStrike when...</h3>
          </div>
          <ul className="space-y-2">
            {[
              'You have 2,000+ endpoints and a dedicated SOC team',
              'Ecosystem integrations with existing security tools are critical',
              'You need adversary attribution and named threat actor intelligence',
              'You are an MSSP managing multiple enterprise clients',
              'Always-online infrastructure (data center, cloud-first)',
              'You need Charlotte AI for natural language threat hunting',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="text-cs-red flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-s1-purple/30 bg-gradient-to-br from-s1-purple/5 to-transparent p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-6 rounded-full bg-s1-purple" />
            <h3 className="text-sm font-bold text-text-primary">Choose SentinelOne when...</h3>
          </div>
          <ul className="space-y-2">
            {[
              'You have air-gapped, OT, or frequently offline environments',
              'Autonomous remediation is required (no 24/7 SOC)',
              'You need 1-Click rollback to pre-attack system state',
              'Budget is a key constraint (better $/endpoint economics)',
              'Heavy Linux workloads or cloud-native/Kubernetes environments',
              'You want the simplest, most intuitive management console',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="text-s1-purple flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-dark-surface rounded-lg border border-dark-border">
        <p className="text-xs text-text-muted leading-relaxed">
          <span className="font-semibold text-text-secondary">Disclaimer:</span> This report was produced as an independent academic research project by Claire Gomez (JMU, CIS Program).
          All pricing figures are estimated market rates and may not reflect actual contract pricing. MITRE ATT&amp;CK data is analyst-interpreted from publicly available
          evaluation results. This analysis does not constitute official investment, purchasing, or security advice. Always conduct vendor proof-of-concepts and consult
          certified security professionals before making platform decisions.
        </p>
      </div>
    </div>
  )
}
