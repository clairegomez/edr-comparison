import { useState } from 'react'

const features = [
  {
    category: 'Detection Capabilities',
    icon: '🔍',
    summary: 'Both platforms offer best-in-class detection, but SentinelOne edges ahead on offline scenarios.',
    winner: 's1',
    items: [
      { feature: 'Behavioral AI (NGAV)', cs: { value: 'Cloud-enhanced ML', score: 4 }, s1: { value: 'On-device autonomous AI', score: 5 }, winner: 's1', note: 'SentinelOne runs full models on-device vs CS streaming to cloud' },
      { feature: 'Static File Analysis', cs: { value: 'ML + hash reputation', score: 5 }, s1: { value: 'Static AI (pre-execution)', score: 5 }, winner: 'tie', note: 'Both excellent at pre-execution analysis' },
      { feature: 'Script & Macro Detection', cs: { value: 'Script Control + AMSI', score: 5 }, s1: { value: 'Script AI Engine', score: 5 }, winner: 'tie', note: 'Industry parity on script-based attacks' },
      { feature: 'Fileless / Memory Attacks', cs: { value: 'Kernel memory scanning', score: 5 }, s1: { value: 'Deep memory inspection', score: 5 }, winner: 'tie', note: 'Both strong; CrowdStrike has broader telemetry' },
      { feature: 'Offline Detection', cs: { value: 'Hash + local ML (limited)', score: 2 }, s1: { value: 'Full AI — no cloud required', score: 5 }, winner: 's1', note: 'Critical differentiator for air-gapped environments' },
      { feature: 'IOA (Indicator of Attack)', cs: { value: 'Mature IOA framework', score: 5 }, s1: { value: 'Storyline-driven IOA', score: 4 }, winner: 'cs', note: 'CrowdStrike pioneered IOA; more mature rule library' },
      { feature: 'Exploit & Zero-Day Detection', cs: { value: 'Exploit protection patterns', score: 4 }, s1: { value: 'Exploit Guard + ExPack', score: 5 }, winner: 's1', note: "SentinelOne's behavioral approach catches more novel exploits" },
    ],
  },
  {
    category: 'Automated Response',
    icon: '⚡',
    summary: 'SentinelOne leads significantly with autonomous remediation; CrowdStrike requires more analyst involvement.',
    winner: 's1',
    items: [
      { feature: 'Network Isolation', cs: { value: 'Contain endpoint', score: 5 }, s1: { value: 'Network quarantine', score: 5 }, winner: 'tie', note: 'Both platforms offer reliable network isolation' },
      { feature: 'Process Termination', cs: { value: 'Kill + block process', score: 5 }, s1: { value: 'Autonomous kill', score: 5 }, winner: 'tie', note: 'Equivalent capability' },
      { feature: 'File Remediation', cs: { value: 'Quarantine + delete', score: 4 }, s1: { value: 'Delete + quarantine', score: 4 }, winner: 'tie', note: 'Similar file-level response capabilities' },
      { feature: 'Full System Rollback', cs: { value: 'Manual / limited', score: 2 }, s1: { value: '1-Click Remediation™', score: 5 }, winner: 's1', note: 'Significant gap: S1 can roll back to pre-attack state across files, registry, processes' },
      { feature: 'Remote Shell / Live Response', cs: { value: 'Falcon Real Time Response', score: 5 }, s1: { value: 'Remote Shell', score: 4 }, winner: 'cs', note: 'CS RTR is more feature-rich with scripting libraries' },
      { feature: 'SOAR Automation', cs: { value: 'Fusion SOAR (native)', score: 5 }, s1: { value: 'Singularity XDR workflows', score: 4 }, winner: 'cs', note: 'CrowdStrike Fusion SOAR is more mature with broader integrations' },
      { feature: 'Response Speed (MTTR)', cs: { value: '~30s (cloud decision)', score: 3 }, s1: { value: '<1s (local autonomous)', score: 5 }, winner: 's1', note: 'Architectural advantage: on-device response needs no cloud round-trip' },
    ],
  },
  {
    category: 'AI & Threat Intelligence',
    icon: '🧠',
    summary: 'CrowdStrike has scale advantage; SentinelOne has depth with Purple AI for alert summarization.',
    winner: 'tie',
    items: [
      { feature: 'Generative AI Assistant', cs: { value: 'Charlotte AI', score: 4 }, s1: { value: 'Purple AI', score: 5 }, winner: 's1', note: 'Purple AI provides automated alert summaries; Charlotte AI excels at hunting queries' },
      { feature: 'Natural Language Threat Hunting', cs: { value: 'Charlotte AI + NG-SIEM', score: 5 }, s1: { value: 'Purple AI hunting', score: 4 }, winner: 'cs', note: 'CrowdStrike Charlotte AI more mature for analyst queries' },
      { feature: 'Automated Alert Triage', cs: { value: 'ML-based scoring', score: 4 }, s1: { value: 'Purple AI summaries', score: 5 }, winner: 's1', note: 'S1 Purple AI auto-summarizes and prioritizes alerts, reducing analyst fatigue' },
      { feature: 'Threat Intelligence Feed', cs: { value: 'Adversary Intel (130+ groups)', score: 5 }, s1: { value: 'WatchTower threat intel', score: 4 }, winner: 'cs', note: 'CrowdStrike Intelligence tracks 200+ named adversaries with attribution' },
      { feature: 'Cross-Customer Correlation', cs: { value: 'Petabyte Threat Graph', score: 5 }, s1: { value: 'Singularity DataLake', score: 3 }, winner: 'cs', note: 'CS processes trillions of signals/week across all customers' },
    ],
  },
  {
    category: 'Platform Integrations',
    icon: '🔌',
    summary: 'CrowdStrike has a larger ecosystem; SentinelOne integrates well with modern cloud-native stacks.',
    winner: 'cs',
    items: [
      { feature: 'SIEM Connectors', cs: { value: '200+ integrations', score: 5 }, s1: { value: '100+ integrations', score: 4 }, winner: 'cs', note: 'CrowdStrike Store has broader third-party integrations' },
      { feature: 'Cloud Security (CSPM)', cs: { value: 'Falcon Horizon CSPM', score: 5 }, s1: { value: 'Singularity Cloud', score: 4 }, winner: 'cs', note: 'Both mature; CrowdStrike offers deeper multi-cloud coverage' },
      { feature: 'Identity Protection', cs: { value: 'Falcon Identity Protection', score: 5 }, s1: { value: 'Singularity Identity', score: 4 }, winner: 'cs', note: 'CrowdStrike IDP has broader AD threat detection' },
      { feature: 'Container / Kubernetes', cs: { value: 'Falcon Container Security', score: 5 }, s1: { value: 'Singularity Kubernetes', score: 5 }, winner: 'tie', note: 'Both offer strong runtime container protection' },
      { feature: 'Mobile (iOS/Android)', cs: { value: 'Falcon for Mobile', score: 3 }, s1: { value: 'Singularity Mobile', score: 4 }, winner: 's1', note: 'SentinelOne has stronger mobile EDR capabilities' },
      { feature: 'DevSecOps / CI-CD', cs: { value: 'Falcon for DevOps', score: 3 }, s1: { value: 'Singularity Ranger', score: 4 }, winner: 's1', note: 'SentinelOne Ranger integrates better with DevSecOps pipelines' },
    ],
  },
  {
    category: 'Management & Operations',
    icon: '⚙️',
    summary: 'SentinelOne is easier to manage; CrowdStrike offers more granular control for mature SOC teams.',
    winner: 's1',
    items: [
      { feature: 'Console Usability (G2 Rating)', cs: { value: '4.6 / 5.0', score: 4 }, s1: { value: '4.8 / 5.0', score: 5 }, winner: 's1', note: 'SentinelOne consistently rated more intuitive by practitioners' },
      { feature: 'Deployment Speed', cs: { value: '~15 min per endpoint', score: 4 }, s1: { value: '~10 min per endpoint', score: 5 }, winner: 's1', note: 'S1 agent deploys faster with simpler policy structures' },
      { feature: 'Multi-Tenant Architecture', cs: { value: 'Full multi-tenant', score: 5 }, s1: { value: 'Full multi-tenant', score: 5 }, winner: 'tie', note: 'Both support MSSP-grade multi-tenancy' },
      { feature: 'Role-Based Access Control', cs: { value: 'Granular RBAC', score: 5 }, s1: { value: 'Granular RBAC', score: 5 }, winner: 'tie', note: 'Equivalent enterprise RBAC support' },
      { feature: 'API Coverage', cs: { value: 'REST API + FQL', score: 5 }, s1: { value: 'REST API + GraphQL', score: 5 }, winner: 'tie', note: 'Both have comprehensive APIs for automation' },
      { feature: 'Linux Support Depth', cs: { value: 'Strong (kernel 3.10+)', score: 4 }, s1: { value: 'Strong (kernel 3.10+)', score: 5 }, winner: 's1', note: 'SentinelOne has broader Linux distro coverage and eBPF support' },
    ],
  },
]

