import { BaseApi } from "./BaseApi";

// then((response) => {
//   if(response.ok){

//   }else{
//     toast.error('Request Failed')
//   }
// })

let token = localStorage.getItem("token");


// Function for user login
const UserLogin = (email, password) =>
  BaseApi.post("user/login", {
    email: email,
    password: password,
  });

// Function for user registration
const Register = (firstName, lastName, email, password, subscribe) =>
  BaseApi.post(
    "user/register",
    {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      subscribe,
    },
    {}
  );

// Function to get all products
const GetAllProduct = (email, date) => BaseApi.get("product/get/all", {});

// Function to get all products based on user id and pagination
const GetAllProductUserid = (id, page) =>
  BaseApi.get(
    "product/get/all?id=" + id,
    {
      page: page,
    },
    {}
  );

// Function to get a list of all customers
const GetAllCustomerList = () => BaseApi.get("user/list", {});

// Function to get all products based on user id and pagination with fixed per page limit
const GetAllProductpaginationUserid = (id, val) =>
  BaseApi.get(
    "product/get/all?id=" + id + "&perPage=10&currentPage=" + val,
    {}
  );

// Function to get all product categories
const GetAllProductcategory = (email, date) => BaseApi.get("category/list", {});

// Function to get a single category based on its ID
const GetSinglecategory = (id) => BaseApi.get("product/category/" + id, {});

// Function to get filtered product data
const GetFilterData = () => BaseApi.get("product/filterallKey", {});

// Function to get a single category based on its ID and user ID
const GetSinglecategory1 = (id, userid) =>
  BaseApi.get("product/category/" + id + "?id=" + userid, {});

// Function to search for products using smart search and pagination
const GetAllProductSerch = (data, page) =>
  BaseApi.post(
    "product/smartsearch",
    {
      searchString: data,
      page: page,
      filters: {
        condition: [],
        category: [],
        brand: [],
        series: [],
        model: [],
      },
    },
    {}
  );

// Function to add inventory data for a product
const GetAllProductinventory = (id, data, productId, Unit, Total, QTY) =>
  BaseApi.post(
    "inventory/add",
    {
      admin: id,
      productId: productId,
      ordernumber: data.Ordernumber,
      orderNotes: data.OrderNotes,
      supplier: data.Supplier,
      qty: QTY,
      total: Total,
      unit_cost: Unit,
    },
    {}
  );

// Function to get filtered product data based on sorting
const getFilteredData = (sort) =>
  BaseApi.post(
    "product/sort",
    {
      sort: sort,
    },
    {}
  );

// Function to get products based on various filters including search, sorting, and conditions
const GetAllcategorySerch = (
  search,
  sorting,
  condition,
  chipset,
  brand,
  series,
  model,
  price,
  customFilterPrice
) =>
  BaseApi.post(
    "product/filter",
    {
      filters: {
        type: condition,
        chipset: chipset,
        brand: brand,
        series: series,
        model: model,
        price: price,
        sortby: sorting,
        searchString: search,
        custom: customFilterPrice,
      },
    },
    {}
  );

// Function to get products based on filters like condition, chipset, brand, series, model
const GetAllProductFilter = (condition, chipset, brand, series, model) =>
  BaseApi.post(
    "product/filter",
    {
      filters: {
        type: condition,
        chipset: chipset,
        brand: brand,
        series: series,
        model: model,
      },
    },
    {}
  );

// Function to get related products based on a specific brand
const GetAllRelatedProduct = (brand) =>
  BaseApi.post(
    "product/filter",
    {
      searchString: "",
      filters: {
        brand: brand,
      },
    },
    {}
  );

// Function to get details of a single product based on its ID
const GetSingleProductData = (id) => BaseApi.get("product/get/" + id, {});

// Function to get authentication status of an order by its ID
const getAuthenticateStatus = (id) =>
  BaseApi.get("order/getAuthStatusByOrderId?id=" + id, {});

// Function to get details of a single product based on its ID and user ID
const HandleGetSingleUserProduct = (id, userId) =>
  BaseApi.get("product/get/" + id + "?id=" + userId, {});

// Function to add a product to user's favorites
const AddtoFevreat = (prodid, id) =>
  BaseApi.post(
    "user/addtofav/" + id,
    {
      productId: prodid,
    },
    {}
  );

// Function to remove a product from user's favorites
const RemovetoFevreat = (prodid, id) =>
  BaseApi.post(
    "user/removefromfav/" + id,
    {
      productId: prodid,
    },
    {}
  );

