interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => (
  <div className='bg-red-100 text-red-800 p-4 rounded-md mb-4 flex justify-between items-center'>
    <span>
      <strong>Error:</strong> {message}
    </span>
    {onRetry && (
      <button
        onClick={onRetry}
        className='ml-6 underline hover:text-red-600 transition-colors'>
        Retry
      </button>
    )}
  </div>
);

export default ErrorBanner;
