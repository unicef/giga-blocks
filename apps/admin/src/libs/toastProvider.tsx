import React ,{createContext, useState, useContext,useCallback} from 'react';
import { useSnackbar } from '@components/snackbar';
import {Alert, Snackbar} from '@mui/material';
// import { useSnackbar } from '@components/snackbar';



interface ToastContextType {
  showToast: (message: string, severity?: 'success' | 'info' | 'warning' | 'error') => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ''
  });

//   const { enqueueSnackbar } = useSnackbar();


  const showToast = useCallback((message: string, severity: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setSnackbar({
        open: true,
        message,
    })
  }, [setSnackbar]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ open: false, message: '' })} severity="info" sx={{ width: '100%' }}>
          {snackbar.message} 
        </Alert>
        </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
