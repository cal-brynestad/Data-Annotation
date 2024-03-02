import React from 'react';

const CouponCard = ({ coupon }) => {
  return (
    <div className="coupon-card">
      <h2>{coupon.brand}</h2>
      <p>{coupon.description}</p>
      <p>Discount: {coupon.discount}%</p>
    </div>
  );
};

export default CouponCard;