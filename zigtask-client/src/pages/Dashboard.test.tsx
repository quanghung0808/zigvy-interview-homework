import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Dashboard from './Dashboard';
import * as socketIOClient from 'socket.io-client';

jest.mock('socket.io-client');

describe('Dashboard notifications', () => {
  it('shows a Snackbar when a taskDueSoon event is received', async () => {
    // Mock socket.io client
    const onMock = jest.fn();
    const socketMock = { on: onMock, disconnect: jest.fn() };
    (socketIOClient.io as jest.Mock).mockReturnValue(socketMock);

    render(<Dashboard />);

    // Find the handler for 'taskDueSoon'
    const handler = onMock.mock.calls.find(call => call[0] === 'taskDueSoon')[1];
    act(() => {
      handler({ title: 'Test Task', dueDate: new Date().toISOString() });
    });

    expect(await screen.findByText(/Task due soon: Test Task/)).toBeInTheDocument();
  });
}); 