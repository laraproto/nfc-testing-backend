import { useState, type FormEvent } from "react";

export function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (!res.ok) {
      alert(`Failed to create card: ${await res.text()}`);
      return;
    }

    const { link } = await res.json();

    location.href = link;
  };

  return (
    <div className="container my-4">
      <h1 className="mb-2">Create a card</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
