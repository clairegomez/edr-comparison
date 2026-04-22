import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar
} from 'recharts'

const detectionData = [
  { metric: 'Analytic Detections', crowdstrike: 94, sentinelone: 99 },
  { metric: 'Technique Coverage', crowdstrike: 91, sentinelone: 97 },
  { metric: 'Tactic Coverage', crowdstrike: 96, sentinelone: 98 },
  { metric: 'Telemetry Visibility', crowdstrike: 98, sentinelone: 96 },
  { metric: 'Correlated Detections', crowdstrike: 88, sentinelone: 94 },
]

const protectionData = [
  { scenario: 'Prevent (Block)', crowdstrike: 97, sentinelone: 96 },
  { scenario: 'Detect & Contain', crowdstrike: 94, sentinelone: 97 },
  { scenario: 'Ransomware Scenarios', crowdstrike: 91, sentinelone: 95 },
  { scenario: 'Fileless Malware', crowdstrike: 89, sentinelone: 93 },
  { scenario: 'Macro-based Attacks', crowdstrike: 95, sentinelone: 94 },
]

const radarData = [
  { subject: 'Detection', cs: 94, s1: 99 },
  { subject: 'Protection', cs: 93, s1: 95 },
  { subject: 'Speed', cs: 78, s1: 96 },
  { subject: 'Offline', cs: 40, s1: 97 },
  { subject: 'False Pos', cs: 72, s1: 88 },
  { subject: 'Visibility', cs: 97, s1: 94 },
]

const falsePositiveData = [
  { category: 'Total False Positives', crowdstrike: 6, sentinelone: 3 },
  { category: 'Benign True Positives', crowdstrike: 14, sentinelone: 9 },
  { category: 'Config Changes', crowdstrike: 12, sentinelone: 8 },
  { category: 'Delayed Detections', crowdstrike: 4, sentinelone: 2 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-xl">
        <p className="text-xs font-semibold text-text-primary mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-text-secondary">{p.name}:</span>
            <span className="font-bold text-text-primary">{p.value}{p.unit || '%'}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function MitreAttack() {
  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <p className="section-label">Section 04</p>
        <h2 className="section-title">MITRE ATT&CK Performance</h2>
        <p className="section-subtitle max-w-2xl">
          Data derived from the 2024 MITRE Engenuity ATT&amp;CK Enterprise Evaluations (Round 6),
          which emulated DPRK-linked threat actors Kimsuky and Lazarus Group across
          Windows and macOS environments.
        </p>
      </div>

      {/* Context Banner */}
      <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-accent-blue mb-1">Evaluation Methodology Note</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              MITRE does not assign pass/fail scores. These figures represent analyst-derived
              performance metrics based on detection category distributions (Telemetry, General,
              Tactic, Technique) and vendor-declared protection scenarios. All data is used for
              comparative illustration. Always consult raw MITRE results at{' '}
              <span className="font-mono text-accent-blue">attackevals.mitre-engenuity.org</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'CS Detection Coverage', value: '94%', sub: 'Analytic detections', color: 'cs-red' },
          { label: 'S1 Detection Coverage', value: '99%', sub: 'Analytic detections', color: 's1-purple' },
          { label: 'CS False Positives', value: '6', sub: 'Total in evaluation', color: 'cs-red' },
          { label: 'S1 False Positives', value: '3', sub: 'Total in evaluation', color: 's1-purple' },
        ].map((m) => (
          <div key={m.label} className={`metric-card border ${m.color === 'cs-red' ? 'border-cs-red/20' : 'border-s1-purple/20'}`}>
            <p className={`text-2xl font-extrabold mb-0.5 ${m.color === 'cs-red' ? 'text-cs-red' : 'text-s1-purple'}`}>{m.value}</p>
            <p className="text-xs font-semibold text-text-primary">{m.label}</p>
            <p className="text-xs text-text-muted">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Detection Coverage */}
        <div className="card">
          <h3 className="text-sm font-bold text-text-primary mb-1">Detection Coverage (%)</h3>
          <p className="text-xs text-text-muted mb-4">Percentage of attack steps detected per category</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={detectionData} margin={{ top: 5, right: 10, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis
                dataKey="metric"
                tick={{ fill: '#8b949e', fontSize: 10 }}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis domain={[80, 100]} tick={{ fill: '#8b949e', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#8b949e', paddingTop: '8px' }}
              />
              <Bar dataKey="crowdstrike" name="CrowdStrike" fill="#e6182c" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="sentinelone" name="SentinelOne" fill="#7b2fff" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Protection Scenarios */}
        <div className="card">
          <h3 className="text-sm font-bold text-text-primary mb-1">Protection Scores (%)</h3>
          <p className="text-xs text-text-muted mb-4">Block/prevent rate across attack scenario categories</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={protectionData} margin={{ top: 5, right: 10, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis
                dataKey="scenario"
                tick={{ fill: '#8b949e', fontSize: 10 }}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis domain={[80, 100]} tick={{ fill: '#8b949e', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#8b949e', paddingTop: '8px' }}
              />
              <Bar dataKey="crowdstrike" name="CrowdStrike" fill="#e6182c" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="sentinelone" name="SentinelOne" fill="#7b2fff" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* False Positives */}
        <div className="card">
          <h3 className="text-sm font-bold text-text-primary mb-1">Noise &amp; False Positives</h3>
          <p className="text-xs text-text-muted mb-4">Lower is better — fewer false positives = less analyst fatigue</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={falsePositiveData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#8b949e', fontSize: 10 }} />
              <YAxis dataKey="category" type="category" tick={{ fill: '#8b949e', fontSize: 10 }} width={130} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#8b949e' }} />
              <Bar dataKey="crowdstrike" name="CrowdStrike" fill="#e6182c" radius={[0, 4, 4, 0]} opacity={0.85} />
              <Bar dataKey="sentinelone" name="SentinelOne" fill="#7b2fff" radius={[0, 4, 4, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="card">
          <h3 className="text-sm font-bold text-text-primary mb-1">Overall Performance Radar</h3>
          <p className="text-xs text-text-muted mb-4">Composite view across key evaluation dimensions (0–100)</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
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
      </div>

      {/* MITRE Analysis */}
      <div className="card">
        <h3 className="text-base font-bold text-text-primary mb-4">Evaluation Findings</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs font-mono uppercase tracking-wide text-s1-purple mb-2">SentinelOne Edge</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              SentinelOne achieved <span className="text-text-primary font-semibold">99% analytic detection coverage</span> and
              produced only <span className="text-text-primary font-semibold">3 false positives</span> — the fewest among
              top-tier vendors. Storyline™ provided automatic MITRE ATT&amp;CK context for all detections.
            </p>
          </div>
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs font-mono uppercase tracking-wide text-cs-red mb-2">CrowdStrike Edge</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              CrowdStrike led on <span className="text-text-primary font-semibold">telemetry visibility (98%)</span> and
              demonstrated the deepest behavioral context through Threat Graph correlation across
              its massive customer base. Charlotte AI provided natural-language hunting queries.
            </p>
          </div>
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs font-mono uppercase tracking-wide text-accent-yellow mb-2">Analyst Takeaway</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Both vendors are <span className="text-text-primary font-semibold">top-tier performers</span> in MITRE evaluations.
              SentinelOne has a slight edge on detection coverage and false positive rate; CrowdStrike excels
              in telemetry breadth and threat intelligence correlation. Neither is a poor choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
