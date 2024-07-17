const sequelize = new Sequelize();

// store user data
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  //must hash password for better security
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: { type: DataTypes.STRING },
});

User.hasMany(Order);

//store item list and details
const Item = sequelize.define("item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  itemDetail: { type: DataTypes.TEXT },
  itemPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  openSaleDate: { type: DataTypes.DATE, allowNull: false },
  endSaleDate: { type: DataTypes.DATE, allowNull: false },
});

Item.hasOne(DiscountForItem);
Item.hasMany(BundleDetails);
Item.hasMany(OrderDetail);

//store promotion price or discount price of each item
const DiscountForItem = sequelize.define("discount_item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  discountPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
});

DiscountForItem.belongsTo(Item, {
  foreignKey: { name: "item_id", allowNull: false },
});

//store bundle and text details
const Bundle = sequelize.define("bundle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bundleName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  bundleDetail: { type: DataTypes.TEXT },
  bundlePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  openSaleDate: { type: DataTypes.DATE, allowNull: false },
  endSaleDate: { type: DataTypes.DATE, allowNull: false },
});

Bundle.hasMany(BundleDetails);
Bundle.hasMany(OrderDetail);

//store bundle items
const BundleDetails = sequelize.define("bundle_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

BundleDetails.belongsTo(Item, {
  foreignKey: { name: "item_id", allowNull: false },
});
BundleDetails.belongsTo(Bundle, {
  foreignKey: { name: "bundle_id", allowNull: false },
});

//store order of user and date
const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Order.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
});
Order.hasMany(OrderDetail);

//store item that included in order
const OrderDetail = sequelize.define("order_detail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

OrderDetail.belongsTo(Item, {
  foreignKey: { name: "item_id", allowNull: true },
});
OrderDetail.belongsTo(Bundle, {
  foreignKey: { name: "bundle_id", allowNull: true },
});
OrderDetail.belongsTo(Order, {
  foreignKey: { name: "order_id", allowNull: false },
});
OrderDetail.hasOne(ItemCode);

//store code that produce after order was created
const ItemCode = sequelize.define("item_code", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ItemCode.belongsTo(OrderDetail, {
  foreignKey: { name: "order_details_id", allowNull: false },
});
