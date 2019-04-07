export class User {
  constructor(
    public first_name: string,
    public last_name: string,
    public user_id: string,
    public u_email_address: string,
    public phone: string,

  ) { }

  static fromJSON(json: Object): User {
    return new User(
      json['first_name'],
      json['last_name'],
      json['user_id'],
      json['u_email_address'],
      json['phone']
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