const ScoreDots = ({ score }) => (
  <div className="flex items-center gap-0.5 mt-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${i <= score ? 'bg-accent-blue' : 'bg-dark-border'}`}
      />
    ))}
  </div>
)

export default function FeatureAnalysis() {
  const [expanded, setExpanded] = useState({ 0: true })

  const toggle = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <p className="section-label">Section 03</p>
        <h2 className="section-title">Feature Analysis</h2>
        <p className="section-subtitle max-w-2xl">
          A structured comparison across five capability domains. Scores reflect technical depth,
          maturity, and real-world practitioner feedback from G2, Gartner Peer Insights,
          and vendor documentation.
        </p>
      </div>

      {/* Score Legend */}
      <div className="flex items-center gap-6 mb-6 px-1">
        <span className="text-xs text-text-muted">Score:</span>
        {[
          { dots: 1, label: 'Basic' },
          { dots: 3, label: 'Adequate' },
          { dots: 5, label: 'Best-in-class' },
        ].map(({ dots, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= dots ? 'bg-accent-blue' : 'bg-dark-border'}`} />
              ))}
            </div>
            <span className="text-xs text-text-muted">{label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-4">
          <span className="badge-cs">CrowdStrike advantage</span>
          <span className="badge-s1">SentinelOne advantage</span>
        </div>
      </div>

      <div className="space-y-3">
        {features.map((cat, idx) => (
          <div key={cat.category} className="card overflow-hidden">
            {/* Category Header */}
            <button
              className="w-full flex items-center gap-3 text-left"
              onClick={() => toggle(idx)}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-text-primary">{cat.category}</h3>
                  <span className={cat.winner === 'cs' ? 'badge-cs' : cat.winner === 's1' ? 'badge-s1' : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/30'}>
                    {cat.winner === 'cs' ? 'CrowdStrike Leads' : cat.winner === 's1' ? 'SentinelOne Leads' : 'Tie'}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-0.5">{cat.summary}</p>
              </div>
              <svg
                className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${expanded[idx] ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expanded rows */}
            {expanded[idx] && (
              <div className="mt-4 -mx-6 px-6 pt-4 border-t border-dark-border">
                {/* Column Headers */}
                <div className="grid grid-cols-12 gap-2 mb-2 text-xs font-mono uppercase tracking-wide text-text-muted">
                  <div className="col-span-3">Feature</div>
                  <div className="col-span-4 text-cs-red">CrowdStrike</div>
                  <div className="col-span-4 text-s1-purple">SentinelOne</div>
                  <div className="col-span-1 text-center">Edge</div>
                </div>

                <div className="space-y-0.5">
                  {cat.items.map((item) => (
                    <div key={item.feature} className="group">
                      <div className="grid grid-cols-12 gap-2 py-2.5 rounded-lg hover:bg-dark-surface/50 px-1 -mx-1 transition-colors">
                        <div className="col-span-3">
                          <p className="text-xs font-medium text-text-primary">{item.feature}</p>
                        </div>
                        <div className={`col-span-4 ${item.winner === 'cs' ? 'text-accent-green' : 'text-text-secondary'}`}>
                          <p className="text-xs">{item.cs.value}</p>
                          <ScoreDots score={item.cs.score} />
                        </div>
                        <div className={`col-span-4 ${item.winner === 's1' ? 'text-accent-green' : 'text-text-secondary'}`}>
                          <p className="text-xs">{item.s1.value}</p>
                          <ScoreDots score={item.s1.score} />
                        </div>
                        <div className="col-span-1 flex items-start justify-center pt-0.5">
                          {item.winner === 'cs' && <span className="text-xs text-cs-red font-bold">CS</span>}
                          {item.winner === 's1' && <span className="text-xs text-s1-purple font-bold">S1</span>}
                          {item.winner === 'tie' && <span className="text-xs text-accent-yellow font-bold">—</span>}
                        </div>
                      </div>
                      {/* Analyst note on hover */}
                      <div className="hidden group-hover:block px-1 pb-2">
                        <p className="text-xs text-text-muted italic border-l-2 border-dark-border pl-2">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overall Scorecard */}
      <div className="card mt-6">
        <h3 className="text-base font-bold text-text-primary mb-4">Category Scorecard</h3>
        <div className="grid grid-cols-5 gap-3">
          {features.map((cat) => (
            <div key={cat.category} className="text-center bg-dark-surface rounded-lg p-3 border border-dark-border">
              <p className="text-xl mb-1">{cat.icon}</p>
              <p className="text-xs text-text-muted leading-tight mb-2">{cat.category}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                ${cat.winner === 'cs' ? 'bg-cs-red/20 text-cs-red' : ''}
                ${cat.winner === 's1' ? 'bg-s1-purple/20 text-s1-purple' : ''}
                ${cat.winner === 'tie' ? 'bg-accent-yellow/20 text-accent-yellow' : ''}
              `}>
                {cat.winner === 'cs' ? 'CS' : cat.winner === 's1' ? 'S1' : 'TIE'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
