import { useState } from 'react'

const questions = [
  {
    id: 'size',
    question: 'What is your organization size?',
    subtitle: 'Total number of employees affects SOC staffing and platform complexity requirements.',
    options: [
      { label: 'Small (<100 employees)', value: 'small', csScore: 1, s1Score: 4 },
      { label: 'Mid-Market (100–500)', value: 'mid', csScore: 3, s1Score: 4 },
      { label: 'Large (500–2,000)', value: 'large', csScore: 4, s1Score: 3 },
      { label: 'Enterprise (2,000+)', value: 'enterprise', csScore: 5, s1Score: 3 },
    ],
  },
  {
    id: 'soc',
    question: 'Describe your SOC maturity level.',
    subtitle: 'CrowdStrike rewards deep analyst expertise; SentinelOne reduces the analyst burden.',
    options: [
      { label: 'No SOC / MSP-managed', value: 'none', csScore: 1, s1Score: 5 },
      { label: 'Basic SOC (1–3 analysts)', value: 'basic', csScore: 2, s1Score: 5 },
      { label: 'Mature SOC (4–10 analysts)', value: 'mature', csScore: 4, s1Score: 4 },
      { label: 'Enterprise SOC (10+ / dedicated threat hunters)', value: 'enterprise', csScore: 5, s1Score: 3 },
    ],
  },
  {
    id: 'offline',
    question: 'Do you have offline or air-gapped environments?',
    subtitle: 'SentinelOne\'s on-device AI is a decisive advantage in disconnected scenarios.',
    options: [
      { label: 'No — always cloud-connected', value: 'never', csScore: 5, s1Score: 3 },
      { label: 'Occasionally (field offices)', value: 'sometimes', csScore: 3, s1Score: 4 },
      { label: 'Frequently (remote sites)', value: 'frequently', csScore: 2, s1Score: 5 },
      { label: 'Critical (OT/ICS or classified environments)', value: 'critical', csScore: 1, s1Score: 5 },
    ],
  },
  {
    id: 'budget',
    question: 'What is your per-endpoint annual budget?',
    subtitle: 'SentinelOne offers strong value at lower tiers; CrowdStrike justifies premium for large ecosystems.',
    options: [
      { label: 'Under $80/year per endpoint', value: 'low', csScore: 1, s1Score: 4 },
      { label: '$80–$150/year per endpoint', value: 'mid', csScore: 2, s1Score: 5 },
      { label: '$150–$250/year per endpoint', value: 'high', csScore: 4, s1Score: 4 },
      { label: 'Over $250/year — full platform', value: 'premium', csScore: 5, s1Score: 3 },
    ],
  },
  {
    id: 'os',
    question: 'What is your primary operating environment?',
    subtitle: 'Both platforms support all major OSes, but coverage depth varies.',
    options: [
      { label: 'Windows-only or mostly Windows', value: 'windows', csScore: 5, s1Score: 4 },
      { label: 'Mixed (Windows, macOS, Linux)', value: 'mixed', csScore: 4, s1Score: 5 },
      { label: 'Heavy Linux (servers, cloud workloads)', value: 'linux', csScore: 3, s1Score: 5 },
      { label: 'Cloud-native / containerized (K8s, ECS)', value: 'cloud', csScore: 4, s1Score: 5 },
    ],
  },
]

const weights = { size: 1.0, soc: 1.5, offline: 2.0, budget: 1.2, os: 0.8 }

