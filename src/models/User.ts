import {
  Model,
  Table,
  Column,
  DataType,
  IsUUID,
  Default,
  PrimaryKey,
  Unique,
  NotNull,
} from 'sequelize-typescript';
import { now } from 'sequelize/types/utils';

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = 'users' as string;
  public static USER_ID = 'id' as string;
  public static USER_NAME = 'name' as string;
  public static USER_EMAIL = 'email' as string;
  public static USER_PASSWORD = 'password' as string;

  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_NAME,
    allowNull: false,
  })
  name!: string;

  @Unique
  @Column({
    type: DataType.STRING(255),
    field: User.USER_EMAIL,
    allowNull: false,
  })
  email!: string;

  @NotNull
  @Column({
    type: DataType.STRING(255),
    field: User.USER_PASSWORD,
    allowNull: false,
  })
  password!: string;

  // timestamps
  // @Default(now('postgres'))
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: string;

  // @Default(now('postgres'))
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: string;
}
