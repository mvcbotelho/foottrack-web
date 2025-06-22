interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function Error({ 
  message = 'Ocorreu um erro inesperado', 
  onRetry, 
  className = '' 
}: ErrorProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg 
          className="w-8 h-8 text-red-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Erro
      </h3>
      
      <p className="text-gray-600 mb-4 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

// Componente para erro de rede
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <Error
      message="Erro de conexão. Verifique sua internet e tente novamente."
      onRetry={onRetry}
    />
  );
}

// Componente para erro de servidor
export function ServerError({ onRetry }: { onRetry?: () => void }) {
  return (
    <Error
      message="Erro no servidor. Tente novamente em alguns instantes."
      onRetry={onRetry}
    />
  );
} 