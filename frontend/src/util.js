// Use environment variable if set, fallback to production/development defaults
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  import.meta.env.PROD 
    ? "https://adventure-ai-backend.onrender.com/api"
    : "/api"
)