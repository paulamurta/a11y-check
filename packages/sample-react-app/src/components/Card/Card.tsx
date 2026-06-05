import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import iconEdit from "../../assets/icons/icon-edit.svg";
import { Button } from "../Button/Button";
import type { CardProps } from "./Card.types";

export function Card({
  title,
  src,
  alt,
  caption,
  invalidAccessibility: invalid = false,
  className,
}: CardProps) {
  return (
    <MuiCard
      data-component="Card"
      className={className}
      sx={{
        border: 1,
        borderColor: invalid ? "error.main" : "success.main",
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        {invalid ? (
          <h4>{title}</h4>
        ) : (
          <Typography variant="h6" component="h3" gutterBottom>
            {title}
          </Typography>
        )}

        <CardMedia
          component="img"
          image={src}
          alt={invalid ? undefined : alt}
          sx={{ borderRadius: 2, aspectRatio: "4 / 3", objectFit: "cover", mb: 2 }}
        />

        <Typography
          variant="body2"
          color={invalid ? "#d4d4d4" : "text.secondary"}
          sx={invalid ? { bgcolor: "#fff", p: 1, borderRadius: 1 } : undefined}
        >
          {caption}
        </Typography>

        <div style={{ marginTop: 16 }}>
          {invalid ? (
            <Button iconUrl={iconEdit} label="Salvar" />
          ) : (
            <Button label="Ver detalhes" />
          )}
        </div>
      </CardContent>
    </MuiCard>
  );
}
