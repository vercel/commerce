// app/login/page.tsx
export default function LoginPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '40px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign In</h1>
      <form onSubmit={(e) => e.preventDefault()} > {/* Prevent actual submission for this mock */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="you@example.com"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            placeholder="Your password"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Sign In
        </button>
      </form>
      <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px' }}>
        <p style={{ marginBottom: '10px' }}>
          New customer? <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Create an account</a>
        </p>
        <p>
          <a href="/reset-password" style={{ color: '#007bff', textDecoration: 'none' }}>Forgot your password?</a>
        </p>
      </div>
    </div>
  );
}
