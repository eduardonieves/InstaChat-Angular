export class User {
  constructor(
    public u_email_address: string,
    public first_name: string,
    public last_name: string,
    public user_id: string,
    public password: string,
  ) { }

  static fromJSON(json: Object): User {
    return new User(
      json['first_name'],
      json['last_name'],
      json['user_id'],
      json['u_email_address'],
      json['password']
    );
  }

  static fromList(list: Object[]): User[] {
    const users: User[] = [];
    list.map( item => {
      users.push(User.fromJSON(item));
    });
    return users;
  }
}

