export interface PendingCalculations {
  interestRate: number;
  downPayment: number;
  zipCode: string;
  homePrice: number;
  loanTerm: number;
}

interface ApprovalModalProps {
  isOpen: boolean;
  pendingCalculations: PendingCalculations | null;
  isProcessing: boolean;
  onApprove: () => void;
  onDeny: () => void;
}

export default function ApprovalModal({
  isOpen,
  pendingCalculations,
  isProcessing,
  onApprove,
  onDeny,
}: ApprovalModalProps) {
  if (!isOpen || !pendingCalculations) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-500 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Simulation Approval Required
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Please review the simulation parameters below
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
            The AI wants to run a mortgage simulation with the following parameters:
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">Home Price</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(pendingCalculations.homePrice)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">Down Payment</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(pendingCalculations.downPayment)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">Interest Rate</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {formatPercentage(pendingCalculations.interestRate)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">Loan Term</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {pendingCalculations.loanTerm} years
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">ZIP Code</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {pendingCalculations.zipCode}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 flex gap-3">
          <button
            onClick={onDeny}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Deny
          </button>
          <button
            onClick={onApprove}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium text-sm hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}
