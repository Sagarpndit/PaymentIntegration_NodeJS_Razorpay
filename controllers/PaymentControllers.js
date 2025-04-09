const { razorpayInstance } = require("../config/razorpay.config")
require("dotenv").config();
const crypto = require("crypto");

const creatRazorpayInstance = razorpayInstance();

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
        creatRazorpayInstance.orders.create(options, (err, order) => {
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
    const secret = process.env.RAZORPAY_SECRET_KEY;

    /* create hmac Object */
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(orderId + "|" + paymentId);

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment Verified"
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Payment not verified"
        })
    }

};