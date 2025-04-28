import Link from 'next/link'
import { CheckIcon, XIcon } from '@/components/icons'
import { FC } from 'react'

interface PriceProps {
  amount: number
  currency: 'USD' | 'EUR' | 'GBP'
  period: 'monthly' | 'yearly' | 'once'
}

interface FeatureProps {
  text: string
  included: boolean
}

interface ButtonProps {
  label: string
  link?: string // Make link optional
  variant: 'primary' | 'secondary'
}

interface PlanProps {
  name: string
  featured: boolean
  price: PriceProps
  description?: string
  features: FeatureProps[]
  button: ButtonProps
}

interface PricingTableProps {
  heading?: string
  description?: string
  layout: {
    style: 'default' | 'compact' | 'featured'
    columns: '2' | '3' | '4'
    spacing: 'compact' | 'medium' | 'spacious'
  }
  plans: PlanProps[]
}

const PricingTableServer: FC<PricingTableProps> = ({
  heading = '',
  description = '',
  layout = {
    style: 'default',
    columns: '3',
    spacing: 'medium',
  },
  plans = [],
}) => {
  // Validate required props
  if (!Array.isArray(plans) || plans.length === 0) {
    console.warn('PricingTableServer: No plans provided')
    return null
  }

  if (!layout || typeof layout !== 'object') {
    console.warn('PricingTableServer: Invalid layout configuration')
    return null
  }

  const columnClass = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }

  const spacingClass = {
    compact: 'gap-4 pb-8',
    medium: 'gap-6 pb-16',
    spacious: 'gap-8 pb-24',
  }

  function formatCurrency(price: PriceProps): string {
    if (!price || typeof price !== 'object') return ''

    const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£' }
    const periods: Record<string, string> = {
      monthly: '/mo',
      yearly: '/yr',
      once: '',
    }

    return `${symbols[price.currency] || '$'}${price.amount}${periods[price.period] || ''}`
  }

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(heading || description) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-5xl font-bold mb-2 mx-auto">
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {heading
                    .split(' ')
                    .slice(0, Math.ceil(heading.split(' ').length / 2))
                    .join(' ')}
                </span>{' '}
                <span style={{ color: 'var(--color-accent-primary)' }}>
                  {heading
                    .split(' ')
                    .slice(Math.ceil(heading.split(' ').length / 2))
                    .join(' ')}
                </span>
              </h2>
            )}
            {description && (
              <div className="flex justify-center">
                <p
                  className="text-xl max-w-3xl text-center"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pricing Plans Grid */}
        <div
          className={`grid grid-cols-1 ${columnClass[layout.columns]} ${
            spacingClass[layout.spacing]
          }`}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg ${
                layout.style === 'featured' && plan.featured
                  ? 'transform -translate-y-4 scale-105'
                  : ''
              }`}
              style={{
                background: 'var(--color-bg-secondary)',
                border: plan.featured
                  ? '2px solid var(--color-accent-primary)'
                  : '1px solid var(--color-border)',
              }}
            >
              {plan.featured && (
                <span
                  className="absolute top-0 right-0 px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg"
                  style={{ background: 'var(--color-accent-primary)' }}
                >
                  Popular
                </span>
              )}

              <div className="text-center mb-8">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {formatCurrency(plan.price)}
                  </span>
                </div>
                {plan.description && (
                  <p className="mt-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {feature.included ? (
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <XIcon className="w-5 h-5 text-red-500" />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.button.link || '#'} // Add default '#' if link is undefined
                className={`w-full text-center px-6 py-3 rounded-md font-medium transition-all duration-200
                  ${
                    plan.button.variant === 'primary'
                      ? 'hover:opacity-90'
                      : 'border-2 border-current hover:bg-white/10'
                  }`}
                style={{
                  background:
                    plan.button.variant === 'primary'
                      ? 'var(--color-accent-primary)'
                      : 'transparent',
                  color: 'var(--color-text-primary)',
                }}
              >
                {plan.button.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingTableServer
