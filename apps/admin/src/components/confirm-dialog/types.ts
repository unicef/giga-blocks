// @mui
import { DialogProps } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export interface ConfirmDialogProps extends Omit<DialogProps, 'title'> {
  title: React.ReactNode;
  content?: string;
  action: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
}
