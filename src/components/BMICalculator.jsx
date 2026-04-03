import { useState } from 'react'
import { Calculator, RotateCcw } from 'lucide-react'

export default function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)

  const calculate = (e) => {
    e.preventDefault()
    if (weight && height) {
      const h = parseFloat(height) / 100
      const result = (parseFloat(weight) / (h * h)).toFixed(1)
      setBmi(parseFloat(result))
    }
  }

  const reset = () => {
    setWeight('')
    setHeight('')
    setBmi(null)
  }

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#888888', advice: 'Focus on calorie surplus and strength training.' }
    if (bmi < 25) return { label: 'Normal', color: '#C9A84C', advice: 'Great shape! Maintain with regular exercise.' }
    if (bmi < 30) return { label: 'Overweight', color: '#a8893e', advice: 'Add cardio and adjust your diet for results.' }
    return { label: 'Obese', color: '#7a6b30', advice: 'Consult a trainer for a personalized fitness plan.' }
  }

  const category = bmi ? getCategory(bmi) : null

  return (
    <div className="bmi-calculator glass-card">
      <div className="bmi-calculator__header">
        <Calculator size={24} className="text-accent" />
        <h3>BMI Calculator</h3>
      </div>
      <form onSubmit={calculate} className="bmi-calculator__form">
        <div className="bmi-calculator__field">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            min="20"
            max="300"
            required
            id="bmi-weight"
          />
        </div>
        <div className="bmi-calculator__field">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            min="100"
            max="250"
            required
            id="bmi-height"
          />
        </div>
        <div className="bmi-calculator__actions">
          <button type="submit" className="btn btn--primary btn--full" id="bmi-calculate-btn">
            Calculate BMI
          </button>
          {bmi && (
            <button type="button" onClick={reset} className="btn btn--secondary" id="bmi-reset-btn">
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </form>

      {bmi && category && (
        <div className="bmi-calculator__result">
          <div className="bmi-calculator__score" style={{ color: category.color }}>
            {bmi}
          </div>
          <div className="bmi-calculator__category" style={{ color: category.color }}>
            {category.label}
          </div>
          <p className="bmi-calculator__advice">{category.advice}</p>
          <div className="bmi-calculator__scale">
            <div className="bmi-calculator__scale-bar">
              <div
                className="bmi-calculator__scale-marker"
                style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }}
              />
            </div>
            <div className="bmi-calculator__scale-labels">
              <span>15</span><span>20</span><span>25</span><span>30</span><span>40</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bmi-calculator {
          padding: var(--space-2xl);
          max-width: 400px;
        }
        .bmi-calculator__header {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
        }
        .bmi-calculator__header h3 {
          font-size: var(--fs-lg);
        }
        .bmi-calculator__form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .bmi-calculator__field label {
          display: block;
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xs);
          font-weight: var(--fw-medium);
        }
        .bmi-calculator__actions {
          display: flex;
          gap: var(--space-sm);
          margin-top: var(--space-sm);
        }
        .bmi-calculator__result {
          margin-top: var(--space-xl);
          padding-top: var(--space-xl);
          border-top: 1px solid var(--color-border);
          text-align: center;
        }
        .bmi-calculator__score {
          font-family: var(--font-heading);
          font-size: var(--fs-5xl);
          font-weight: var(--fw-bold);
          line-height: 1;
        }
        .bmi-calculator__category {
          font-family: var(--font-heading);
          font-size: var(--fs-lg);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: var(--space-sm);
        }
        .bmi-calculator__advice {
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          margin-top: var(--space-md);
        }
        .bmi-calculator__scale {
          margin-top: var(--space-lg);
        }
        .bmi-calculator__scale-bar {
          height: 8px;
          border-radius: var(--radius-full);
          background: linear-gradient(90deg, #888888 0%, #C9A84C 30%, #a8893e 60%, #7a6b30 100%);
          position: relative;
        }
        .bmi-calculator__scale-marker {
          position: absolute;
          top: -4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--color-bg-primary);
          box-shadow: var(--shadow-sm);
          transform: translateX(-50%);
          transition: left var(--transition-slow);
        }
        .bmi-calculator__scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: var(--fs-xs);
          color: var(--color-text-muted);
          margin-top: var(--space-sm);
        }
      `}</style>
    </div>
  )
}
