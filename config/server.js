import Razorpay from 'razorpay'
const instance = new Razorpay({
  key_id: 'rzp_test_66AU0WO3al46kq',
  key_secret: '59qtxRBMCoS5jq0n8p5MTGPG'
})

let options = {
  amount: 50000, // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  if(err) console.error(err);
});