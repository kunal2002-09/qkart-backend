const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { cartService } = require("../services");

/**
 * Fetch the cart details
 *
 * Example response:
 * HTTP 200 OK
 * {
 *  "_id": "5f82eebd2b11f6979231653f",
 *  "email": "crio-user@gmail.com",
 *  "cartItems": [
 *      {
 *          "_id": "5f8feede75b0cc037b1bce9d",
 *          "product": {
 *              "_id": "5f71c1ca04c69a5874e9fd45",
 *              "name": "ball",
 *              "category": "Sports",
 *              "rating": 5,
 *              "cost": 20,
 *              "image": "google.com",
 *              "__v": 0
 *          },
 *          "quantity": 2
 *      }
 *  ],
 *  "paymentOption": "PAYMENT_OPTION_DEFAULT",
 *  "__v": 33
 * }
 * 
 *
 */
const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUser(req.user);
  res.send(cart);
});

const addProductToCart = catchAsync(async (req, res) => {
  const cart = await cartService.addProductToCart(
    req.user,
    req.body.productId,
    req.body.quantity
  );

  res.status(httpStatus.CREATED).send(cart);
});

const updateProductInCart = catchAsync(async (req, res) => {
  // const { productId, quantity } = req.body;

  // if (quantity > 0) {
  //   const cart = await cartService.updateProductInCart(req.user, productId, quantity);
  //   res.send(cart);
  // } else {
  //   await cartService.deleteProductFromCart(req.user, productId);
  //   res.status(httpStatus.NO_CONTENT).send()
  // }
  if(req.body.quantity===0){
    await cartService.deleteProductFromCart(req.user,req.body.productId);
    return res.status(httpStatus.NO_CONTENT).send();
  }
  const cart = await cartService.updateProductInCart(req.user,req.body.productId,req.body.quantity) 
  res.status(httpStatus.OK).send(cart)
});

const checkout = catchAsync(async (req, res) => {
  // Get the user from the request object
  const user = req.user;

  // Call the checkout function in the cart service
  await cartService.checkout(user);

  // Send a success response
  res.status(httpStatus.NO_CONTENT).send()
});

module.exports = {
  getCart,
  addProductToCart,
  updateProductInCart,
  checkout,
};
