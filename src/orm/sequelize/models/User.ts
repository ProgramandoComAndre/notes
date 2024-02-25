import { DataTypes, Model } from 'sequelize'
import sequelize from '../../../../sequelize' // Adjust the path to your Sequelize instance

// Define User model interface
interface UserAttributes {
  id: string
  username: string
  email: string
  password: string
}

// Extend the Model class and specify the type for the instance
export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string
  public username!: string
  public email!: string
  public password!: string
}

// Initialize the User model with attributes and options
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
)


