# ElevenLabs Mock WebSocket Integration

This module provides a complete mock WebSocket system for ElevenLabs Conversational AI, allowing you to continue development when you don't have credits or want to work offline.

## Features

- 🎭 **Perfect Mock**: Mimics the real ElevenLabs WebSocket interface exactly
- 🔄 **Easy Toggle**: Switch between real and mock connections with a single flag
- 📝 **Realistic Data**: Generates realistic transcription responses with confidence scores
- 🔌 **Auto-Reconnect**: Supports connection recovery and error handling
- 🎯 **TypeScript**: Fully typed for better development experience
- 🛠️ **Dev Tools**: Built-in utilities for development and debugging

## Quick Start

### 1. Environment Setup

Create a `.env.local` file with your configuration:

```env
# For real ElevenLabs connection
VITE_ELEVENLABS_API_KEY=your_api_key_here
VITE_ELEVENLABS_VOICE_ID=your_voice_id_here

# For mock mode (useful during development)
VITE_USE_MOCK_WEBSOCKET=true
```

### 2. Basic Usage

```tsx
import { useVoiceAgent } from './hooks/use-voice-agent';
import { mockUtils } from './services/mockWebSocket';

function MyComponent() {
  const { 
    isConnected, 
    isConnecting, 
    isMockMode, 
    currentTranscription, 
    connect, 
    disconnect 
  } = useVoiceAgent();

  // Toggle mock mode programmatically
  const toggleMockMode = () => {
    if (mockUtils.isMockEnabled()) {
      mockUtils.disableMock();
    } else {
      mockUtils.enableMock();
    }
    window.location.reload(); // Refresh to apply changes
  };

  return (
    <div>
      <button onClick={isConnected ? disconnect : connect}>
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
      
      {isMockMode && <span>🎭 Mock Mode Active</span>}
      
      {currentTranscription && (
        <p>Current: {currentTranscription}</p>
      )}
    </div>
  );
}
```

### 3. Voice Orb Integration

The `VoiceOrb` component automatically uses the mock system:

```tsx
import VoiceOrb from './components/VoiceOrb';
import VoiceStatus from './components/VoiceStatus';

function MyApp() {
  return (
    <div>
      <VoiceOrb 
        size="large" 
        onVoiceStart={() => console.log('Voice started')} 
      />
      <VoiceStatus />
    </div>
  );
}
```

## Architecture

### Core Components

1. **MockWebSocket Class** (`src/services/mockWebSocket.ts`)
   - Implements the complete WebSocket interface
   - Generates realistic mock responses
   - Handles connection lifecycle events

2. **Voice Agent Hook** (`src/hooks/use-voice-agent.tsx`)
   - Manages WebSocket connections
   - Handles state management
   - Provides easy-to-use React interface

3. **ElevenLabs Configuration** (`src/config/elevenlabs.ts`)
   - Centralizes API configuration
   - Handles environment variables
   - Builds WebSocket URLs

4. **UI Components**
   - `VoiceOrb`: Interactive voice button with status indication
   - `VoiceStatus`: Connection status and transcription display

### Mock Response Types

The mock system generates these response types:

```typescript
interface MockTranscriptionResponse {
  type: 'transcription';
  transcription: {
    text: string;
    confidence: number;
    is_final: boolean;
    timestamp: number;
  };
}

interface MockConnectionResponse {
  type: 'connection';
  status: 'connected' | 'disconnected';
  session_id: string;
}
```

## Configuration Options

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_ELEVENLABS_API_KEY` | Your ElevenLabs API key | - |
| `VITE_ELEVENLABS_VOICE_ID` | Your ElevenLabs voice ID | - |
| `VITE_USE_MOCK_WEBSOCKET` | Force mock mode | `false` |

### Runtime Configuration

```typescript
import { mockUtils } from './services/mockWebSocket';

// Enable mock mode
mockUtils.enableMock();

// Disable mock mode
mockUtils.disableMock();

