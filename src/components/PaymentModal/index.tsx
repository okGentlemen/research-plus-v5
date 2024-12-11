import React, { useState } from 'react';
import { Modal } from 'antd';
import { X } from 'lucide-react';
import { PaymentSection } from './PaymentSection';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  businessType: 'vip' | 'token';
  businessId: string;
  amount: number;
}

export function PaymentModal({ 
  open, 
  onClose, 
  businessType, 
  businessId, 
  amount 
}: PaymentModalProps) {
  // Add a key state to force PaymentSection remount when modal reopens
  const [modalKey, setModalKey] = useState(0);

  const handleClose = () => {
    onClose();
    // Increment key to force remount on next open
    setModalKey(prev => prev + 1);
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={400}
      closeIcon={<X className="w-4 h-4" />}
      className="payment-modal"
      destroyOnClose
    >
      <PaymentSection
        key={modalKey}
        businessType={businessType}
        businessId={businessId}
        amount={amount}
        onSuccess={handleClose}
      />
    </Modal>
  );
}