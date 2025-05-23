// app/my-page/page.tsx

export default function MyPage() {
  // Dummy data
  const orders = [
    { id: '12345', date: '2023-10-26', total: '$150.00', status: 'Shipped' },
    { id: '67890', date: '2023-11-05', total: '$75.50', status: 'Processing' },
    { id: '10112', date: '2023-11-15', total: '$220.00', status: 'Delivered' },
  ];
  const quotes = [
    { id: 'Q1001', date: '2023-10-20', total: '$500.00', status: 'Accepted' },
    { id: 'Q1002', date: '2023-11-01', total: '$1250.75', status: 'Pending' },
  ];
  const downloads = [
    { name: 'Product Manual X123.pdf', url: '#' },
    { name: 'Software License - MyProduct v2.txt', url: '#' },
    { name: 'Invoice_INV2023-10-26.pdf', url: '#' },
  ];
  const userProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    company: 'Innovate Solutions Ltd.',
    memberSince: '2022-01-15',
  };

  const sectionStyle = {
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee'
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '15px'
  };
  
  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left' as const // Explicitly type textAlign
  };
  
  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em'
  };


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '20px auto' }}>
      <h1 style={{ textAlign: 'center', color: '#222', marginBottom: '40px' }}>My Account</h1>

      {/* Order History Section */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Order History</h2>
        {orders.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableCellStyle}>Order ID</th>
                <th style={tableCellStyle}>Date</th>
                <th style={tableCellStyle}>Total</th>
                <th style={tableCellStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={tableCellStyle}>#{order.id}</td>
                  <td style={tableCellStyle}>{order.date}</td>
                  <td style={tableCellStyle}>{order.total}</td>
                  <td style={tableCellStyle}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no past orders.</p>
        )}
      </section>

      {/* My Quotes Section */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>My Quotes</h2>
        {quotes.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {quotes.map(quote => (
              <li key={quote.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                Quote #{quote.id} - Date: {quote.date} - Total: {quote.total} - Status: <span style={{ fontWeight: 'bold' }}>{quote.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no active quotes.</p>
        )}
      </section>

      {/* My Downloads Section */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>My Downloads</h2>
        {downloads.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {downloads.map((download, index) => ( // Added index for key as names might not be unique
              <li key={`${download.name}-${index}`} style={{ marginBottom: '8px' }}>
                <a href={download.url} download style={{ color: '#007bff', textDecoration: 'none' }}>
                  {download.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No downloads available.</p>
        )}
      </section>

      {/* Profile Information Section */}
      <section style={{ ...sectionStyle, borderBottom: 'none' }}>
        <h2 style={headingStyle}>My Profile</h2>
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>Name:</strong> {userProfile.name}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Company:</strong> {userProfile.company}</p>
          <p><strong>Member Since:</strong> {userProfile.memberSince}</p>
        </div>
        <button style={{ ...buttonStyle, marginTop: '15px' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Edit Profile
        </button>
      </section>
    </div>
  );
}
