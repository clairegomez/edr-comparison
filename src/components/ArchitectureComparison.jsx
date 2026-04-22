import { useState, useEffect } from 'react'

function AnimatedCallout({ delay = 0, children, color = 'blue' }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  const colors = {
    red: 'border-cs-red/50 bg-cs-red/10 text-cs-red',
    purple: 'border-s1-purple/50 bg-s1-purple/10 text-s1-purple',
    blue: 'border-accent-blue/50 bg-accent-blue/10 text-accent-blue',
    green: 'border-accent-green/50 bg-accent-green/10 text-accent-green',
  }
  return (
    <div
      className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all duration-500 ${colors[color]} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {children}
    </div>
  )
}

function ArchNode({ label, sublabel, color, icon, pulse = false }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border p-4 text-center
        ${color === 'red' ? 'border-cs-red/40 bg-cs-red/5' : ''}
        ${color === 'purple' ? 'border-s1-purple/40 bg-s1-purple/5' : ''}
        ${color === 'blue' ? 'border-accent-blue/40 bg-accent-blue/5' : ''}
        ${color === 'green' ? 'border-accent-green/40 bg-accent-green/5' : ''}
        ${color === 'gray' ? 'border-dark-border bg-dark-surface' : ''}
      `}
    >
      {pulse && (
        <span className="absolute top-2 right-2 flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color === 'red' ? 'bg-cs-red' : 'bg-s1-purple'}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${color === 'red' ? 'bg-cs-red' : 'bg-s1-purple'}`} />
        </span>
      )}
      <span className="text-2xl mb-1">{icon}</span>
      <p className="text-xs font-semibold text-text-primary leading-tight">{label}</p>
      {sublabel && <p className="text-xs text-text-muted mt-0.5 leading-tight">{sublabel}</p>}
    </div>
  )
}

