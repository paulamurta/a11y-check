import "./App.css";

import iconEdit from "./assets/icons/icon-edit.svg";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Input } from "./components/Input/Input";

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <span className="badge">Shift-Left Accessibility Testing</span>

        <h1 className="title">Ambiente de Testes de Acessibilidade</h1>

        <p className="description">
          Aplicação React desenvolvida para validação automatizada de problemas
          de acessibilidade em componentes reutilizáveis.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Buttons</h2>

          <p>
            Comparação entre implementações acessíveis e inacessíveis de botões
            reutilizáveis.
          </p>
        </div>

        <div className="content-grid">
          {/* válido */}
          <Button label="Salvar" />

          {/* inválido */}
          <Button iconUrl={iconEdit} />

          {/* inválido */}
          <Button disabled label="Comprar" />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Inputs</h2>

          <p>Exemplos de campos com e sem identificação acessível.</p>
        </div>

        <div className="content-column">
          <Input label="Nome" placeholder="Digite seu nome" />

          <Input required label="E-mail" placeholder="Digite seu e-mail" />

          <Input
            error="Senha inválida"
            label="Senha"
            placeholder="Digite sua senha"
          />

          <Input invalidAccessibility placeholder="Campo sem label" />

          <Input
            invalidAccessibility
            required
            placeholder="Campo obrigatório sem identificação"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Cards</h2>

          <p>
            Comparação entre cenários válidos e inválidos de acessibilidade em
            componentes compostos.
          </p>
        </div>

        <div className="cards-grid">
          <Card
            title="Card acessível"
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop"
            alt="Quadro abstrato com manchas coloridas em tons de azul, vermelho e amarelo"
            caption="Imagem com texto alternativo"
          />

          <Card
            invalidAccessibility
            title="Card inacessível"
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop"
            caption="Imagem sem atributo alt"
          />
        </div>
      </section>

      <footer className="footer">
        TCC • Testes Automatizados de Acessibilidade em React e Material UI
      </footer>
    </div>
  );
}
