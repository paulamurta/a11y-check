import "./App.css";

import iconEdit from "./assets/icons/icon-edit.svg";
import { Avatar } from "./components/Avatar/Avatar";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";
import { Link } from "./components/Link/Link";

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
          <Button id="button-save" label="Save" />

          <Button id="button-icon-only" iconUrl={iconEdit} />

          <Button id="button-disabled" disabled label="Buy" />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Inputs</h2>

          <p>Examples of fields with and without accessible identification.</p>
        </div>

        <div className="content-column">
          <Input
            id="input-name"
            label="Name"
            placeholder="Enter your name"
          />

          <Input
            id="input-email"
            required
            label="Email"
            placeholder="Enter your email"
          />

          <Input
            id="input-password"
            error="Invalid password"
            label="Password"
            placeholder="Enter your password"
          />

          <Input
            id="input-no-label"
            invalidAccessibility
            placeholder="Field without label"
          />

          <Input
            id="input-required-no-label"
            invalidAccessibility
            required
            placeholder="Required field without identification"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Links</h2>

          <p>
            Icon-only links and images without alternative text are common
            accessibility failures.
          </p>
        </div>

        <div className="content-grid">
          <Link
            id="link-documentation"
            href="https://example.com/docs"
            label="Documentation"
          />

          <Link
            id="link-icon-only"
            href="https://example.com/edit"
            iconUrl={iconEdit}
          />

          <Link
            id="link-no-label"
            href="https://example.com/learn"
            invalidAccessibility
            label="Learn more"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Avatars</h2>

          <p>
            Profile photos should describe the person. Missing or generic alt
            text such as &quot;image&quot; is not sufficient.
          </p>
        </div>

        <div className="content-grid">
          <Avatar
            id="avatar-descriptive-alt"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop"
            alt="Profile photo of Jane Doe"
          />

          <Avatar
            id="avatar-missing-alt"
            invalidAccessibility
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop"
          />

          <Avatar
            id="avatar-generic-alt"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop"
            alt="image"
          />
        </div>
      </section>

      <footer className="footer">
        Automated Accessibility Testing in React and Material UI
      </footer>
    </div>
  );
}
