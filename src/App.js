import * as Sentry from '@sentry/react';

function App() {
  // 1. Basic JavaScript Error
  const throwBasicError = () => {
    throw new Error("Basic JavaScript Error!");
  };

  // 2. TypeError (e.g., accessing undefined property)
  const throwTypeError = () => {
    const obj = undefined;
    console.log(obj.property); // TypeError: Cannot read property 'property' of undefined
  };

  // 3. Async Error (e.g., error in a Promise)
  const throwAsyncError = async () => {
    try {
      await Promise.reject(new Error("Async Error from Promise!"));
    } catch (error) {
      Sentry.captureException(error); // Manually capture async error
    }
  };

  // 4. Custom Error with Additional Context
  const throwCustomError = () => {
    const customError = new Error("Custom Error with Context!");
    Sentry.captureException(customError, {
      extra: {
        userId: "12345",
        action: "Clicked Custom Error Button",
        timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sentry React Error Demo</h1>
      <p>Click the buttons below to trigger different types of errors:</p>
      
      <button 
        onClick={throwBasicError} 
        style={{ margin: '10px', padding: '10px', backgroundColor: '#ff4d4d' }}
      >
        Trigger Basic Error
      </button>

      <button 
        onClick={throwTypeError} 
        style={{ margin: '10px', padding: '10px', backgroundColor: '#ffcc00' }}
      >
        Trigger TypeError
      </button>

      <button 
        onClick={throwAsyncError} 
        style={{ margin: '10px', padding: '10px', backgroundColor: '#3399ff' }}
      >
        Trigger Async Error
      </button>

      <button 
        onClick={throwCustomError} 
        style={{ margin: '10px', padding: '10px', backgroundColor: '#00cc66' }}
      >
        Trigger Custom Error
      </button>
    </div>
  );
}

export default App;