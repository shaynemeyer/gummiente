'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

function TestButton() {
  return (
    <Button onClick={() => console.log('hello')}>Hello from ShadCN UI</Button>
  );
}

export default TestButton;
