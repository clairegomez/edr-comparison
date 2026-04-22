export default function ExecutiveSummary() {
  return (
    <div className="page-container animate-fade-in">
      {/* Page Header */}
      <div className="mb-10">
        <p className="section-label">Market Intelligence Report · April 2026</p>
        <h1 className="text-4xl font-extrabold text-text-primary mb-3 leading-tight">
          EDR Platform Analysis:<br />
          <span className="text-cs-red">CrowdStrike Falcon</span>{' '}
          <span className="text-text-muted">vs</span>{' '}
          <span className="text-s1-purple">SentinelOne Singularity</span>
        </h1>
        <p className="section-subtitle max-w-3xl">
          An independent technical evaluation of the two leading Endpoint Detection &amp; Response
          platforms—comparing architecture, capabilities, MITRE ATT&amp;CK performance, and
          total cost of ownership to guide enterprise security purchasing decisions.
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        {/* CrowdStrike Card */}
        <div className="relative overflow-hidden rounded-2xl border border-cs-red/30 bg-gradient-to-br from-dark-card via-dark-card to-cs-red/5 p-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cs-red/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cs-red/15 border border-cs-red/30 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#e6182c" opacity="0.15" />
                  <path d="M20 6 L34 28 H6 Z" fill="#e6182c" />
                  <circle cx="20" cy="20" r="5" fill="white" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary">CrowdStrike</h2>
                <p className="text-xs text-text-muted">Falcon Platform</p>
              </div>
              <span className="ml-auto badge-cs">Market Leader</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">Architecture</p>
                <p className="text-sm font-semibold text-text-primary">Cloud-Native AI</p>
              </div>
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">AI Engine</p>
                <p className="text-sm font-semibold text-text-primary">Threat Graph™</p>
              </div>
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">Market Cap</p>
                <p className="text-sm font-semibold text-text-primary">~$83B</p>
              </div>
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">Customers</p>
                <p className="text-sm font-semibold text-text-primary">29,000+</p>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              The dominant cloud-native EDR platform built on a lightweight agent that streams
              telemetry to CrowdStrike's Threat Graph—a petabyte-scale AI processing engine—for
              real-time detection and response.
            </p>
          </div>
        </div>

        {/* SentinelOne Card */}
        <div className="relative overflow-hidden rounded-2xl border border-s1-purple/30 bg-gradient-to-br from-dark-card via-dark-card to-s1-purple/5 p-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-s1-purple/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-s1-purple/15 border border-s1-purple/30 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#7b2fff" opacity="0.15" />
                  <polygon points="20,6 32,14 32,26 20,34 8,26 8,14" fill="#7b2fff" opacity="0.8" />
                  <circle cx="20" cy="20" r="5" fill="white" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary">SentinelOne</h2>
                <p className="text-xs text-text-muted">Singularity Platform</p>
              </div>
              <span className="ml-auto badge-s1">Challenger</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">Architecture</p>
                <p className="text-sm font-semibold text-text-primary">On-Device AI</p>
              </div>
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">AI Engine</p>
                <p className="text-sm font-semibold text-text-primary">Singularity AI™</p>
              </div>
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">Market Cap</p>
                <p className="text-sm font-semibold text-text-primary">~$18B</p>
              </div>
              <div className="bg-dark-surface/60 rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-text-muted mb-0.5">Customers</p>
                <p className="text-sm font-semibold text-text-primary">11,000+</p>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              The autonomous AI-first challenger running full behavioral detection models directly
              on the endpoint—enabling offline protection, 1-Click Remediation, and sub-second
              response times independent of cloud connectivity.
            </p>
          </div>
        </div>
      </div>

      {/* Key Verdict */}
      <div className="card mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full bg-accent-blue" />
          <h2 className="text-lg font-bold text-text-primary">Key Verdict</h2>
          <span className="ml-auto text-xs font-mono text-text-muted">Analyst Summary</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs text-text-muted mb-1 uppercase tracking-wide font-mono">Enterprise &amp; MSSPs</p>
            <p className="text-sm font-semibold text-cs-red mb-1">CrowdStrike Wins</p>
            <p className="text-xs text-text-secondary">Superior ecosystem integrations, Threat Graph scale, and Charlotte AI for large SOC teams with mature workflows.</p>
          </div>
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs text-text-muted mb-1 uppercase tracking-wide font-mono">Mid-Market &amp; SMB</p>
            <p className="text-sm font-semibold text-s1-purple mb-1">SentinelOne Wins</p>
            <p className="text-xs text-text-secondary">More intuitive console, better pricing economics, autonomous response without requiring human intervention.</p>
          </div>
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs text-text-muted mb-1 uppercase tracking-wide font-mono">Offline / Air-Gapped</p>
            <p className="text-sm font-semibold text-s1-purple mb-1">SentinelOne Wins</p>
            <p className="text-xs text-text-secondary">On-device AI models deliver full detection and autonomous remediation with zero cloud connectivity required.</p>
          </div>
        </div>
      </div>

      {/* Report Metadata */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Report Type', value: 'Competitive Analysis' },
          { label: 'Data Sources', value: 'MITRE, Gartner, G2, Vendor Docs' },
          { label: 'Evaluation Period', value: 'Q1–Q2 2024' },
          { label: 'Version', value: '1.0 · Final' },
        ].map((item) => (
          <div key={item.label} className="metric-card">
            <p className="text-xs text-text-muted mb-1">{item.label}</p>
            <p className="text-sm font-semibold text-text-primary">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Analyst Bio */}
      <div className="card">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-s1-purple/20 border border-dark-border flex items-center justify-center text-2xl font-bold text-accent-blue">
            CG
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold text-text-primary">Claire Gomez</h3>
              <span className="badge-cs">Author</span>
            </div>
            <p className="text-sm text-accent-blue font-medium mb-2">
              CIS Student · James Madison University 
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
              Claire is a Computer Information Systems student at JMU with a focus on cybersecurity
              and enterprise security sales. This report was produced as an independent research
              project to develop analyst-grade knowledge of the EDR market, applying technical
              evaluation frameworks used by security practitioners and procurement teams.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs text-text-muted font-mono">JMU · Harrisonburg, VA</span>
              <span className="w-1 h-1 rounded-full bg-dark-border" />
              <span className="text-xs text-text-muted font-mono">Expected Graduation: 2026</span>
              <span className="w-1 h-1 rounded-full bg-dark-border" />
              <span className="text-xs text-text-muted font-mono">Specialization: SE Track</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
