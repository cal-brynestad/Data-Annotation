import './App.css';
import CouponCard from './component/card';
import coupon from './coupons/couptest';
import Navbar from './component/navbar';

const Home = () => {
 return (
 <div>
 <Navbar/>
  <div className="card-container">
   {coupon.map((coupon) => (
    <CouponCard key={coupon.brand} coupon={coupon} />
   ))}
  </div>
  </div>
 );
};

export default Home;
