const { razorpayInstance } = require("../config/razorpay.config")

exports.createOrder = async (req, res) => {
    /*It's recommended to not fetch amount directly from client.
    It's suggested to fetch amount db using using courseId  */

    const { orderId, amount } = req.body;

    const options = {
        amount: amount * 100, // amount in paise
        currency: "INR",
        receipt: orderId,
        payment_capture: 1,
    };

    try {
        razorpayInstance().orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: "Internal server error"
                });
            }
            return res.status(200).json(order);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.verifyPayment = async (req, res) => {
    const { orderId, paymentId, signature } = req.body;

};