import Cuaderno from "@/components/Cuaderno";
import FinalReflection from "@/components/FinalReflection";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Cuaderno Semanal — Favio Asturimac",
  description: "Registro de aprendizaje semanal: temas, laboratorios, reflexiones y bibliografía del curso de Desarrollo de Aplicaciones Web.",
};

export default function CuadernoPage() {
  return (
    <>
      <ScrollProgress />
      <main className="relative min-h-screen">
        <Cuaderno />
        <FinalReflection />
      </main>
    </>
  );
}