import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const csTiers = [
  {
    name: 'Falcon Go',
    pricePerEndpoint: 8.99,
    features: ['Next-Gen Antivirus', 'USB Device Control', 'Firewall Management', 'Standard Support'],
    targetSize: 'SMB',
    color: '#c0392b',
  },
  {
    name: 'Falcon Pro',
    pricePerEndpoint: 15.99,
    features: ['All Falcon Go features', 'EDR / Threat Hunting', 'Real Time Response', 'Malware Search Engine'],
    targetSize: 'Mid-Market',
    color: '#e6182c',
    recommended: true,
  },
  {
    name: 'Falcon Enterprise',
    pricePerEndpoint: 18.99,
    features: ['All Falcon Pro features', 'Threat Intelligence', 'Incident Workbench', 'Priority Support', 'Forensics'],
    targetSize: 'Enterprise',
    color: '#e6182c',
  },
  {
    name: 'Falcon Elite',
    pricePerEndpoint: 26.00,
    features: ['All Enterprise features', 'Identity Protection', 'Discover', 'Charlotte AI', 'Dedicated TAM'],
    targetSize: 'Large Enterprise',
    color: '#a93226',
  },
]

const s1Tiers = [
  {
    name: 'Singularity Core',
    pricePerEndpoint: 5.50,
    features: ['NGAV', 'EDR Basics', 'Storyline™', 'Multi-Tenant Console'],
    targetSize: 'SMB',
    color: '#5b21b6',
  },
  {
    name: 'Singularity Control',
    pricePerEndpoint: 7.50,
    features: ['All Core features', 'Firewall Control', 'Device Control', 'Vulnerability Mgmt'],
    targetSize: 'Mid-Market',
    color: '#7b2fff',
    recommended: true,
  },
  {
    name: 'Singularity Complete',
    pricePerEndpoint: 13.00,
    features: ['All Control features', 'Full EDR + XDR', '1-Click Remediation', 'Ranger Discovery', 'Purple AI'],
    targetSize: 'Enterprise',
    color: '#7b2fff',
  },
  {
    name: 'Singularity Commercial',
    pricePerEndpoint: 18.00,
    features: ['All Complete features', 'Managed XDR (Vigilance)', 'Identity Threat Detection', 'Cloud Workload'],
    targetSize: 'Large Enterprise',
    color: '#6d28d9',
  },
]

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-xl">
        <p className="text-xs font-semibold text-text-primary mb-1">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
            <span className="text-text-secondary">{p.name}:</span>
            <span className="font-bold text-text-primary">{fmt(p.value)}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function PricingCalculator() {
  const [endpoints, setEndpoints] = useState(500)
  const [inputValue, setInputValue] = useState('500')

  const handleInput = (val) => {
    setInputValue(val)
    const n = parseInt(val.replace(/,/g, ''), 10)
    if (!isNaN(n) && n > 0) setEndpoints(Math.min(n, 100000))
  }

  const chartData = useMemo(() => {
    const rows = []
    for (let i = 0; i < Math.max(csTiers.length, s1Tiers.length); i++) {
      const cs = csTiers[i]
      const s1 = s1Tiers[i]
      rows.push({
        tier: i === 0 ? 'Entry' : i === 1 ? 'Mid' : i === 2 ? 'Enterprise' : 'Elite',
        crowdstrike: cs ? Math.round(cs.pricePerEndpoint * 12 * endpoints) : null,
        sentinelone: s1 ? Math.round(s1.pricePerEndpoint * 12 * endpoints) : null,
      })
    }
    return rows
  }, [endpoints])

  const savings = useMemo(() => {
    const csEnterprise = Math.round(csTiers[2].pricePerEndpoint * 12 * endpoints)
    const s1Enterprise = Math.round(s1Tiers[2].pricePerEndpoint * 12 * endpoints)
    return csEnterprise - s1Enterprise
  }, [endpoints])

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <p className="section-label">Section 05</p>
        <h2 className="section-title">Pricing Calculator</h2>
        <p className="section-subtitle max-w-2xl">
          Estimated annual costs based on published and market-reported pricing. Actual pricing
          requires a vendor quote and varies by contract length, discounts, and add-ons. Prices
          are per endpoint per month, annualized.
        </p>
      </div>

      {/* Endpoint Input */}
      <div className="card mb-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex-1 min-w-64">
            <label className="block text-xs font-mono uppercase tracking-wide text-text-muted mb-2">
              Number of Endpoints
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={10}
                max={10000}
                step={10}
                value={endpoints}
                onChange={(e) => {
                  const v = parseInt(e.target.value)
                  setEndpoints(v)
                  setInputValue(v.toLocaleString())
                }}
                className="flex-1 accent-accent-blue h-2 rounded-full"
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInput(e.target.value)}
                className="w-28 bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm font-bold text-text-primary text-center focus:border-accent-blue focus:outline-none"
              />
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>10</span>
              <span>Drag to adjust</span>
              <span>10,000</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'CS Enterprise Annual', value: fmt(csTiers[2].pricePerEndpoint * 12 * endpoints), color: 'text-cs-red' },
              { label: 'S1 Complete Annual', value: fmt(s1Tiers[2].pricePerEndpoint * 12 * endpoints), color: 'text-s1-purple' },
              { label: 'Enterprise Savings (S1)', value: fmt(Math.abs(savings)), color: 'text-accent-green', sub: savings > 0 ? 'choosing SentinelOne' : 'choosing CrowdStrike' },
            ].map((m) => (
              <div key={m.label} className="metric-card">
                <p className={`text-xl font-extrabold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-text-muted mt-0.5">{m.label}</p>
                {m.sub && <p className="text-xs text-accent-green/70">{m.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tier Comparison Cards */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* CrowdStrike Tiers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-5 rounded-full bg-cs-red" />
            <h3 className="text-sm font-bold text-text-primary">CrowdStrike Falcon Tiers</h3>
          </div>
          <div className="space-y-3">
            {csTiers.map((tier) => {
              const annual = tier.pricePerEndpoint * 12 * endpoints
              const monthly = tier.pricePerEndpoint * endpoints
              return (
                <div
                  key={tier.name}
                  className={`rounded-xl border p-4 transition-all ${
                    tier.recommended
                      ? 'border-cs-red/50 bg-cs-red/5'
                      : 'border-dark-border bg-dark-surface hover:border-cs-red/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text-primary">{tier.name}</h4>
                        {tier.recommended && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-cs-red/20 text-cs-red font-medium">Popular</span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">{tier.targetSize}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-cs-red">{fmt(annual)}</p>
                      <p className="text-xs text-text-muted">/year · {fmt(monthly)}/mo</p>
                      <p className="text-xs text-text-muted">${tier.pricePerEndpoint}/endpoint/mo</p>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-cs-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-text-secondary">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SentinelOne Tiers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-5 rounded-full bg-s1-purple" />
            <h3 className="text-sm font-bold text-text-primary">SentinelOne Singularity Tiers</h3>
          </div>
          <div className="space-y-3">
            {s1Tiers.map((tier) => {
              const annual = tier.pricePerEndpoint * 12 * endpoints
              const monthly = tier.pricePerEndpoint * endpoints
              return (
                <div
                  key={tier.name}
                  className={`rounded-xl border p-4 transition-all ${
                    tier.recommended
                      ? 'border-s1-purple/50 bg-s1-purple/5'
                      : 'border-dark-border bg-dark-surface hover:border-s1-purple/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text-primary">{tier.name}</h4>
                        {tier.recommended && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-s1-purple/20 text-s1-purple font-medium">Popular</span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">{tier.targetSize}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-s1-purple">{fmt(annual)}</p>
                      <p className="text-xs text-text-muted">/year · {fmt(monthly)}/mo</p>
                      <p className="text-xs text-text-muted">${tier.pricePerEndpoint}/endpoint/mo</p>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-s1-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-text-secondary">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Cost Comparison Chart */}
      <div className="card">
        <h3 className="text-sm font-bold text-text-primary mb-1">Annual Cost by Tier</h3>
        <p className="text-xs text-text-muted mb-4">
          Based on {endpoints.toLocaleString()} endpoints · All figures in USD
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis dataKey="tier" tick={{ fill: '#8b949e', fontSize: 11 }} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="crowdstrike" name="CrowdStrike" fill="#e6182c" radius={[4, 4, 0, 0]} opacity={0.85} />
            <Bar dataKey="sentinelone" name="SentinelOne" fill="#7b2fff" radius={[4, 4, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-text-muted mt-2 text-center italic">
          * Estimates only. Actual pricing varies with negotiated discounts, multi-year contracts, and regional pricing.
        </p>
      </div>
    </div>
  )
}
