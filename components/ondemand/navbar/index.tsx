import Image from 'next/image';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/content/labcorp-ondemand/us/en">
          <Image
            src="https://via.placeholder.com/150x50?text=Labcorp+Logo"
            alt="Labcorp Logo"
            width={150}
            height={50}
          />
        </a>
      </div>

      <div className="navbar__links">
        <a href="/content/labcorp-ondemand/us/en/products" className="navbar__link">
          Shop Tests
        </a>
        <a href="/kit/register/code" className="navbar__link">
          Register Kit
        </a>
        <a
          href="https://patient.labcorp.com/portal/results/list"
          target="_blank"
          className="navbar__link"
        >
          View Results
        </a>
        <a href="/content/labcorp-ondemand/us/en/about-us" className="navbar__link">
          About
        </a>
      </div>

      <div className="navbar__auth">
        <span className="navbar__signin">
          <a href="https://login-patient.labcorp.com/oauth2/default/v1/authorize?...">Sign In</a>
        </span>
        <button className="navbar__signout">Sign Out</button>
      </div>

      <div className="navbar__search">
        <button className="search-toggle" title="Search">
          <Image
            src="https://via.placeholder.com/28?text=Search+Icon"
            alt="Search"
            width={28}
            height={28}
          />
        </button>
      </div>

      <div className="navbar__cart">
        <a href="/checkout/cart/">
          <Image
            src="https://via.placeholder.com/28?text=Cart+Items+Icon"
            alt="Cart Items"
            width={28}
            height={28}
            className="cart-icon"
          />
          <Image
            src="https://via.placeholder.com/28?text=Empty+Cart+Icon"
            alt="Empty Cart"
            width={28}
            height={28}
            className="empty-cart-icon"
          />
        </a>
      </div>

      <div className="navbar__burger">
        <button>
          <Image
            src="https://via.placeholder.com/20?text=Menu+Icon"
            alt="Menu"
            width={20}
            height={20}
          />
          <Image
            src="https://via.placeholder.com/20?text=Close+Icon"
            alt="Close"
            width={20}
            height={20}
          />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