// Check if mock mode is enabled
const isMockEnabled = mockUtils.isMockEnabled();
```

## Mock Data Customization

You can customize the mock responses by modifying the `MOCK_TRANSCRIPTIONS` array in `src/services/mockWebSocket.ts`:

```typescript
const MOCK_TRANSCRIPTIONS = [
  "Your custom response here",
  "Another custom response",
  // Add more responses as needed
];
```

## Development Features

### Console Logging

The mock system provides detailed console logging:

- 🎭 Mock WebSocket events
- 🔗 Real WebSocket events
- 📨 Message sending/receiving
- ⚠️ Warnings and errors

### Visual Indicators

- **Mock Mode Badge**: Purple indicator on the voice orb
- **Connection States**: Different colors for different states
- **Status Panel**: Real-time connection information

### Error Simulation

The mock system can simulate various error conditions for testing:

```typescript
// In MockWebSocket class, you can add:
private _simulateError() {
  if (this.onerror) {
    const event = new Event('error');
    this.onerror(event);
  }
}
```

## Real vs Mock Comparison

| Feature | Real WebSocket | Mock WebSocket |
|---------|----------------|----------------|
| API Key Required | ✅ Yes | ❌ No |
| Credits Required | ✅ Yes | ❌ No |
| Audio Processing | ✅ Yes | 🎭 Simulated |
| Transcription | ✅ Real | 🎭 Predefined |
| Connection Latency | 🌐 Network | ⚡ Instant |
| Error Handling | 🌐 Real errors | 🎭 Simulated |

## Best Practices

### 1. Development Workflow

1. Start with mock mode enabled
2. Develop and test your UI components
3. Switch to real mode for final testing
4. Use environment variables for deployment

### 2. Error Handling

```typescript
const { error, clearError } = useVoiceAgent();

useEffect(() => {
  if (error) {
    console.error('Voice agent error:', error);
    // Handle error appropriately
  }
}, [error]);
```

### 3. State Management

```typescript
const { 
  connectionState, 
  isConnecting, 
  isConnected, 
  isReconnecting 
} = useVoiceAgent();

// Use these states to show appropriate UI
```

## Troubleshooting

### Common Issues

1. **Mock mode not working**
   - Check if `VITE_USE_MOCK_WEBSOCKET=true` is set
   - Verify localStorage with `mockUtils.isMockEnabled()`
   - Refresh the page after toggling

2. **Real mode connection fails**
   - Verify API key and voice ID are correct
   - Check browser console for error messages
   - Ensure you have ElevenLabs credits

3. **TypeScript errors**
   - Ensure all dependencies are installed
   - Check that `@types/react` is installed
   - Verify TypeScript configuration

### Debug Mode

Enable debug logging:

```typescript
// In browser console
localStorage.setItem('debug-voice-agent', 'true');
```

## Testing

### Unit Tests

```typescript
import { MockWebSocket } from './services/mockWebSocket';

describe('MockWebSocket', () => {
  it('should connect and send messages', async () => {
    const ws = new MockWebSocket('ws://test');
    
    const onOpen = jest.fn();
    ws.onopen = onOpen;
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(onOpen).toHaveBeenCalled();
    expect(ws.readyState).toBe(WebSocket.OPEN);
  });
});
```

### Integration Tests

```typescript
import { render, screen } from '@testing-library/react';
import { useVoiceAgent } from './hooks/use-voice-agent';

// Test components that use the voice agent
```

## Migration Guide

### From Real to Mock

1. Set `VITE_USE_MOCK_WEBSOCKET=true`
2. Refresh the application
3. Test all voice interactions

### From Mock to Real

1. Remove or set `VITE_USE_MOCK_WEBSOCKET=false`
2. Ensure API credentials are configured
3. Test with real ElevenLabs service

## API Reference

### useVoiceAgent Hook

```typescript
const {
  // State
  connectionState,
  isConnecting,
  isConnected,
  sessionId,
  lastMessage,
  error,
  messages,
  currentTranscription,
  isMockMode,
  
  // Actions
  connect,
  disconnect,
  sendMessage,
  clearMessages,
  clearError,
  
  // Utilities
  isReconnecting,
  canReconnect,
  reconnectAttempts,
  maxReconnectAttempts,
} = useVoiceAgent();
```

### mockUtils

```typescript
import { mockUtils } from './services/mockWebSocket';

mockUtils.enableMock();
mockUtils.disableMock();
mockUtils.isMockEnabled();
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

This mock WebSocket system is part of your project and follows the same license terms.