// Function to mark an order authentication as failed
const FailAuthentication = (reason, comment, waiveFee, status, orderId) =>
  BaseApi.post(
    "order/authShippment",
    {
      reason,
      comment,
      waiveFee,
      status,
      orderId,
    },
    {}
  );

// Function to mark an order authentication as passed
const PassAuthentication = (
  reason,
  comment,
  waiveFee,
  status,
  passStatus,
  sellerStatus,
  orderId
) =>
  BaseApi.post(
    "order/authShippment",
    {
      reason,
      comment,
      waiveFee,
      status,
      deliveryStatus: passStatus,
      sellerStatus,
      orderId,
    },
    {}
  );

// Function to get user's favorite list
const favouriteList = (id) => BaseApi.get("user/fav/list/" + id, {});

// Function to get shipping data for a specific order
const getShippingData = (id) =>
  BaseApi.get("order/getOrderDetailByOrderId/" + id, {});

// Function to get data of a single user based on their ID
const getSingleUserData = (id) => BaseApi.get("user/single/" + id, {});

// Function to create a new product
const Createproduct = (form) => BaseApi.post("product/add", form, {});

// Function to update shipping label data
// ,buyerStatus,sellerStatus
const updateShippingLabelData = (
  userId,
  id,
  adminStatus,
  buyerStatus,
  sellerStatus
) =>
  BaseApi.post(
    "order/createlabelByUser",
    { userId, orderId: id, adminStatus, buyerStatus, sellerStatus },
    {}
  );

// Function to update shipping status of an order
const updateShippingStatus = (id, shipmentId, rateId, status) =>
  BaseApi.post(
    "order/buyShipment",
    {
      orderId: id,
      deliveryStatus: status,
      shipmentId: shipmentId,
      rateId: rateId,
    },
    {}
  );

// Function to get shipping status data
const getShipStatusData = (status) =>
  BaseApi.post("order/getShippedList", { deliveryStatus: status }, {});

// Function to update product details
const Updateproduct = (id, form) =>
  BaseApi.patch("product/update/" + id, form, {});

// Function to delete a product
const Deleteproduct = (id, Ask, Bid) =>
  BaseApi.patch(
    "product/update/" + id,
    { id: id, new_second_hand_house_ask: Ask, new_second_hand_house_bid: Bid },
    {}
  );

// Function to update user's first name and last name
const updateSingleUserName = (id, firstname, lastName) =>
  BaseApi.patch(
    "user/update/" + id,
    {
      firstname,
      lastname: lastName,
    },
    {}
  );

// Function to update user's phone number
const updateSingleUserPhone = (id, phone) =>
  BaseApi.patch(
    "user/update/" + id,
    {
      phone,
    },
    {}
  );

// Function to update user's shipping address
const updateSingleUserData = (id, street, city, state, country, postal_code) =>
  BaseApi.patch(
    "user/update/" + id,
    {
      shipping_address: {
        street,
        city,
        state,
        country,
        postal_code,
      },
    },
    {}
  );

// Function to update user's password
const updatePassword = (id, password, oldPassword) =>
  BaseApi.patch(
    "user/update/" + id,
    {
      password,
      oldPassword,
    },
    {}
  );

// Function to update user's email
const updateEmail = (id, email) =>
  BaseApi.patch(
    "user/update/" + id,
    {
      email,
    },
    {}
  );

// Function to create a bid
const Bid = (
  productId,
  userId,
  bidAmount,
  total,
  discount,
  processingFee,
  salesTax,
  expiration,
  shipping
) =>
  BaseApi.post(
    "bid/create",
    {
      productId: productId,
      userId: userId,
      bidAmount: bidAmount,
      salesTax,
      processingFee,
      shippingFee: shipping,
      subTotal: total,
      bidStatus: true,
      testingFee: "25.00",
    },
    {}
  );

// Function to get bid details for a specific product
const getBid = (productId) => BaseApi.get("bid/show/" + productId, {});

// Function to get a list of bids by a user
const getBidList = (userId) => BaseApi.get("bid/list/" + userId, {});

// Function to create an ask
const ask = (
  productId,
  userId,
  transactionFee,
  processingFee,
  askAmount,
  total,
  expiration,
  shipping
) =>
  BaseApi.post(
    "ask/create",
    {
      productId: productId,
      userId: userId,
      askAmount: askAmount,
      transactionFee,
      processingFee,
      shippingFee: shipping,
      subTotal: total,
      askStatus: true,
      expiration,
    },
    {}
  );

// Function to get product data grouped by SKU
const updateMultiProductData = (sku) =>
  BaseApi.get("product/get/groupbysku?sku=" + sku, {});