function Arrow({ vertical = false }) {
  return (
    <div className={`flex items-center justify-center ${vertical ? 'flex-col h-8' : 'flex-row w-8'}`}>
      <div className={`bg-dark-border ${vertical ? 'w-0.5 flex-1' : 'h-0.5 flex-1'}`} />
      <svg className={`w-3 h-3 text-dark-border flex-shrink-0 ${vertical ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

export default function ArchitectureComparison() {
  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <p className="section-label">Section 02</p>
        <h2 className="section-title">Architecture Comparison</h2>
        <p className="section-subtitle max-w-2xl">
          The most fundamental difference between these platforms is <em>where</em> the AI lives.
          This architectural choice has cascading effects on offline capability, response speed,
          data privacy, and total cost.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* CrowdStrike Architecture */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-6 rounded-full bg-cs-red" />
            <h3 className="text-base font-bold text-text-primary">CrowdStrike Falcon</h3>
            <span className="ml-auto badge-cs">Cloud-Native</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            {/* Endpoint */}
            <ArchNode label="Endpoint Agent" sublabel="Lightweight ~5MB sensor" color="gray" icon="💻" />
            <Arrow vertical />

            {/* Telemetry Stream */}
            <div className="w-full text-center">
              <AnimatedCallout delay={200} color="red">
                ↑ Streams ~5TB/day of telemetry events
              </AnimatedCallout>
            </div>

            <Arrow vertical />

            {/* Threat Graph */}
            <ArchNode label="Threat Graph™" sublabel="Petabyte-scale cloud AI" color="red" icon="☁️" pulse />

            <Arrow vertical />

            <div className="grid grid-cols-2 gap-2 w-full">
              <ArchNode label="ML Detection" sublabel="Cloud models" color="red" icon="🧠" />
              <ArchNode label="IOA Engine" sublabel="Behavioral AI" color="red" icon="🔍" />
            </div>

            <Arrow vertical />

            <div className="w-full text-center">
              <AnimatedCallout delay={600} color="red">
                ↓ Response command pushed to endpoint
              </AnimatedCallout>
            </div>

            <Arrow vertical />
            <ArchNode label="Automated Response" sublabel="Isolate · Block · Remediate" color="blue" icon="⚡" />
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-accent-green text-sm mt-0.5">✓</span>
              <p className="text-xs text-text-secondary">Petabyte-scale threat intelligence across 29,000+ customers</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green text-sm mt-0.5">✓</span>
              <p className="text-xs text-text-secondary">Single agent across Windows, macOS, Linux, cloud workloads</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green text-sm mt-0.5">✓</span>
              <p className="text-xs text-text-secondary">Charlotte AI: Natural language threat hunting</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-yellow text-sm mt-0.5">△</span>
              <p className="text-xs text-text-secondary">Full AI capability requires cloud connectivity</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-yellow text-sm mt-0.5">△</span>
              <p className="text-xs text-text-secondary">Telemetry-dependent: limited offline detection</p>
            </div>
          </div>
        </div>

        {/* SentinelOne Architecture */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-6 rounded-full bg-s1-purple" />
            <h3 className="text-base font-bold text-text-primary">SentinelOne Singularity</h3>
            <span className="ml-auto badge-s1">On-Device AI</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            {/* Endpoint with embedded AI */}
            <div className="w-full border border-s1-purple/30 rounded-xl p-4 bg-s1-purple/5 relative">
              <p className="text-xs font-mono text-s1-purple mb-3 text-center uppercase tracking-wide">Autonomous Endpoint</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <ArchNode label="Static AI" sublabel="Pre-execution" color="purple" icon="🛡️" />
                <ArchNode label="Behavioral AI" sublabel="Runtime analysis" color="purple" icon="🧠" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ArchNode label="Script Engine" sublabel="AMSI + custom" color="purple" icon="📜" />
                <ArchNode label="Storyline™" sublabel="Event correlation" color="purple" icon="🔗" />
              </div>
              <AnimatedCallout delay={300} color="purple">
                ⚡ Sub-second autonomous response — no cloud needed
              </AnimatedCallout>
            </div>

            <Arrow vertical />

            <div className="w-full text-center">
              <AnimatedCallout delay={700} color="purple">
                ↑ Enriched detections + Storyline data synced to cloud
              </AnimatedCallout>
            </div>

            <Arrow vertical />

            <ArchNode label="Singularity Platform" sublabel="Management console + Purple AI" color="purple" icon="☁️" pulse />

            <Arrow vertical />
            <ArchNode label="1-Click Remediation" sublabel="Rollback to pre-attack state" color="green" icon="↩️" />
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-accent-green text-sm mt-0.5">✓</span>
              <p className="text-xs text-text-secondary">Full AI detection and response works 100% offline</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green text-sm mt-0.5">✓</span>
              <p className="text-xs text-text-secondary">Storyline™ automatically maps events to MITRE ATT&amp;CK</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green text-sm mt-0.5">✓</span>
              <p className="text-xs text-text-secondary">1-Click Remediation: full rollback to pre-attack system state</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-yellow text-sm mt-0.5">△</span>
              <p className="text-xs text-text-secondary">Larger agent footprint (~40MB) due to on-device models</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-yellow text-sm mt-0.5">△</span>
              <p className="text-xs text-text-secondary">Smaller cross-customer threat graph than CrowdStrike</p>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Decision Matrix */}
      <div className="card">
        <h3 className="text-base font-bold text-text-primary mb-4">Architecture Impact: Key Trade-offs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left text-text-muted font-medium py-2 pr-4 text-xs uppercase tracking-wide">Factor</th>
                <th className="text-center text-cs-red font-semibold py-2 px-4 text-xs uppercase tracking-wide">CrowdStrike</th>
                <th className="text-center text-s1-purple font-semibold py-2 px-4 text-xs uppercase tracking-wide">SentinelOne</th>
                <th className="text-center text-text-muted font-medium py-2 pl-4 text-xs uppercase tracking-wide">Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {[
                { factor: 'Offline Detection', cs: 'Limited (hash-based only)', s1: 'Full AI detection & response', winner: 's1' },
                { factor: 'Response Speed', cs: '~30s (cloud round-trip)', s1: '<1s (local decision)', winner: 's1' },
                { factor: 'Threat Intelligence Scale', cs: 'Massive (petabyte graph)', s1: 'Moderate (growing)', winner: 'cs' },
                { factor: 'Agent Footprint', cs: 'Very lightweight (~5MB)', s1: 'Moderate (~40MB)', winner: 'cs' },
                { factor: 'Rollback / Remediation', cs: 'Limited (manual steps)', s1: '1-Click full rollback', winner: 's1' },
                { factor: 'Privacy / Data Sovereignty', cs: 'All telemetry sent to cloud', s1: 'Detection local; only alerts synced', winner: 's1' },
                { factor: 'Air-Gapped Environments', cs: 'Degraded capability', s1: 'Full capability', winner: 's1' },
                { factor: 'Cross-Customer Correlation', cs: 'Industry-leading', s1: 'Improving', winner: 'cs' },
              ].map((row) => (
                <tr key={row.factor}>
                  <td className="py-2.5 pr-4 text-text-primary font-medium text-xs">{row.factor}</td>
                  <td className={`py-2.5 px-4 text-center text-xs ${row.winner === 'cs' ? 'text-accent-green font-semibold' : 'text-text-secondary'}`}>
                    {row.cs}
                    {row.winner === 'cs' && <span className="ml-1">✓</span>}
                  </td>
                  <td className={`py-2.5 px-4 text-center text-xs ${row.winner === 's1' ? 'text-accent-green font-semibold' : 'text-text-secondary'}`}>
                    {row.s1}
                    {row.winner === 's1' && <span className="ml-1">✓</span>}
                  </td>
                  <td className="py-2.5 pl-4 text-center">
                    <span className={row.winner === 'cs' ? 'badge-cs' : 'badge-s1'}>
                      {row.winner === 'cs' ? 'CrowdStrike' : 'SentinelOne'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
