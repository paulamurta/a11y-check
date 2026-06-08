import "./App.css";

import iconEdit from "./assets/icons/icon-edit.svg";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Input } from "./components/Input/Input";

export default function App() {
  return (
    <div className="app" data-page-file={import.meta.url}>
      <header className="hero">
        <span className="badge">Shift-Left Accessibility Testing</span>

        <h1 className="title">Accessibility Testing Environment</h1>

        <p className="description">
          React application built for automated accessibility validation in
          reusable components.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Buttons</h2>

          <p>
            Comparison between accessible and inaccessible button
            implementations.
          </p>
        </div>

        <div className="content-grid">
          {/* valid */}
          <Button label="Save" />

          {/* invalid */}
          <Button iconUrl={iconEdit} />

          {/* invalid */}
          <Button disabled label="Buy" />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Inputs</h2>

          <p>Examples of fields with and without accessible identification.</p>
        </div>

        <div className="content-column">
          <Input label="Name" placeholder="Enter your name" />

          <Input required label="Email" placeholder="Enter your email" />

          <Input
            error="Invalid password"
            label="Password"
            placeholder="Enter your password"
          />

          <Input invalidAccessibility placeholder="Field without label" />

          <Input
            invalidAccessibility
            required
            placeholder="Required field without identification"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Cards</h2>

          <p>
            Comparison between valid and invalid accessibility scenarios in
            composite components.
          </p>
        </div>

        <div className="cards-grid">
          <Card
            title="Accessible card"
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop"
            alt="Abstract painting with colorful blue, red, and yellow strokes"
            caption="Image with alternative text"
          />

          <Card
            invalidAccessibility
            title="Inaccessible card"
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop"
            caption="Image without alt attribute"
          />
        </div>
      </section>

      <footer className="footer">
        Automated Accessibility Testing in React and Material UI
      </footer>
    </div>
  );
}
