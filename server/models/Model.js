import bookModel from "./bookModel.js"
import userModel from "./userModel.js"
import bookUserModel from "./bookUserModel.js"
import authorModel from "./authorModel.js"
import categoriesModel from "./categoriesModel.js"
import LikeModel from "./LikeModel.js"

userModel.belongsToMany(bookModel, {
  through: bookUserModel,
  foreignKey: "userId",
})
bookModel.belongsToMany(userModel, {
  through: bookUserModel,
  foreignKey: "bookId",
})

userModel.belongsToMany(bookModel, {
  through: LikeModel,
  foreignKey: "userId",
});
bookModel.belongsToMany(userModel, {
  through: LikeModel,
  foreignKey: "bookId",
});


authorModel.hasMany(
  bookModel,
   { foreignKey: 'authorId' }
  );
bookModel.belongsTo(
  authorModel, 
  { foreignKey: 'authorId' }
);

categoriesModel.hasMany(bookModel, { foreignKey: 'categoryId' });
bookModel.belongsTo(categoriesModel, { foreignKey: 'categoryId' });

export { userModel, bookModel, bookUserModel, authorModel };