// Function to get the highest bid for a product
const handleHighestBid = (id) => BaseApi.get("bid/show-highest/" + id, {});

// Function to get the lowest ask for a product
const handleLowestBid = (id) => BaseApi.get("ask/show-lowest/" + id, {});

// Function to get a list of asks by a user
const askList = (userId) => BaseApi.get("ask/list/" + userId, {});

// Function to update asks status
const updateAskList = (askIds , status) => BaseApi.post("ask/updateAskStatusById/", 
{
  askIds: askIds,
  status: status
},
{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


// Function to duplicate bids/asks
const duplicateBidsAsks = (ids , type) => BaseApi.post("bid/createDuplicate/", 
{
  productList: ids,
  type: type
},
{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Function to update the Quantity and Expiration Asks

const updateExpirationAndQuantity = (id, Qty , time) => BaseApi.post("ask/updateAskExpirationById/"+id, 
{
  time: time,
  quantity: Qty
},
{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


// Function to reset user's password
const resetPassword = (password, token) =>
  BaseApi.post(
    "user/setnewpassword",
    {
      newPassword: password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Function to get SKU data
const GetSkuData = () => BaseApi.get("product/get/sku-model", {});

// Function to get order tracking details
const getOrderTracking = (id) => BaseApi.get("/order/getOrderById/" + id, {});

// Function to get ask details for a specific product
const getask = (productId) => BaseApi.get("ask/show/" + productId, {});

// Function to initiate the password recovery process
const ForgotPassword = (email) =>
  BaseApi.post("user/forgotpassword", { email: email }, {});

// Function to get a list of all categories
const GetAllcategoryList = (category) =>
  BaseApi.get("product/filterKey/63ff36fb23ad0386e761641f", {});

// Function to get a list of all orders
const getOrder = () => BaseApi.get("order/get/all", {});

// Function to get paginated order data
const getOrderPaginationData = (page) =>
  BaseApi.get("order/get/all?pageNumber=" + page, {});

// Function to get filtered order data
const getOrderFilterData = (data) => BaseApi.get("order/get/all", { data }, {});

// Function to get details of a single order
const getSingleOrderData = (id) =>
  BaseApi.post("order/details", { orderId: id }, {});

// Function to filter orders based on status and page number
const orderFilter = (status, page) =>
  BaseApi.post(
    "order/getFilterList",
    { deliveryStatus: status, pageNumber: page },
    {}
  );

// Function to get a list of lowest asks by a user for a specific product
const GetAskBidList = (product, user) =>
  BaseApi.post(
    "ask/get-lowestaskby-userid",
    { productId: product, userId: user },
    {}
  );

// Function to create a new order for a product
const createOrder = (productId, userId, total) =>
  BaseApi.post(
    "order/newadd",
    {
      user: userId,
      productId: productId,
      payment_method: "PhonePay",
      country: "India",
      city: "Sonipat",
      pincode: "131001",
      address: "HIG 265 Near IBY Hospital",
      total_price: total,
    },
    {}
  );

// Function to create a new second-hand order for a product
const CreateSecondHandOrder = (productId, userId, bidAmount, type) =>
  BaseApi.post(
    "order/second-hand-add",
    {
      user: userId,
      productId: productId,
      bidAmount: bidAmount,
      userType: type,
    },
    {}
  );

// Function to get pending order data for a seller
const getPendingData = (id) =>
  BaseApi.get("order/get/allsellerorder/" + id, {});

// Function to get the total count of orders
const getOrderCount = () => BaseApi.get("order/getOrderCount", {});

// Function to get order data for a specific buyer
const getOrderData = (id) =>
  BaseApi.get("order/getOrderByBuyerId?buyerId=" + id, {});

// Function to get shipping fee data for a user
const getshippingFee = (userid) =>
  BaseApi.get("order/getshippingFeeByuserId/?userId=" + userid, {});

// Function to create a new batch for products
const createBatch = (batch, id, data) =>
  BaseApi.post("batch/createbatch", { batch, userId: id, pageType: data }, {});

// Function to handle user subscription
const handleSubscribe = (id, subscribe) =>
  BaseApi.patch("user/update/" + id, { subscribe }, {});

// Function to handle card creation and association with a user
const handleCard = (id, email) =>
  BaseApi.patch("/user/createAccount/" + id, { email }, {});

// Function to handle card details for a specific order
const handleCardDetails = (id) => BaseApi.post("/order/addCard/" + id, {});

// Function to get card data associated with a user
const getCardData = (id) => BaseApi.get("/order/fetchCardByUserId/" + id, {});

// Function to get package data for a user
const getPackageData = (id) => BaseApi.get("/user/single/"+id, {});

// Function to get Stripe card data for a user
const getStripeCardData = (id) =>
  BaseApi.get("/order/fetchConnectAccountByUserId/" + id, {});

// Function to handle updating user's package dimensions
const handleUpdatePackage = (id, length, breadth, height, weight) =>
  BaseApi.patch("/user/update/" + id, { length, breadth, height, weight });

// Function to handle updating user's shipping address
const handleUpdateAddress = (id, street, city, state, country, zipcode) =>
  BaseApi.patch("/user/update/" + id, {
    shipping_address: { street, city, state, country, postal_code: zipcode },
  });

// Function to get all data for a single customer
const getSingleCustomerAllData = (id) =>
  BaseApi.post("/user/getUserById/" + id, {},);

// Function to get a list of category banners
const getCategoryBannerList = () => BaseApi.get("/admin/getBannerCategory", {});

// Function to get a list of banners for a specific category
const getBannerList = (id) => BaseApi.get("/admin/getBannerById?id=" + id, {});

// Function to create a new banner image
const createBanner = (id, data) =>
  BaseApi.post("/admin/addBannerImage/" + id, data);

// Function to update banner image data
const updateBannerData = (bannerId, data) =>
  BaseApi.post("/admin/updateBannerImageById/" + bannerId, data);

// Function to delete multiple banners by their IDs
const multideletebanner = (id) =>
  BaseApi.post("/admin/deleteByBannerId", { id: id });

// Function to update banner's active and inactive status
const updateBanner = (id, active, inActive) =>
  BaseApi.post("/admin/updateByBannerId", {
    id: id,
    active: active,
    inActive: inActive,
  });

// Function to search for inactive banners
const searchInactiveBanner = (data) =>
  BaseApi.post("/admin/searchBanner", { search: data });

// Function to create a new filter tab name
const createFilterTabName = (
  tabnameTaxt,
  FilterOnCModal,
  filterTabData,
  type
) =>
  BaseApi.post("/admin/createFilterTabName", {
    tabName: tabnameTaxt,
    filterName: FilterOnCModal,
    filterId: filterTabData,
    filterType: type,
  });

// Function to get a list of all tab names based on filter type
const getAllTabName = (data) =>
  BaseApi.get("/admin/fetchAllFilter?filterType=" + data, {});

// Function to get tag name based on ID
const getTagName = (id) =>
  BaseApi.post("/admin/fetchDataBasedOnFilter", { id });

// Function to get customer's tag names based on their ID
const getCustomerTagName = (id) =>
  BaseApi.get("/admin/filterByUserId?id=" + id, {});

// Function to get date-wise filtered order data
const getdatewiseFilterData = (current, previous) =>
  BaseApi.post("/admin/getAllOrderData", { Date: current, previous });

// Function to update Express Stripe account information
const updateExpressStripeAccount = (data) =>
  BaseApi.post("/user/updateConnectAccount/" + data, {});

// Function to remove a filter by its name and associated tab
const removeFilter = (data, filter) =>
  BaseApi.post("/admin/removeTagByName", { name: data, tab: filter }, {});

// Function to update banner images and their status
const updateBannerImages = (id, data, type) =>
  BaseApi.post("/admin/addBanner", { id, status: data, type }, {});

// Function to get a list of all banners based on type
const getBannerAllList = (data) =>
  BaseApi.get("/admin/fetchBanner?type=" + data, {});

// Function to handle switching seller for an order
const handlewithnewseller = (id) =>
  BaseApi.post("/admin/changeSeller", { orderId: id });

// Function to handle refunding to a buyer based on charge ID
const handlebuyerRefund = (chargeId) =>
  BaseApi.post("/admin/refundToBuyer", { chargeId });

// Function to get banner name based on its ID
const getBannerNameById = (id) =>
  BaseApi.post("/admin/getCategoryNameById/" + id, {});

// Function to add a banner timer
const addBannerTimer = (time) => BaseApi.post("/admin/addBannerTime", { time });

// Function to update banner's count and rate
const updateBannerCountRate = (id, pageCount, imageCount) =>
  BaseApi.post("admin/updateImageCountById", {
    id: id,
    pageCount: pageCount,
    imageCount: imageCount,
  });

// Function to get the main banner's image count
const getMainBannerImageCount = (id) =>
  BaseApi.get("/admin/fetchImageById?id=" + id, {});

// Function to get data for creating a label
const getCreateLabelData = (id) =>
  BaseApi.post("/order/createPrintLabel", { id });

// Function to delete a product from a selling tab by its ID
const deleteSellingTabProduct = (id) => BaseApi.post("/ask/deleteById", { id });

// Function to update an order's shipping address by its ID
const updateOrderShippingAddress = (id, street, city, state, zipCode) =>
  BaseApi.post("/order/updateOrderById/" + id, {
    city: city,
    state: state,
    street: street,
    postal_code: zipCode,
  });

// Function to update banner sorting order
const bannersorting = (data) =>
  BaseApi.post("/admin/updateBannerSortOrder", { bannerArray: data });

// Function to update batch status
const updateBatch = (data, productId, userId) =>
  BaseApi.put("/batch/updateBatchByUserId/" + userId, {
    status: data,
    productIds: productId,
  });

const getBestDealProducts = () =>
  BaseApi.get("/product/fetchBestDealProduct", {});

const getMostPopularProducts = () =>
  BaseApi.get("/product/getMostViewedProduct", {});

const getRecentlyViewedProducts = (id) =>
  BaseApi.get("/product/getRecenltyViewedProductByUserId?id=" + id, {});

const updateRecentlyViewedProduct = (id, productId) =>
  BaseApi.patch("/product/updateRecenltyViewedProductById/" + id, {
    productId,
  });

const updateMostPopularProduct = (id) => {
  BaseApi.post("/product/updateMostViewedProductById/" + id, {});
};

const updateVisitPageCount = (data) =>
  BaseApi.post("/admin/updatepageCountOnPageLoad", { pageCount: data });


const checkBatchStatus = (user_id) =>
  BaseApi.post("/batch/checkBatchStatus" , {userId : user_id })

export default {
  UserLogin,
  updateMultiProductData,
  Register,
  getBannerNameById,
  updateMostPopularProduct,
  updateRecentlyViewedProduct,
  getRecentlyViewedProducts,
  handlebuyerRefund,
  handlewithnewseller,
  getMostPopularProducts,
  getBestDealProducts,
  updateBatch,
  updateVisitPageCount,
  updateOrderShippingAddress,
  getCreateLabelData,
  getMainBannerImageCount,
  bannersorting,
  getBannerAllList,
  addBannerTimer,
  deleteSellingTabProduct,
  updateBannerCountRate,
  GetAllProduct,
  updateBannerData,
  getCustomerTagName,
  removeFilter,
  updateBannerImages,
  updateExpressStripeAccount,
  getdatewiseFilterData,
  getTagName,
  GetSinglecategory,
  getAllTabName,
  GetAllProductSerch,
  GetAskBidList,
  GetAllProductcategory,
  GetSingleProductData,
  AddtoFevreat,
  handleUpdateAddress,
  RemovetoFevreat,
  GetAllcategorySerch,
  GetAllProductUserid,
  favouriteList,
  GetAllProductinventory,
  Createproduct,
  Updateproduct,
  GetSinglecategory1,
  Bid,
  getFilteredData,
  ask,
  GetAllCustomerList,
  getBid,
  getask,
  askList,
  updateAskList,
  duplicateBidsAsks,
  updateExpirationAndQuantity,
  getSingleUserData,
  getBidList,
  updateSingleUserData,
  GetAllcategoryList,
  HandleGetSingleUserProduct,
  handleHighestBid,
  handleLowestBid,
  GetAllRelatedProduct,
  Deleteproduct,
  GetFilterData,
  GetAllProductFilter,
  GetSkuData,
  ForgotPassword,
  updatePassword,
  resetPassword,
  createOrder,
  CreateSecondHandOrder,
  getOrder,
  getSingleOrderData,
  getPendingData,
  FailAuthentication,
  PassAuthentication,
  getShippingData,
  updateShippingLabelData,
  getShipStatusData,
  updateShippingStatus,
  getOrderPaginationData,
  getOrderFilterData,
  orderFilter,
  getOrderCount,
  getOrderData,
  getshippingFee,
  getAuthenticateStatus,
  getOrderTracking,
  updateSingleUserName,
  updateSingleUserPhone,
  createBatch,
  handleCard,
  handleSubscribe,
  updateEmail,
  handleCardDetails,
  getCardData,
  getStripeCardData,
  handleUpdatePackage,
  getPackageData,
  getSingleCustomerAllData,
  getCategoryBannerList,
  getBannerList,
  createBanner,
  multideletebanner,
  updateBanner,
  searchInactiveBanner,
  createFilterTabName,
  checkBatchStatus
};