function ProgressBar({ current, total }) {
  return (
    <div className="w-full bg-dark-border rounded-full h-1.5 mb-6">
      <div
        className="bg-accent-blue h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  )
}

function ResultBar({ label, score, maxScore, color }) {
  const pct = Math.round((score / maxScore) * 100)
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className={`font-semibold ${color}`}>{label}</span>
        <span className="text-text-muted">{pct}% weighted match</span>
      </div>
      <div className="w-full bg-dark-border rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${color === 'text-cs-red' ? 'bg-cs-red' : 'bg-s1-purple'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function DecisionTool() {
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQ = questions[step]
  const totalSteps = questions.length

  const selectOption = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }))
  }

  const next = () => {
    if (step < totalSteps - 1) setStep((s) => s + 1)
    else setShowResult(true)
  }

  const back = () => {
    if (showResult) { setShowResult(false); setStep(totalSteps - 1) }
    else if (step > 0) setStep((s) => s - 1)
  }

  const reset = () => {
    setAnswers({})
    setStep(0)
    setShowResult(false)
  }

  const result = (() => {
    let csTotal = 0, s1Total = 0, maxTotal = 0
    const breakdown = []
    questions.forEach((q) => {
      const ans = answers[q.id]
      if (!ans) return
      const opt = q.options.find((o) => o.value === ans.value)
      if (!opt) return
      const w = weights[q.id]
      csTotal += opt.csScore * w
      s1Total += opt.s1Score * w
      maxTotal += 5 * w
      breakdown.push({ question: q.question, label: ans.label, csScore: opt.csScore, s1Score: opt.s1Score, weight: w })
    })
    const winner = csTotal > s1Total ? 'crowdstrike' : s1Total > csTotal ? 'sentinelone' : 'tie'
    return { csTotal, s1Total, maxTotal, winner, breakdown }
  })()

  const getRecommendationText = () => {
    const { winner, breakdown } = result
    const offlineAns = answers['offline']
    const socAns = answers['soc']
    const sizeAns = answers['size']

    if (winner === 'crowdstrike') {
      const reasons = []
      if (sizeAns?.value === 'enterprise') reasons.push('your enterprise scale benefits from CrowdStrike\'s massive threat graph')
      if (socAns?.value === 'enterprise') reasons.push('your mature SOC team can leverage Charlotte AI and Threat Intelligence deeply')
      if (offlineAns?.value === 'never') reasons.push('your always-connected environment removes SentinelOne\'s key offline advantage')
      return {
        vendor: 'CrowdStrike Falcon',
        tier: 'Falcon Enterprise or Elite',
        reasons: reasons.length ? reasons : ['broader ecosystem integrations and telemetry scale match your profile'],
        color: 'cs-red',
      }
    } else if (winner === 'sentinelone') {
      const reasons = []
      if (offlineAns?.value === 'critical' || offlineAns?.value === 'frequently') reasons.push('your offline/air-gapped requirement is a decisive factor only SentinelOne fully satisfies')
      if (socAns?.value === 'none' || socAns?.value === 'basic') reasons.push('SentinelOne\'s autonomous AI reduces analyst workload for your smaller team')
      if (sizeAns?.value === 'small' || sizeAns?.value === 'mid') reasons.push('SentinelOne\'s pricing and simpler console provide better ROI at your scale')
      return {
        vendor: 'SentinelOne Singularity',
        tier: 'Singularity Complete',
        reasons: reasons.length ? reasons : ['on-device AI, lower cost, and simpler management align with your profile'],
        color: 's1-purple',
      }
    } else {
      return {
        vendor: 'Either Platform',
        tier: 'Evaluate Both',
        reasons: ['scores are nearly equal — run a POC with both vendors to decide on console UX and integrations'],
        color: 'accent-blue',
      }
    }
  }

  const canProceed = answers[currentQ?.id]

  if (showResult) {
    const rec = getRecommendationText()
    const { csTotal, s1Total, maxTotal } = result
    return (
      <div className="page-container animate-fade-in">
        <div className="mb-8">
          <p className="section-label">Section 06 · Result</p>
          <h2 className="section-title">Your Recommendation</h2>
        </div>

        {/* Winner Banner */}
        <div className={`rounded-2xl border p-6 mb-6 ${
          rec.color === 'cs-red' ? 'border-cs-red/40 bg-gradient-to-br from-cs-red/10 to-transparent' :
          rec.color === 's1-purple' ? 'border-s1-purple/40 bg-gradient-to-br from-s1-purple/10 to-transparent' :
          'border-accent-blue/40 bg-gradient-to-br from-accent-blue/10 to-transparent'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`text-3xl font-extrabold ${rec.color === 'cs-red' ? 'text-cs-red' : rec.color === 's1-purple' ? 'text-s1-purple' : 'text-accent-blue'}`}>
              ★ Recommended:
            </div>
            <span className={`text-2xl font-extrabold ${rec.color === 'cs-red' ? 'text-cs-red' : rec.color === 's1-purple' ? 'text-s1-purple' : 'text-accent-blue'}`}>
              {rec.vendor}
            </span>
          </div>
          <p className="text-sm text-text-secondary mb-2">
            Suggested tier: <span className="text-text-primary font-semibold">{rec.tier}</span>
          </p>
          <div className="mt-3 space-y-1.5">
            {rec.reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className={`text-sm flex-shrink-0 ${rec.color === 'cs-red' ? 'text-cs-red' : 'text-s1-purple'}`}>→</span>
                <p className="text-sm text-text-secondary capitalize">{r}.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Score Comparison */}
        <div className="card mb-6">
          <h3 className="text-sm font-bold text-text-primary mb-4">Weighted Score Breakdown</h3>
          <ResultBar label="CrowdStrike Falcon" score={csTotal} maxScore={maxTotal} color="text-cs-red" />
          <ResultBar label="SentinelOne Singularity" score={s1Total} maxScore={maxTotal} color="text-s1-purple" />

          <div className="mt-4 divider" />

          <div className="space-y-2 mt-4">
            {result.breakdown.map((b) => (
              <div key={b.question} className="flex items-center gap-3 text-xs">
                <div className="flex-1">
                  <span className="text-text-muted">{b.question.replace('?', '')}</span>
                  <span className="text-text-primary ml-1 font-medium">→ {b.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cs-red font-mono">{b.csScore}/5</span>
                  <span className="text-dark-border">·</span>
                  <span className="text-s1-purple font-mono">{b.s1Score}/5</span>
                  <span className="text-text-muted font-mono">×{b.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={back}
            className="px-4 py-2 text-sm text-text-secondary border border-dark-border rounded-lg hover:border-text-muted transition-colors"
          >
            ← Edit Answers
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 text-sm text-text-secondary border border-dark-border rounded-lg hover:border-text-muted transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <p className="section-label">Section 06</p>
        <h2 className="section-title">Decision Tool</h2>
        <p className="section-subtitle max-w-2xl">
          Answer 5 questions about your environment to receive a weighted platform recommendation
          tailored to your specific use case and requirements.
        </p>
      </div>

      <div className="max-w-2xl">
        <ProgressBar current={step + 1} total={totalSteps} />

        <div className="flex items-center justify-between text-xs text-text-muted mb-6">
          <span>Question {step + 1} of {totalSteps}</span>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i < step ? 'bg-accent-blue' :
                  i === step ? 'bg-accent-blue/50' :
                  'bg-dark-border'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="card mb-6">
          <h3 className="text-xl font-bold text-text-primary mb-1">{currentQ.question}</h3>
          <p className="text-sm text-text-muted mb-5">{currentQ.subtitle}</p>

          <div className="space-y-2">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id]?.value === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => selectOption(currentQ.id, opt)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 ${
                    isSelected
                      ? 'border-accent-blue bg-accent-blue/10 text-text-primary'
                      : 'border-dark-border hover:border-dark-border/80 hover:bg-dark-surface/50 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                      isSelected ? 'border-accent-blue bg-accent-blue' : 'border-dark-border'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white m-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">{opt.label}</span>
                    {isSelected && (
                      <div className="ml-auto flex items-center gap-3 text-xs font-mono">
                        <span className="text-cs-red">CS: {opt.csScore}/5</span>
                        <span className="text-s1-purple">S1: {opt.s1Score}/5</span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={back}
              className="px-4 py-2 text-sm text-text-secondary border border-dark-border rounded-lg hover:border-text-muted transition-colors"
            >
              ← Back
            </button>
          )}
          <button
            onClick={next}
            disabled={!canProceed}
            className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
              canProceed
                ? 'bg-accent-blue text-white hover:bg-accent-blue/80'
                : 'bg-dark-border text-text-muted cursor-not-allowed'
            }`}
          >
            {step === totalSteps - 1 ? 'See Recommendation →' : 'Next Question →'}
          </button>
          <span className="text-xs text-text-muted ml-auto">
            {totalSteps - step - 1} question{totalSteps - step - 1 !== 1 ? 's' : ''} remaining
          </span>
        </div>
      </div>
    </div>
  )
}
