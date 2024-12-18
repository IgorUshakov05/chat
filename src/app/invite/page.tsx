interface JoinLink {
  url?: string;
  password?: string;
}

export default function Invite({ url, password }: JoinLink) {
  return (
    <h1>
      Hello {url} {password}
    </h1>
  );
}
