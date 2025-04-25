import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProfileEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
