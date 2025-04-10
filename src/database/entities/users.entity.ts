import { Column, Entity } from 'typeorm';

import { GeneralEntity } from '../../shared/utils/base.entity';

@Entity({ name: 'users', schema: 'public2' })
export class UsersEntity extends GeneralEntity {
  @Column('varchar', { name: 'full_name', length: 255 })
  fullName: string;

  @Column('varchar', { name: 'username', length: 50, unique: true })
  username: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'status', default: 'active' })
  status: string;

  @Column('varchar', { name: 'role', default: 'user' })
  role: string;

  @Column('varchar', { name: 'email' })
  email: string;
}
