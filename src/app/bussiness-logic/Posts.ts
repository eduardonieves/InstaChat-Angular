export class Posts {
  constructor(
    public hashtag_name: string,
    public image_file: string,
    public p_created_by: string,
    public post_date: string,
    public post_id: string,
    public post_caption: string,
    public likes: number,
    public dislikes: number,
    public username: string

  ) { }

  static fromJSON(json: Object): Posts {
    return new Posts(
      json['hashtag_name'],
      json['image_file'],
      json['p_created_by'],
      json['post_date'],
      json['post_id'],
      json['post_caption'],
      0,
      0,
      ''
    );
  }

  static fromList(list: Object[]): Posts[] {
    const users: Posts[] = [];
    list.map( item => {
      users.push(Posts.fromJSON(item));
    });
    return users;
  }
}

