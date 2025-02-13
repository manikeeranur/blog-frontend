export interface HtmlBlogType {
  heading: string;
  content: string;
  example: string;
  menuName: string;
  contentType: string;
  createdAt?: Date;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface SignupDetails {
  username: string;
  email: string;
  password: string;
}
