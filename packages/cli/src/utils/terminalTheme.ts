import pc from "picocolors";

const colorsEnabled =
  process.env.NO_COLOR === undefined &&
  process.env.FORCE_COLOR !== "0" &&
  Boolean(process.stdout.isTTY);

function colorize(format: (value: string) => string) {
  return (value: string) => (colorsEnabled ? format(value) : value);
}

export const theme = {
  accent: colorize((value) => pc.bold(pc.cyan(value))),
  muted: colorize(pc.dim),
  error: colorize((value) => pc.bold(pc.red(value))),
  success: colorize(pc.green),
  component: colorize((value) => pc.bold(pc.magenta(value))),
  rule: colorize(pc.yellow),
  instance: colorize(pc.white),
  separator: colorize((value) => pc.dim(value)),
};

const SUMMARY_WIDTH = 48;

export function formatApplicationFound(url: string): string {
  const { hostname, port } = new URL(url);
  const hostPort = port ? `${hostname}:${port}` : hostname;

  return `${theme.success("Application found at")} ${theme.accent(hostPort)}`;
}

export function formatSummary(
  componentCount: number,
  issueCount: number,
): string {
  const separator = theme.separator("─".repeat(SUMMARY_WIDTH));

  return [
    "",
    separator,
    "",
    theme.accent("Summary"),
    "",
    theme.error(
      `✖ ${theme.accent(String(componentCount))} component(s) with issues`,
    ),
    theme.error(
      `✖ ${theme.accent(String(issueCount))} distinct issue(s)`,
    ),
    "",
    separator,
  ].join("\n");
}

export function formatSuccessSummary(): string {
  const separator = theme.separator("─".repeat(SUMMARY_WIDTH));

  return [
    "",
    separator,
    "",
    theme.accent("Summary"),
    "",
    theme.success("✔ No accessibility issues found."),
    "",
    separator,
  ].join("\n");
}
