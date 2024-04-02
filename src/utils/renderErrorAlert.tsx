import { Alert } from "@mui/material";

export const renderErrorAlert = (error: Error | undefined, context: string) => (
  error && (
    <Alert severity= "error" style = {{ marginBottom: '1rem' }}>
      Error loading { context }: { error.message }
    </Alert>
  )
);
