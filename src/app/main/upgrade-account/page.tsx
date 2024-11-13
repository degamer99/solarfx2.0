import InvestmentPlan from '@/components/investmentPlan';

const upgradeData = [
  {
    title: "150 % ROI",
    subtitle: "Test",
    details: [
      'Minimum amount: $500',
      'Maximum amount: $2,999',
      '150% Every 10 Minutes for 5 Days',
      'Charges Amount:',
      'Duration: 5 Days',
    ],
        options: ['$ 500 - $ 2999']

  }
]

function Upgrade() {
  return (
    <div>
      <InvestmentPlan
        title="150 % ROI"
        subtitle="Test"
        details={[
          'Minimum amount: $500',
          'Maximum amount: $2,999',
          '150% Every 10 Minutes for 5 Days',
          'Charges Amount:',
          'Duration: 5 Days',
        ]}
        options={['$ 500 - $ 2999']}
      />

      <InvestmentPlan
        title="200 % ROI"
        subtitle="Gold Plan"
        details={[
          'Minimum amount: $1,000',
          'Maximum amount: $5,000',
          '200% Every 15 Minutes for 7 Days',
          'No Charges',
          'Duration: 7 Days',
        ]}
        options={['$ 1000 - $ 5000', '$ 1200 - $ 4500']}
      />
    </div>
  );
}
export default Upgrade;
