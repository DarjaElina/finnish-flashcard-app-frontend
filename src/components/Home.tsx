import Moose from "./Moose";

export default function Home() {
  return (
    <div>
      <Moose text="Welcome! This app helps you learn Finnish words in a fun and interactive way 🇫🇮✨" />

      <div className="moose-fact">
        <h2>Fun Finnish Fact</h2>
        <p>
          Did you know? In Finnish, <strong>“moose”</strong> is{" "}
          <strong>
            <em>hirvi</em>
          </strong>{" "}
          — and it’s a great word to start your vocabulary deck with! 💬
          <br />
          Singular: <em>hirvi</em> — Plural: <em>hirvet</em>
        </p>
      </div>
    </div>
  );
}
